
  $(document).on('keydown', function(e) {
  if (e.keyCode == 27)
    $("#detail").hide();
  });
  $(document).ready(function() {
    $('#dataTable').tablesorter({theme: 'blue'});
  });

  // 點擊畫面DIV以外的任何地方就隱藏DIV
  $("body").click(function(e){
      $("#detail").hide();
  });

  // 點擊DIV時、不向上層冒泡。
  $("#detail").click(function(e){
    // $("#detail").hide();
    e.stopPropagation();
  });

  // 點擊按鈕時顯示或隱藏DIV
  $("tbody tr").click(function(e){
    if ($("#detail").is(":hidden")){
      get_yahoo($(this).find('td:first').text())
      e.stopPropagation();
      $("#prepare").toggle();
    }
  });

  function get_yahoo(id){
    stock_id = id
    $(document).ready(function(){
      $('#detail').load('/api/v1/get_information?value='+stock_id, function(){
        $("#detail").toggle()
        $("#prepare").hide();
      })
    })
  }
