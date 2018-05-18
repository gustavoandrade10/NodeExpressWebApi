export const SWAGGERCONFIG = {
    swaggerDefinition:{
        info: {
        version: '1.0.0',
        title: 'Node Express Web Api (NEWA)',
        description: 'Node Express Web Api (NEWA) with typescript and sequelize'
      },
      host: 'localhost:3000',
      basePath: '/api/v1',
      schemes: [
        "http"
      ],
      consumes: [
        "application/json"
      ],
      produces: [
        "application/json"
      ]
    },
    controllersFolderPath: 'src/Controller/Controllers/',
}