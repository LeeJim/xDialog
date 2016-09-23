/**
 * 弹框1：密码输入框
 * 作者：leejim
 */
;(function($){

  var $pwdDialog = null,
      $input = null,
      $label = null,
      _options = {
        currentAmount: 0, //当前输入金额
        remain: 0, //剩余金额
        pwdLen: 6, //密码长度
        withdrawCard: '' //取现银行卡信息
      },
      _callback = function(){};

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

  $.x.pwdDialog = function(options, callback){

    var html_body,
        html_pwdSquare = [];

    _options = $.extend(_options, options);

    if(_options.withdrawCard){
      html_body = `<div class="x-withdraw-info">定期提现<span class="color-primary">${num2Currency(_options.currentAmount)}</span>，至<span class="color-primary">${_options.withdrawCard}</span></div>`
    }
    else {
      html_body = `<div class="x-order-info"><p class="x-des">余额支付</p><h1 class="x-amount"><span class="x-symbol">¥</span>${num2Currency(_options.currentAmount)}</h1><p>当前可用余额&nbsp;<span class="x-black">${num2Currency(_options.remain)}</span>&nbsp;元</p></div>`;
    }

    
    
    var i = _options.pwdLen;
    while(i-- > 0) {
      html_pwdSquare.push('<span></span>');
    }

    var html_foot = `<input class="x-pwd-input" type="tel" id="xPassword"><label class="x-pwd-label" id="xPwdLabel" for="xPassword">${html_pwdSquare.join('')}</label>`;

    $pwdDialog = $.x.dialog({
      head: '请输入交易密码',
      body: html_body,
      foot: html_foot
    })

    _callback = callback;

    // 绑定密码输入框的事件
    $label = $("#xPwdLabel");
    $input = $pwdDialog.find('#xPassword');
    $input.on('input', function(){
      handlePwdChange.call(this);
    });

    // 因为在IOS上键盘挡住输入框
    var ua = navigator.userAgent.toLowerCase();
    if (ua.indexOf('iphone') > -1 || ua.indexOf('ipad') > -1) {
      $input.on('focus', function(){
        $pwdDialog.find('.x-dialog').css('top', '35%');
      })
    }


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

    var pwd = $(this).val();

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