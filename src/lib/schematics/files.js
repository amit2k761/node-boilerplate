import fs from 'fs';
import path from 'path';
import { promisify } from 'util';
import _ from 'lodash';
import chalk from 'chalk';

const asyncFs = {
  exists: promisify(fs.exists),
  mkdir: promisify(fs.mkdir),
  writeFile: promisify(fs.writeFile)
};

const defaultFiles = {
  controller: {
    ext: 'js',
    type: 'controller',
    content:
      "import %[R]%Service from './%[R]%.service';\nimport DefaultController from '../../../../lib/default-controller';\n\nexport class %[R,U]%Controller extends DefaultController {\n\tconstructor() {\n\t\tsuper();\n\t}\n\n\tget%[R,U]%s = async (req, res, next) => {\n\t\ttry {\n\t\t\tconst obj = await %[R]%Service.getAll%[R,U]%(req.query);\n\t\t\tif (!obj.length) {\n\t\t\t\treturn this.sendResponse(res, this.appConstants.http_codes.not_found);\n\t\t\t}\n\n\treturn this.sendResponse(\n\t\t\t\tres,\n\t\t\t\tthis.appConstants.http_codes.success,\n\t\t\t\tobj\n\t\t\t);\n\t\t} catch (error) {\n\t\t\tnext(this.handleError(error));\n\t\t}\n\t};\n\n\t\create%[R,U]% = async (req, res, next) => {\n\t\ttry {\n\t\t\tconst { errorMessage, value } = this.handleValidationError(\n\t\t\t\treq,\n\t\t\t\t%[R]%ValSchema\n\t\t\t);\n\n\t\tif (errorMessage) {\n\t\t\tthrow new Error(errorMessage);\n\t\t\t\t}\n\n\t\tconst obj = await %[R]%Service.create%[R,U]%(value);\n\t\tif (!obj) {\n\t\t\tthrow new Error(\n\t\t\t\tthis.appConstants.messsages.resources.%[R]%.error.%[R]%_not_created\n\t\t\t);\n\t\t}\n\n\t\treturn this.sendResponse(res, this.appConstants.http_codes.created, obj);\n\t} catch (error) {\n\t\tnext(this.handleError(error));\n\t}\n\t};\n\n\tget%[R,U]% = async(req,res,next) =>{\n\t\ttry {\n\t\t\tconst obj = await %[R]%Service.get%[R,U]%(req.params.id);\n\t\t\tif (!obj) {\n\t\t\t\treturn this.sendResponse(res, this.appConstants.http_codes.not_found);\n\t\t\t}\n\n\t\t\treturn this.sendResponse(\n\t\t\t\tres,\n\t\t\t\tthis.appConstants.http_codes.success,\n\t\t\t\tobj\n\t\t\t);\n\t\t} catch (error) {\n\t\t\tnext(this.handleError(error));\n\t\t}\n\t}\n\n\tremove%[R,U]% = async(req,res,next) => {\n\t\ttry {\n\t\t\tlet {id} = req.params;\n\t\t\tif(!id){\n\t\t\t\tthrow new Error(\n\t\t\t\t\tthis.appConstants.messsages.resources.%[R]%.error.%[R]%_not_available\n\t\t\t\t);\n\t\t\t}\n\n\t\tconst obj = await %[R]%Service.remove%[R,U]%(id,{\n\t\t\tjustOne:true\n\t\t});\n\n\t\tif (!obj) {\n\t\t\tthrow new Error(\n\t\t\t\tthis.appConstants.messsages.resources.%[R]%.error.%[R]%_not_available\n\t\t\t);\n\t\t}\n\n\t\t\treturn this.sendResponse(res, this.appConstants.http_codes.success, obj);\n\t\t} catch (error) {\n\t\t\tnext(this.handleError(error));\n\t\t}\n\t}\n\n\tupdate%[R,U]% = async(req,res,next) => {\n\t\ttry {\n\t\t\tconst { errorMessage, value } = this.handleValidationError(\n\t\t\t\treq,\n\t\t\t\t%[R]%ValSchema\n\t\t\t);\n\n\t\t\tif (errorMessage) {\n\t\t\t\tthrow new Error(errorMessage);\n\t\t\t}\n\n\t\tlet id = req.params.id;\n\t\tif(!id){\n\t\t\tthrow new Error(\n\t\t\t\tthis.appConstants.messsages.resources.%[R]%.error.%[R]%_not_available\n\t\t\t);\n\t\t}\n\n\t\tconst obj = await %[R]%Service.update%[R,U]%(id,req.body,{\n\t\t\tupsert: true,\n\t\t\tmulti: false\n\t\t});\n\n\t\tif (!obj) {\n\t\t\tthrow new Error(\n\t\t\t\tthis.appConstants.messsages.resources.%[R]%.error.%[R]%_not_available\n\t\t\t);\n\t\t}\n\n\t\treturn this.sendResponse(res, this.appConstants.http_codes.success, obj);\n\t\t} catch (error) {\n\t\t\tnext(this.handleError(error));\n\t\t}\n\t}\n\n\tpatch%[R,U]% = async(req,res,next) => {\n\t\ttry {\n\t\t\tlet {id} = req.params;\n\t\t\tif(!id){\n\t\t\t\tthrow new Error(\n\t\t\t\t\tthis.appConstants.messsages.resources.%[R]%.error.%[R]%_not_available\n\t\t\t\t);\n\t\t\t}\n\n\t\tconst obj = await %[R]%Service.update%[R,U]%(id,req.body,{\n\t\t\tupsert: false,\n\t\t\tmulti: false\n\t\t})\n\n\t\tif (!obj) {\n\t\tthrow new Error(\n\t\t\tthis.appConstants.messsages.resources.%[R]%.error.%[R]%_not_available\n\t\t);\n\t}\n\n\treturn this.sendResponse(res, this.appConstants.http_codes.success, obj);\n\t} catch (error) {\n\t\t\t\tnext(this.handleError(error));\n\t\t\t}\n\t\t}\n\n}\n\nexport default new %[R,U]%Controller();" 
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
    content: "import { Router } from 'express';\nimport %[R]% from './%[R]%.controller';\n\nclass %[R,U]%Route {\n\tconstructor() {\n\t\tthis.%[R]%Router = Router();\n\t\tthis.mountRoute();\n\t}\n\n\tmountRoute() {\n\t\tthis.%[R]%Router.get('/', %[R]%.get%[R,U]%s);\n\t\tthis.%[R]%Router.get('/:id', %[R]%.get%[R,U]%);\n\t\tthis.%[R]%Router.post('/', %[R]%.create%[R,U]%);\n\t\tthis.%[R]%Router.put('/:id', %[R]%.update%[R,U]%);\n\t\tthis.%[R]%Router.patch('/:id', %[R]%.patch%[R,U]%);\n\t\tthis.%[R]%Router.delete('/:id', %[R]%.remove%[R,U]%);\n\t}\n}\n\nexport default %[R,U]%Route;"
  },
  schema: {
    ext: 'js',
    type: 'schema',
    content:
      "import mongoose, { Schema } from 'mongoose';\n\nconst %[R,U]%Schema = new mongoose.Schema({},{ timestamps: true, strict: true});\n\n\nexport default %[R,U]%Schema;"
  },
  service: {
    ext: 'js',
    type: 'service',
    content:"import DefaultService from '../../../../lib/default-service';\nimport %[R,U]% from './%[R]%.model';\n\nexport class %[R,U]%Service extends DefaultService {\n\tconstructor() {\n\t\tsuper(%[R,U]%);\n\t}\n\tgetAll%[R,U]% = async (params) => {\n\t\treturn super.find(params);\n\t};\n\n\tget%[R,U]% = async (id) => {\n\t\treturn super.get(id);\n\t};\n\n\tcreate%[R,U]% = async %[R]%Obj => {\n\t\tlet obj = await super.find({\n\t\t\tname:%[R]%Obj.name\n\t\t});\n\n\t\tif (obj.length) {\n\t\t\tthrow {\n\t\t\t\tstatusCode: this.appConstants.http_codes.already_exists,\n\t\t\t\t\tmessage: '%[R,U]% already exists'\n\t\t\t\t};\n\t\t}\n\t\treturn super.create(%[R]%Obj);\n\t};\n\n\tremove%[R,U]% = async (%[R]%Id,params) => {\n\t\tlet obj = await super.find({\n\t\t\t_id:mongoose.Types.ObjectId(%[R]%Id)\n\t\t});\n\t\tif (!obj.length) {\n\t\t\tthrow {\n\t\t\t\tstatusCode: this.appConstants.http_codes.not_found,\n\t\t\t\tmessage: '%[R,U]% not Found'\n\t\t\t};\n\t\t}\n\t\treturn super.remove(%[R]%Id,params);\n\t}\n\n\tupdate%[R,U]% = async(id,%[R]%Obj,params) => {\n\t\tlet %[R]% = await super.get(id);\n\t\tif (!%[R]%) {\n\t\t\tthrow {\n\t\t\t\tstatusCode: this.appConstants.http_codes.not_found,\n\t\t\t\tmessage: '%[R,U]% not Found'\n\t\t\t};\n\t\t}\n\t\treturn super.update(id,%[R]%Obj,params);\n\t}\n\n}\n\nexport default new %[R,U]%Service();"
  },
  validator: {
    ext: 'js',
    type: 'validator',
    content: "import Joi from '@hapi/joi';"
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

  async generateResource(resourceName) {
    try {
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

      await this.generateFiles(resourceName);
    } catch (error) {
      console.log('error====>', error);
    }
  }

  async generateFiles(resourceName) {
    const allFiles = _.merge(defaultFiles, extraFiles);

    for (let file in allFiles) {
      await this.generateFile(resourceName, allFiles[file]);
      console.log(
        chalk.greenBright(
          `\n${resourceName}/${resourceName}.${allFiles[file].type}.${allFiles[file].ext} created at src/api/v1/resource/${resourceName}`
        )
      );
    }

    console.log(chalk.blue('Done ...'));
  }

  async generateFile(resourceName, props) {
    this.replaceContent(resourceName, props);
    await asyncFs.writeFile(
      path.resolve(
        `src/api/v1/resource/${resourceName}/${resourceName}.${props.type}.${props.ext}`
      ),
      _.get(props, ['content'], '')
    );
  }

  replaceContent(resourceName, props) {
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
}
