(function (){
    var lists = ['gainers','losers'],
        urlBase = "https://widgets.freestockcharts.com/WidgetServer/DynamicLists.ashx?name=",
        timeSignature,
        gitHubLists = [];
        //https://widgets.freestockcharts.com/WidgetServer/DynamicLists.ashx?name=gainers&senderID=wbi_scroller_354881&take=20&cbust=22413550&jsoncallback=jQuery213038207504642196_1428892894956&_=1428892894957
        //https://api.github.com/events
        //https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.quotes%20where%20symbol%20in%20(%22MSFT%22%2C%20%22YHOO%22)&format=json&diagnostics=true&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=
        
        
        
    function makeUrl(listName, count){
        var c = new Date();
        var b = c.getHours().toString() + c.getMinutes().toString() + c.getSeconds().toString() + c.getMilliseconds().toString();
        count = count || 50;
        return urlBase + listName + "&take="+count+"&cbust=" + b;
    }
    
    function makeYQL(arr){
        arr.map(function(stock){return stock.n});
        return encodeURI('https://query.yahooapis.com/v1/public/yql?qselect * from yahoo.finance.quotes where symbol in' + '('+ ('"' + arr.join('","') + '"')+')&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys');
    }
    
    function getGitHubList(l, cb){
        l = l !== 1 ? 0 : 1;
        var x = new XMLHttpRequest();
        x.open('GET','https://api.github.com/events',true);
        x.onreadystatechange=function(){
            if(x.readyState == 4 && x.status == 200){
                try{
                    gitHubList[l] = JSON.parse(x.response).filter(function(event){
                        return event.type=='PushEvent';
                    }).map(function(event){
                        return {
                            size : event.payload.distinct_size,
                            url : event.repo.url.replace('https://api.github.com/repos/', 'https://github.com/'),
                            name: event.repo.name.replace(/.*\//,'').replace(/[\-\_]/g,' ').replace(/(\S)([A-Z])/g,'$1 $2'),
                            cl : event.repo.name
                        }
                    });
                } catch (err) {
                    console.log('bad respone');
                }
                cb(gitHubLists[l]);
            }
        }
        x.send();
    }
    
    function makeHTML(target){
        if(!target || !target.appendChild){
            target = document.querySelector(target);
        }
        var wrapper = document.createElement('div'),
            ticker1 = document.createElement('div'),
            ticker2 = document.createElement('div');
        
        wrapper.appendChild(ticker1);
        wrapper.appendChild(ticker2);
        
    }
})()