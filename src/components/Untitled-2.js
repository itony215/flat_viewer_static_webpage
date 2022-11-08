
      function show_draw(type){
        if (type == '技術線圖'){
          document.getElementById("container_tech").style.display = "inline-block";
          document.getElementById("container_realtime").style.display = "none";
        }
        else if (type == '即時走勢'){
          document.getElementById("container_realtime").style.display = "inline-block";
          document.getElementById("container_tech").style.display = "none";
        };
      }

      $(document).ready(function(){
        stock_id = document.getElementById("stock").innerHTML;
        Highcharts.getJSON('/api/v1/draw?value='+stock_id, function (data) {
        // split the data set into ohlc and volume
        var ohlc = [],
          volume = [],
          ma5 = [],
          ma10 = [],
          ma20 = [],
          ma60 = [],
          obos = [],
          have = [],
          dataLength = data.length;
      
        for (var i = 0; i < dataLength; i += 1) {
          ohlc.push([
            data[i][0], // the date
            data[i][1], // open
            data[i][2], // high
            data[i][3], // low
            data[i][4] // close
          ]);
      
          volume.push([
            data[i][0], // the date
            data[i][5] // the volume
          ]);
      
          ma5.push([
            data[i][0], // the date
            data[i][8] // the volume
          ]);
      
          ma10.push([
            data[i][0], // the date
            data[i][9] // the volume
          ]);
      
          ma20.push([
            data[i][0], // the date
            data[i][10] // the volume
          ]);
      
          ma60.push([
            data[i][0], // the date
            data[i][11] // the volume
          ]);
      
          obos.push([
            data[i][0], // the date
            data[i][6] // the volume
          ]);
      
          have.push([
            data[i][0], // the date
            data[i][7] // the volume
          ]);
        }

        // create the chart
        Highcharts.stockChart('container_tech', {
          plotOptions: {
              candlestick: {
                  color: 'green',
                  upColor: 'red'
              },
              series: {
              showInLegend: true
            }
      
          },
          chart: {
            height: 600
          },
          legend: {
            enabled: true
          },
          rangeSelector: {
            selected: 0
          },
      
          yAxis: [{
            height: '60%'
          }, {
            top: '62%',
            height: '20%'
          }, {
            top: '82%',
            height: '20%'
          }],
          series: [{
            type: 'candlestick',
            id: 'aapl',
            name: '股價',
            data: data
          }, {
            type: 'column',
            id: 'volume',
            name: '成交量',
            data: volume,
            yAxis: 1
          }, 
          {
            type: 'line',
            id: 'ma5',
            name: 'ma5',
            linkedTo: 'aapl',
            data: ma5,
            yAxis: 0
          }, 
          {
            type: 'line',
            id: 'ma10',
            name: 'ma10',
            linkedTo: 'aapl',
            data: ma10,
            yAxis: 0
          }, 
          {
            type: 'line',
            id: 'ma20',
            name: 'ma20',
            linkedTo: 'aapl',
            data: ma20,
            yAxis: 0
          }, 
          {
            type: 'line',
            id: 'ma60',
            name: 'ma60',
            linkedTo: 'aapl',
            data: ma60,
            yAxis: 0
          }, 
          {
            type: 'psar',
            id: 'psar',
            name: 'SAR',
            linkedTo: 'aapl',
            yAxis: 0
          }, 
          {
            type: 'column',
            name: '投信買賣超',
            id: 'obos',
            linkedTo: 'aapl',
            data: obos,
            yAxis: 2
          },
          // {
          //   type: 'line',
          //   name: '投信持有',
          //   id: 'have',
          //   linkedTo: 'aapl',
          //   data: have,
          //   yAxis: 2
          // }
        ]
        });
      })});

      $(document).ready(function(){
        stock_id = document.getElementById("stock").innerHTML;
        Highcharts.getJSON('/api/v1/draw2?value='+stock_id, function (data) {
        // split the data set into ohlc and volume
        var pre = data.slice(-1)[0][0];
        var h = data.slice(-1)[0][1];
        var l = data.slice(-1)[0][2];
        var y = data.slice(-1)[0][3];
        var m = data.slice(-1)[0][4];
        var d = data.slice(-1)[0][5];
        var volume = [],
            price = [],
            dataLength = data.length-1;
          
        for (var i = 0; i < dataLength-1; i += 1) {
          volume.push([
            data[i][0], // open
            data[i][2], // open
          ]);
          price.push([
            data[i][0], // open
            data[i][1] // the volume
          ]);
        }
        // create the chart
        let offset = new Date().getTimezoneOffset();
        Highcharts.chart('container_realtime', {
          time: { timezoneOffset: offset },
          xAxis: {
            type: 'datetime',
            min: Date.UTC(y, m, d, 1),
            max: Date.UTC(y, m, d, 5, 30),
          },
          plotOptions: {
              series: {
              pointInterval: 60000, // one minute
              showInLegend: true
            }
      
          },
          chart: {
            height: 600,
            width: 600
          },
          title:{
            text:''
          },
          subTitle:{
            text:''
          }, 
          legend: {
            enabled: true
          },
      
          yAxis: [{
            min: l, max: h,
            top: '10%',
            height: '70%',
            title:{
                  text:'',
              },
              plotLines:[
                {
                color:'red',
                dashStyle:'solid',
                value:h,
                width:2
              },
              {
                color:'green',
                dashStyle:'solid',
                value:l,
                width:2
              },
              {
                color:'black',
                dashStyle:'solid',
                value:pre,
                width:2
              }]}, {
            top: '80%',
            height: '20%',
            title:{
                  text:'',
              }
          }],
          
          series: [{
            id: 'price',
            name: '股價',
            data: price
          }, {
            type: 'column',
            id: 'volume',
            name: '成交量',
            data: volume,
            linkedTo: 'price',
            yAxis: 1
          }
        ]
        });
      })});


      document.querySelectorAll('span').forEach(function(item) {
        if(item.classList.contains('computed_by_yesterday')){
          var closer = document.getElementById('yesterday_closer').innerHTML
          if (item.innerHTML == document.getElementById('limitUpPrice').innerHTML){
            $(item).addClass('C(#fff) Px(6px) Py(2px) Bdrs(4px) Bgc($c-trend-up)')
          }
          else if (item.innerHTML == document.getElementById('limitDownPrice').innerHTML){
            $(item).addClass('C(#fff) Px(6px) Py(2px) Bdrs(4px) Bgc($c-trend-down)')
          }
          else if (item.innerHTML < closer){
            $(item).addClass('C($c-trend-down)')
          }
          else if (item.innerHTML > closer){
            $(item).addClass('C($c-trend-up)')
          }
        }
        else if (item.classList.contains('status')){
          if ($(item).attr('value').split('_')[0] == 'close'){
            status = '收盤'
          }
          else if ($(item).attr('value').split('_')[0] == 'open'){
            status = '開盤'
          }
          updatetime = new Date($(item).attr('value').split('_')[1]).toLocaleTimeString([], {year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit'})
          item.innerHTML = (status+" | "+ updatetime + " 更新")
    
        }
      })
      
      $(document).ready(function(){
      var close = document.getElementById('close');
      var draw = document.getElementById('draw_detail');
      if (document.documentElement.clientWidth > 1000){
        var wid = document.documentElement.clientWidth/2   
        close.style.left = wid+480+'px'
      } 
      else{
        var wid = document.documentElement.clientWidth
        close.style.left = wid-80+'px'
      }
      var hei = document.documentElement.clientHeight/2
      close.style.top = hei-340+'px'
    })
    
    
    