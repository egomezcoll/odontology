'use strict'

var proxyTable = {
    '/api/login': 'GET' 
};
 
var proxyT = module.exports;
/**
 * Proxy configured request and rewrite method.
 */
proxyT.customTable = function (req, res, next) {
   if (req.url in proxyTable) {
         console.log('[PROXY TABLE][CUSTOM] ' + req.url + ' METHOD: ' + req.method);    
         req.method = proxyTable[req.url];
    }    
    return next();
};

/**
 * Proxy all request and rewrite method from POST to GET.
 */
proxyT.postsAsGets = function(req, res, next) {    
   if (req.method === 'POST') {
       console.log('[PROXY TABLE][POST-AS-GET] ' + req.url + ' METHOD: ' + req.method);     
       req.method = 'GET';
   }
   return next();
};
 