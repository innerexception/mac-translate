export default [
    {
        factionId: 'string',
        summaryText: 'string',
        loseText: 'string',
        winText: 'string',
        reputation: 0,
        notoriety: 0,
        type: MissionType.Translate,
        content: 'secret message',
        timeLimit: 0,
        level: 0,
        languageId: 'string',
        accessDialog: [
            {
                id: 'string',
                text: 'string',
                choices: [
                    {
                        id: 'string',
                        text: 'string',
                        choices: [],
                        factionId: 'string',
                        repRequired: 0,
                        notorietyRequired: 0,
                        implantRequired: ImplantType.None,
                        implantLevelRequired: 0
                    }
                ],
                factionId: 'string',
                repRequired: 0,
                notorietyRequired: 0,
                implantRequired: ImplantType.None,
                implantLevelRequired: 0
            }
        ]
    }
]