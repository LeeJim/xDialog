(function($){

  var $payDialog = null;

  /**
   * 格式化金额
   * @params {num} 需要格式化的数字
   * @return {string} 返回格式化后的字符串(默认保留两位小数)
   */
  var num2Currency = function(num) {
    if( isNaN(num) || typeof(num) !== 'number' || !isFinite(num) ) {
      return '0.00';
    }
    return num.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
  }

  $.x.payDialog = function(options, callback){

    options = $.extend({
      currentAmount: 0,
      remain: 0,
      bankCode: '',
      bankCardDes: 'x银行',
      bankCardLimit: '单笔限额100万，日累计100万'
    }, options);

    var html_remain = '';
    if(options.remain){
      html_remain = `<p>使用余额支付<span class="x-black">${num2Currency(options.remain)}</span>元</p>`
    }
    
    var html_body = `<div class="x-order-info"><p class="x-des">银行卡支付</p><h1 class="x-amount"><span class="x-symbol">¥</span>${num2Currency(options.currentAmount)}</h1>${html_remain}</div>`;

    var html_card = '', //银行卡信息
        text_button = ''; //按钮文案

    if(options.bankCode && options.bankCardDes && options.bankCardLimit) { //已绑定卡
      html_card = `<div class="x-card-info"><img src="${options.bankCode}" class="x-bank-logo" /><h1>${options.bankCardDes}</h1><p>${options.bankCardLimit}</p></div>`;
      text_button = '确认支付';
    }
    else { //未绑定卡
      html_card = `<div class="x-card-info"><span class="x-no-card"><i class="x-icon-danger"></i>尚未绑定定期理财银行卡</span></div>`;
      text_button = '绑卡并支付';
    }

    $payDialog = $.x.dialog({
      head: '支付',
      body: html_body + html_card,
      foot: `<a href="javascript:;" id="xPay" class="x-btn primary">${text_button}</a>`
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