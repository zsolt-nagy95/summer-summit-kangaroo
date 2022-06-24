import React, { Component } from "react";
import defaultsDeep from "lodash/fp/defaultsDeep";
import isEqual from "lodash/isEqual";
import differenceWith from "lodash/differenceWith";
import intersectionWith from "lodash/intersectionWith";
import { DataSet } from "vis-data";
import { Network } from "vis-network";
import uuid from "uuid";
import PropTypes from "prop-types";

const diff = (current, next, field = "id") => {
  const nextIds = new Set(next.map((item) => item[field]));
  const removed = current.filter((item) => !nextIds.has(item[field]));

  const unchanged = intersectionWith(next, current, isEqual);

  const updated = differenceWith(
    intersectionWith(next, current, (a, b) => a[field] === b[field]),
    unchanged,
    isEqual
  );

  const added = differenceWith(
    differenceWith(next, current, isEqual),
    updated,
    isEqual
  );

  return {
    removed,
    unchanged,
    updated,
    added,
  };
};


class Graph extends Component {
  constructor(props) {
    super(props);
    const { identifier } = props;
    this.updateGraph = this.updateGraph.bind(this);
    this.state = {
      identifier: identifier !== undefined ? identifier : uuid.v4()
    };
    this.container = React.createRef();
  }


  componentDidMount() {
    this.edges = new DataSet();
    this.edges.add(this.props.graph.edges);
    this.nodes = new DataSet();
    this.nodes.add(this.props.graph.nodes);
    this.updateGraph();
  }

  shouldComponentUpdate(nextProps, nextState) {
    let nodesChange = isEqual(this.props.graph.nodes, nextProps.graph.nodes);
    console.log(nextProps);
    let edgesChange = isEqual(this.props.graph.edges, nextProps.graph.edges);
    let optionsChange = isEqual(this.props.options, nextProps.options);
    let eventsChange = isEqual(this.props.events, nextProps.events);

    if (nodesChange) {
      this.patchNodes({ nodesRemoved: this.props.graph.nodes,nodesAdded: nextProps.graph.nodes, nodesChanged: [] });
    }

    if (edgesChange) {
      const {
        removed: edgesRemoved,
        added: edgesAdded,
        updated: edgesChanged,
      } = diff(this.props.graph.edges, nextProps.graph.edges);

      this.patchEdges({ edgesRemoved, edgesAdded, edgesChanged });
    }

    if (optionsChange) {
      this.Network.setOptions(nextProps.options);
    }

    if (eventsChange) {
      let events = this.props.events || {};
      for (let eventName of Object.keys(events)) this.Network.off(eventName, events[eventName]);

      events = nextProps.events || {};
      for (let eventName of Object.keys(events)) this.Network.on(eventName, events[eventName]);
    }

    return false;
  }

  componentDidUpdate() {
    this.updateGraph();
  }

  componentWillUnmount() {
    this.destroyGraph();
  }

  patchEdges({ edgesRemoved, edgesAdded, edgesChanged }) {
    this.edges.remove(edgesRemoved);
    this.edges.add(edgesAdded);
    this.edges.update(edgesChanged);
  }

  patchNodes({ nodesRemoved, nodesAdded, nodesChanged }) {
    this.nodes.remove(nodesRemoved);
    this.nodes.add(nodesAdded);
    this.nodes.update(nodesChanged);
  }
  
  destroyGraph() {
    if (this.Network) this.Network.destroy();
  }

  updateGraph() {
    let defaultOptions = {
      physics: {
        stabilization: false
      },
      autoResize: false,
      edges: {
        smooth: false,
        color: "#000000",
        width: 0.5,
        arrows: {
          to: {
            enabled: true,
            scaleFactor: 0.5
          }
        }
      }
    };

    // merge user provied options with our default ones
    let options = defaultsDeep(defaultOptions, this.props.options);

    this.Network = new Network(
      this.container.current,
      Object.assign({}, this.props.graph, {
        edges: this.edges,
        nodes: this.nodes
      }),
      options
    );

    if (this.props.getNetwork) {
      this.props.getNetwork(this.Network);
    }

    if (this.props.getNodes) {
      this.props.getNodes(this.nodes);
    }

    if (this.props.getEdges) {
      this.props.getEdges(this.edges);
    }

    // Add user provied events to network
    let events = this.props.events || {};
    for (let eventName of Object.keys(events)) {
      this.Network.on(eventName, events[eventName]);
    }
  }

  render() {
    console.log(this.props);

    const { identifier } = this.state;
    const { style } = this.props;
    return React.createElement(
      "div",
      {
        id: identifier,
        ref: this.container,
        style
      },
      identifier
    );
  }
}

Graph.defaultProps = {
  graph: {},
  style: { width: "100%", height: "100%" }
};
Graph.propTypes = {
  graph: PropTypes.object,
  style: PropTypes.object,
  getNetwork: PropTypes.func,
  getNodes: PropTypes.func,
  getEdges: PropTypes.func,
};

export default Graph;
