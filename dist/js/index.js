/**
 * 弹框基础框架
 * 作者：leejim
 */
 $.x = $.x || {};
 
 (function ($) {

   $dialog = null;

   $.x.dialog = function (options) {
     var _html = `<div class="x-dialog-main">
    <div class="x-mask"></div>
      <div class="x-dialog">
      <a class="x-dialog-close" href="javascript:;"></a>
      <div class="x-dialog-head">${options.head}</div>
      <div class="x-dialog-body">${options.body}</div>
      <div class="x-dialog-foot">${options.foot}</div>
      </div>
    </div>`;

     $dialog = $(_html);
     $('body').append($dialog);

     //点击关闭按钮
     $dialog.on('click', '.x-dialog-close', function () {
       $.x.closeDialog();
     });

     //点击遮罩
     $dialog.on('click', '.x-mask', function () {
       $.x.closeDialog();
     });

     return $dialog;
   };

   $.x.closeDialog = function () {
     if ($dialog) {
       $dialog.remove();
     }
   };
 })(window.Zepto || window.jQuery);
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
/**
 * 弹框1：密码输入框
 * 作者：leejim
 */
;(function($){

  var $pwdDialog = null,
      $input = null,
      $label = null;
      _options = {
        currentAmount: 0,
        remain: 0,
        pwdLen: 6
      },
      _callback = function(){};

  $.x.pwdDialog = function(options, callback){

    _options = $.extend(_options, options);

    var html_body = `<div class="x-order-info">
    <p class="x-des">余额支付</p>
    <h1 class="x-amount">
      <span class="x-symbol">¥</span>
      ${_options.currentAmount}
    </h1>
    <p>当前可用余额&nbsp;<span class="x-black">${_options.remain}</span>&nbsp;元</p>
    </div>`;
    
    var html_pwdSquare = [];
    
    var i = _options.pwdLen;
    while(i-- > 0) {
      html_pwdSquare.push('<span></span>');
    }

    var html_foot = `<input class="x-pwd-input" type="tel" id="xPassword">
    <label class="x-pwd-label" id="xPwdLabel" for="xPassword">
      ${html_pwdSquare.join('')}
    </label>`;

    $pwdDialog = $.x.dialog({
      head: '请输入交易密码',
      body: html_body,
      foot: html_foot
    })

    _callback = callback;

    // 因为在IOS上键盘挡住输入框
    var ua = navigator.userAgent.toLowerCase();
    if(ua.indexOf('iphone') > -1 || ua.indexOf('ipad') > -1){
      $pwdDialog.css('top','30%');
    }

    // 绑定密码输入框的事件
    $label = $("#xPwdLabel");
    $input = $pwdDialog.find('#xPassword');
    $input.on('input', function(){
      handlePwdChange.call(this);
    });

    // 弹出键盘
    $input.focus();
  }

  // 关闭弹框
  $.x.closePwdDialog = function(){
    if($pwdDialog){
      $pwdDialog.remove();
    }
  }

  // 重置密码
  $.x.resetPwd = function(){
    handlePwdChange.call($input, true);
  }

  // 监听input输入
  function handlePwdChange(reset){

    var $this = $(this);

    if(reset) {
      $this.val('');
    }

    pwd = $(this).val();

    // 输入的密码长度超过了
    if(pwd.length > 6) {
      return;
    }

    $label.attr('nums', pwd.length);

    if(pwd.length == 6) {
      _callback(pwd);
    }
  }
  

}(window.Zepto || window.jQuery))