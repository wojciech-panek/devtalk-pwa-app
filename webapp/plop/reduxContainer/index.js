const path = require('path');

const templatesPath = path.join(__dirname, 'templates');

module.exports = (plop) => {
  const containerDirectory = 'src/{{ directory }}/{{ camelCase name }}';
  plop.setGenerator('container', {
    description: 'Generate a Redux container',
    prompts: [{
      type: 'input',
      name: 'name',
      message: 'Name:',
    }, {
      type: 'directory',
      name: 'directory',
      basePath: 'src',
      message: 'Directory',
    }],
    actions: [{
      type: 'add',
      path: `${containerDirectory}/index.js`,
      templateFile: path.join(templatesPath, 'index.hbs'),
    }, {
      type: 'add',
      path: `${containerDirectory}/{{ camelCase name }}.container.js`,
      templateFile: path.join(templatesPath, 'container.hbs'),
    }, {
      type: 'add',
      path: `${containerDirectory}/{{ camelCase name }}.component.js`,
      templateFile: path.join(templatesPath, 'component.hbs'),
    }, {
      type: 'add',
      path: `${containerDirectory}/{{ camelCase name }}.styles.js`,
      templateFile: path.join(templatesPath, 'styles.hbs'),
    }, {
      type: 'add',
      path: `${containerDirectory}/__tests__/{{ camelCase name }}.component.spec.js`,
      templateFile: path.join(templatesPath, '__tests__/component.spec.hbs'),
    }],
  });
};
