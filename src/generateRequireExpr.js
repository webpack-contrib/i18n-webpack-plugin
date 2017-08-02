import { relative, resolve } from 'path';

function generateRequireExpr(context, pathToModule) {
  let moduleJsPath = relative(context, resolve(__dirname, '..', pathToModule));

  if (!/^[A-Z]:/i.test(moduleJsPath)) {
    moduleJsPath = `./${moduleJsPath.replace(/\\/g, '/')}`;
  }

  return `require(${JSON.stringify(moduleJsPath)}).default`;
}

export default generateRequireExpr;
