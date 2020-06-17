import fs from 'fs';
import path from 'path';
import { promisify } from 'util';
import _ from 'lodash';
import chalk from 'chalk';
import es from 'event-stream';

const asyncFs = {
  exists: promisify(fs.exists),
  mkdir: promisify(fs.mkdir),
  writeFile: promisify(fs.writeFile),
  readFile: promisify(fs.readFile),
  readdir: promisify(fs.readdir)
};

const defaultFiles = {
  controller: {
    ext: 'js',
    type: 'controller',
    content:
      "import %[R]%Service from './%[R]%.service';\nimport { %[R]%ValSchema } from './%[R]%.validator';\nimport DefaultController from '../../../../lib/default-controller';\n\nexport class %[R,U]%Controller extends DefaultController {\n\tconstructor() {\n\t\tsuper();\n\t}\n\n\tgetAll = async (req, res, next) => {\n\t\ttry {\n\t\t\tconst obj = await %[R]%Service.find({}, req.query);\n\t\t\tif (!obj.length) {\n\t\t\t\treturn this.noContent(res);\n\t\t\t}\n\n\t\t\treturn this.success(res, obj);\n\t\t} catch (error) {\n\t\t\tnext(this.handleError(error));\n\t\t}\n\t};\n\n\tcreate = async (req, res, next) => {\n\t\ttry {\n\t\t\tconst { errorMessage, value } = this.handleValidationError(\n\t\t\t\treq,\n\t\t\t\t%[R]%ValSchema,\n\t\t\t\t'create'\n\t\t\t);\n\n\t\t\tif (errorMessage) {\n\t\t\t\tthrow new Error(errorMessage);\n\t\t\t\t}\n\t\t\tconst obj = await %[R]%Service.create(req.body, {});\n\t\t\tif (!obj) {\n\t\t\t\tthrow new Error(\n\t\t\t\t\tthis.appConstants.messsages.resources.default.error.default_not_created\n\t\t\t\t);\n\t\t\t}\n\n\t\t\treturn this.sendResponse(res, this.appConstants.http_codes.created, obj);\n\t\t} catch (error) {\n\t\t\tnext(this.handleError(error));\n\t\t}\n\t};\n\n\tget = async (req, res, next) => {\n\t\ttry {\n\t\t\tconst obj = await %[R]%Service.get(req.params.id);\n\t\t\tif (!obj) {\n\t\t\t\treturn this.noContent(res);\n\t\t\t}\n\n\t\t\treturn this.success(res, obj);\n\t\t} catch (error) {\n\t\t\tnext(this.handleError(error));\n\t\t}\n\t}\n\n\tremove = async (req, res, next) => {\n\t\ttry {\n\t\t\tlet { id } = req.params;\n\t\t\tif (!id) {\n\t\t\t\tthrow new Error(\n\t\t\t\t\tthis.appConstants.messsages.resources.default.error.default_not_available\n\t\t\t\t);\n\t\t\t}\n\n\t\t\tconst obj = await %[R]%Service.remove(id, {\n\t\t\t\tjustOne: true\n\t\t\t});\n\n\t\t\tif (!obj) {\n\t\t\t\treturn this.noContent(res);\n\t\t\t}\n\n\t\t\treturn this.success(res, obj);\n\t\t} catch (error) {\n\t\t\tnext(this.handleError(error));\n\t\t}\n\t}\n\n\tupdate = async (req, res, next) => {\n\t\ttry {\n\t\t\tconst { errorMessage, value } = this.handleValidationError(\n\t\t\t\treq,\n\t\t\t\t%[R]%ValSchema\n\t\t\t);\n\n\t\t\tif (errorMessage) {\n\t\t\t\tthrow new Error(errorMessage);\n\t\t\t}\n\n\t\t\tlet id = req.params.id;\n\t\t\tif (!id) {\n\t\t\t\tthrow new Error(\n\t\t\t\t\tthis.appConstants.messsages.resources.default.error.default_not_available\n\t\t\t\t);\n\t\t\t}\n\n\t\t\tconst obj = await %[R]%Service.update(id, req.body, {\n\t\t\t\tupsert: true,\n\t\t\t\tmulti: false\n\t\t\t});\n\n\t\t\tif (!obj) {\n\t\t\t\treturn this.noContent(res);\n\t\t\}\n\n\t\t\treturn this.success(res, obj);\n\t\t} catch (error) {\n\t\t\tnext(this.handleError(error));\n\t\t}\n\t}\n\n\tpatch = async (req, res, next) => {\n\t\ttry {\n\t\t\tlet { id } = req.params;\n\t\t\tif (!id) {\n\t\t\t\tthrow new Error(\n\t\t\t\t\tthis.appConstants.messsages.resources.default.error.default_not_available\n\t\t\t\t);\n\t\t\t}\n\n\t\t\tconst obj = await %[R]%Service.update(id, req.body, {\n\t\t\t\tupsert: false,\n\t\t\t\tmulti: false\n\t\t\t})\n\n\t\t\tif (!obj) {\n\t\t\t\treturn this.noContent(res);\n\t\t\t}\n\n\t\t\treturn this.success(res, obj);\n\t\t} catch (error) {\n\t\t\tnext(this.handleError(error));\n\t\t}\n\t}\n\n}\n\nexport default new %[R,U]%Controller();"
  },
  model: {
    ext: 'js',
    type: 'model',
    content:
      "import mongoose from 'mongoose';\nimport %[R,U]%Schema from './%[R]%.schema';\n\nexport default mongoose.model('%[R]%', %[R,U]%Schema);"
  },
  router: {
    ext: 'js',
    type: 'router',
    content:
      "import { Router } from 'express';\nimport %[R]% from './%[R]%.controller';\n\nclass %[R,U]%Route {\n\tconstructor() {\n\t\tthis.%[R]%Router = Router();\n\t\tthis.mountRoute();\n\t}\n\n\tmountRoute() {\n\t\tthis.%[R]%Router.get('/', %[R]%.getAll);\n\t\tthis.%[R]%Router.get('/:id', %[R]%.get);\n\t\tthis.%[R]%Router.post('/', %[R]%.create);\n\t\tthis.%[R]%Router.put('/:id', %[R]%.update);\n\t\tthis.%[R]%Router.patch('/:id', %[R]%.patch);\n\t\tthis.%[R]%Router.delete('/:id', %[R]%.remove);\n\t}\n}\n\nexport default %[R,U]%Route;"
  },
  schema: {
    ext: 'js',
    type: 'schema',
    content:
      "import mongoose, { Schema } from 'mongoose';\nimport appConstant from '../../../../constants/app-constant';\n\nconst %[R,U]%Schema = new mongoose.Schema({\n\tname: {\n\t\ttype: String,\n\t\trequired: [\n\t\t\ttrue,\n\t\t\tappConstant.messsages.resources.default.validation.name_required\n\t\t]\n\t},__v: { type: Number, select: false}\n},{ timestamps: true, strict: true, versionKey: false});\n\nexport default %[R,U]%Schema;"
  },
  service: {
    ext: 'js',
    type: 'service',
    content:
      "import DefaultService from '../../../../lib/default-service';\nimport %[R,U]% from './%[R]%.model';\n\nexport class %[R,U]%Service extends DefaultService {\n\tconstructor() {\n\t\tsuper(%[R,U]%,'%[ORM]%');\n\t}\n\n\tasync find(queryObj, params) {\n\t\treturn super.find(queryObj, params);\n\t}\n\n\tasync get(id, params) {\n\t\treturn super.get(id, params);\n\t}\n\n\tasync create(data, params) {\n\t\treturn super.create(data, params);\n\t}\n\n\tasync update(id, data, params) {\n\t\treturn super.update(id, data, params);\n\t}\n\n\tasync patch(id, data, params) {\n\t\treturn super.patch(id, data, params);\n\t}\n\n\tasync remove(id, params) {\n\t\treturn super.remove(id, params);\n\t}\n}\n\nexport default new %[R,U]%Service();"
  },
  validator: {
    ext: 'js',
    type: 'validator',
    content:
      "import Joi from '@hapi/joi';\n\nexport const %[R]%ValSchema = Joi.object({\n\tname: Joi.string().required()\n});"
  }
};

const extraFiles = {};

String.prototype.replaceAll = function(searchStr, replaceStr) {
  var str = this;

  if (str.indexOf(searchStr) === -1) {
    return str;
  }

  return str.replace(searchStr, replaceStr).replaceAll(searchStr, replaceStr);
};

export class File {
  constructor() {}

  async generateResource(resourceName, orm) {
    try {
      if(orm == "Sequelize"){
        defaultFiles.model.content = "import %[R,U]% from './%[R]%.schema';\nimport Sequelize from 'sequelize';\nimport { sequelize } from '../../../../lib/connection';\n\nexport default sequelize.define('%[R]%s', %[R,U]%(Sequelize));";
        defaultFiles.schema.content = "export default (Sequelize) => ({\n\tname: {\n\t\ttype: Sequelize.STRING\n\t}\n});"
      }
      resourceName = resourceName.toLowerCase();
      const isExists = await asyncFs.exists(
        path.resolve(`src/api/v1/resource/${resourceName}`)
      );

      if (isExists) {
        console.log(chalk.redBright(`\n${resourceName} already exists`));
        return;
      }

      let resourceDir = await asyncFs.mkdir(
        path.resolve(`src/api/v1/resource/${resourceName}`),
        {
          recursive: true
        }
      );

      await this.generateFiles(resourceName, orm);
      return true;
    } catch (error) {
      console.log('error====>', error);
    }
  }

  async generateFiles(resourceName, orm) {
    const allFiles = _.merge(defaultFiles, extraFiles);

    for (let file in allFiles) {
      await this.generateFile(resourceName, orm, allFiles[file]);
      console.log(
        chalk.greenBright(
          `\n${resourceName}/${resourceName}.${allFiles[file].type}.${allFiles[file].ext} created at src/api/v1/resource/${resourceName}`
        )
      );
    }

    console.log(chalk.blue('Done ...'));
  }

  async generateFile(resourceName, orm, props) {
    this.replaceContent(resourceName, orm, props);
    await asyncFs.writeFile(
      path.resolve(
        `src/api/v1/resource/${resourceName}/${resourceName}.${props.type}.${props.ext}`
      ),
      _.get(props, ['content'], '')
    );
  }

  replaceContent(resourceName, orm, props) {
    if (props.content) {
      const regexp = /(\%.*?\%)/g;

      let allMatches = [...new Set(props.content.match(regexp))];
      let dictionary = {};

      allMatches.map(token => {
        let str = '';
        let rules = token
          .split(/%/)[1]
          .slice(1, -1)
          .split(',');

        rules.forEach(rule => {
          switch (rule) {
            case 'R':
              str = resourceName;
              break;
            case 'U':
              str =
                resourceName.charAt(0).toUpperCase() + resourceName.slice(1);
              break;
            case 'ORM':
              str = orm;
            default:
              break;
          }
        });

        dictionary[token] = str;

        return str;
      });

      allMatches.forEach(match => {
        props.content = props.content.replaceAll(match, dictionary[match]);
      });
    }
  }

  async generateV1Route(resourceName) {
    try {
      let isMountRouteFound;
      let globalLineCounter = 0;

      let isMountRouteStartProps = { status: false, lineCounter: null };
      let isMountRouteCloseProps = { status: false, lineCounter: null };

      let data = await asyncFs.readFile(path.resolve(`src/api/v1/index.js`));

      data = data.toString().split('\n');

      data.forEach(line => {
        ++globalLineCounter;

        isMountRouteFound = line.trim().match(/^mountRoute()/);

        if (isMountRouteFound) {
          if (isMountRouteFound.input.includes('{')) {
            isMountRouteStartProps.status = true;
            isMountRouteStartProps.lineCounter = globalLineCounter;
          }
        }

        if (isMountRouteFound && !isMountRouteStartProps.status) {
          let isMountRouteStartFound = line.trim().match(/^}/);

          if (isMountRouteStartFound) {
            isMountRouteStartProps.status = true;
            isMountRouteStartProps.lineCounter = globalLineCounter;
          }
        }

        if (isMountRouteStartProps.status && !isMountRouteCloseProps.status) {
          let isMountRouteCloseFound = line.trim().match(/^}/);

          if (isMountRouteCloseFound) {
            isMountRouteCloseProps.status = true;
            isMountRouteCloseProps.lineCounter = globalLineCounter;
          }
        }
      });

      data.splice(
        0,
        0,
        `import ${resourceName.charAt(0).toUpperCase() +
          resourceName.slice(
            1
          )}Route from './resource/${resourceName.toLowerCase()}/${resourceName.toLowerCase()}.router';`
      );

      data.splice(
        isMountRouteCloseProps.lineCounter,
        0,
        `\t\tthis.v1Router.use('/${resourceName.toLowerCase()}', new ${resourceName
          .charAt(0)
          .toUpperCase() +
          resourceName.slice(1)}Route().${resourceName.toLowerCase()}Router);`
      );

      const text = data.join('\n');

      await asyncFs.writeFile(path.resolve(`src/api/v1/index.js`), text);
      return true;
    } catch (error) {
      console.log('error====>', error);
    }
  }
}
