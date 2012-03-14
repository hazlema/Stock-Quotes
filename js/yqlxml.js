Request.YQLxml = new Class({
    
    Extends: Request.JSONP,
    
    options: {
        log: !true,
        url: "http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20html%20where%20url%3D%22{location}%22&format=xml"
    },
    
    initialize: function(location, options) {
        this.parent(options);
        if (!location) return;

        this.options.url = this.options.url.substitute({
            location: encodeURIComponent(location)
        });
    },
    
    loadXML: function(txt) {
        txt = txt.replace(/<\x2F?\w+>/g, '')
                 .clean()
                 .replace(/&lt;/g, '<')
                 .replace(/&gt;/g, '>');

        if (window.DOMParser) {
            parser = new DOMParser();
            xmlDoc = parser.parseFromString(txt, "text/xml");
        } else {
            xmlDoc=new ActiveXObject("Microsoft.XMLDOM");
            xmlDoc.async=false;
            xmlDoc.loadXML(txt);
        }
     
         return xmlDoc;
     },

    success: function(data, script) {
        data = this.loadXML(data[0].results[0]);
        this.parent(data, script);
    }
});