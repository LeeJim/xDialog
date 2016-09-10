(function($){

  var $payDialog = null;

  $.x.payDialog = function(options, callback){

    options = $.extend({
      currentAmount: 0,
      remain: 0,
      bankName: 'x银行',
      bankNo: 1234,
      bankDes: '单笔限额100万，日累计100万'
    }, options);

    var html_remain = '';
    if(options.remain){
      html_remain = `<p>使用余额支付<span class="x-black">${options.remain.toFixed(2)}</span>元</p>`
    }
    
    var html_body = `<div class="x-order-info">
    <p class="x-des">银行卡支付</p>
    <h1 class="x-amount">
      <span class="x-symbol">¥</span>
      ${options.currentAmount.toFixed(2)}</h1>
      ${html_remain}
    </div>`;

    var html_card;

    if(options.bankName & options.bankNo && options.bankDes) { //已绑定卡
      html_card = `
          <div class="x-card-info">
            <img src="" class="x-bank-logo/>
            <h1>${options.bankName} 尾号${options.bankNo}</h1>
            <p>${options.bankDes}</p>
          </div>`;
    }
    else { //未绑定卡
      html_card = `<div class="x-card-info">
          <span class="x-no-card">
            <i class="x-icon-danger"></i>
            尚未绑定定期理财银行卡
          </span>
          </div>`;
    }

    $payDialog = $.x.dialog({
      head: '支付',
      body: html_body + html_card,
      foot: '<a href="javascript:;" id="xPay" class="x-btn primary">确定支付</a>'
    })

    $('#xPay').on('click', function(){
      callback();
    })
  }

  $.x.closePayDialog = function(){
    if($payDialog){
      $payDialog.remove();
    }
  }

}(window.Zepto || window.jQuery))