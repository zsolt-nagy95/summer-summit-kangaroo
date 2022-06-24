export const relationShipTypes = {
    HARD_SKILLS: "HARD_SKILLS",
    SOFT_SKILLS: "SOFT_SKILLS",
    OPERATIONAL: "OPERATIONAL",
    PROJECT: "PROJECT",
    MENTORSHIP: "MENTORSHIP"
};

export const org = [
    {
        "id": 1,
        "label": "Nick",
        "role": "CEO",
        "karmaScore": 2022,
        "parentPersons": [],
        "softSkills": [],
        "hardSkills": []
    },
    {
        "id": 2,
        "label": "Z",
        "karmaScore": 1400,
        "role": "VP of Engineering",
        "parentPersons": [{ "id": 1, "type": relationShipTypes.OPERATIONAL }],
        "softSkills": [],
        "hardSkills": []
    },
    {
        "id": 3,
        "label": "Javier",
        "karmaScore": 800,
        "role": "Team Lead",
        "parentPersons": [{ "id": 2, "type": relationShipTypes.MENTORSHIP }],
        "softSkills": [],
        "hardSkills": []
    },
    {
        "id": 4,
        "label": "Natalie",
        "karmaScore": 800,
        "role": "Designer",
        "parentPersons": [{ "id": 3, "type": relationShipTypes.PROJECT }],
        "softSkills": [],
        "hardSkills": ["design", "css"]
    },
    {
        "id": 5,
        "label": "Zsolt",
        "karmaScore": 0,
        "role": "Backend Lead",
        "parentPersons": [{ "id": 3, "type": relationShipTypes.PROJECT }],
        "softSkills": [],
        "hardSkills": ["node", "react"]
    },
    {
        "id": 6,
        "label": "Viktor",
        "karmaScore": 0,
        "role": "Frontend Engineer",
        "parentPersons": [{ "id": 4, "type": relationShipTypes.PROJECT }, { "id": 3, "type": relationShipTypes.PROJECT }],
        "softSkills": [],
        "hardSkills": ["react", "css", "html"]
    },
    {
        "id": 7,
        "label": "Elizabeth",
        "karmaScore": 0,
        "role": "Frontend Engineer",
        "parentPersons": [{ "id": 4, "type": relationShipTypes.PROJECT }, { "id": 3, "type": relationShipTypes.PROJECT }],
        "softSkills": [],
        "hardSkills": ["react", "css", "html"]
    },
    {
        "id": 8,
        "label": "Dávid",
        "karmaScore": 0,
        "role": "Backend Engineer",
        "parentPersons": [{ "id": 5, "type": relationShipTypes.PROJECT }, { "id": 3, "type": relationShipTypes.PROJECT }],
        "softSkills": [],
        "hardSkills": ["react", "css", "html"]
    }
];