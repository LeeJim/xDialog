'use strict';

/**
 * 弹框基础框架
 * 作者：leejim
 */
$.x = $.x || {};

(function ($) {

  var $dialog = null;

  $.x.dialog = function (options) {
    var _html = '<div class="x-dialog-main"><div class="x-mask"></div><div class="x-dialog"><a class="x-dialog-close" href="javascript:;"></a><div class="x-dialog-head">' + options.head + '</div><div class="x-dialog-body">' + options.body + '</div><div class="x-dialog-foot">' + options.foot + '</div></div></div>';

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
(function ($) {

  var $payDialog = null;

  $.x.payDialog = function (options, callback) {

    options = $.extend({
      currentAmount: 0,
      remain: 0,
      bankCode: '',
      bankCardDes: 'x银行',
      bankCardLimit: '单笔限额100万，日累计100万'
    }, options);

    var html_remain = '';
    if (options.remain) {
      html_remain = '<p>使用余额支付<span class="x-black">' + options.remain.toFixed(2) + '</span>元</p>';
    }

    var html_body = '<div class="x-order-info"><p class="x-des">银行卡支付</p><h1 class="x-amount"><span class="x-symbol">¥</span>' + options.currentAmount.toFixed(2) + '</h1>' + html_remain + '</div>';

    var html_card = '',
        //银行卡信息
    text_button = ''; //按钮文案

    if (options.bankCode & options.bankCardDes && options.bankCardLimit) {
      //已绑定卡
      html_card = '<div class="x-card-info"><img src="' + options.bankCode + '" class="x-bank-logo/><h1>' + options.bankCardDes + '</h1><p>' + options.bankCardLimit + '</p></div>';
      text_button = '确认支付';
    } else {
      //未绑定卡
      html_card = '<div class="x-card-info"><span class="x-no-card"><i class="x-icon-danger"></i>尚未绑定定期理财银行卡</span></div>';
      text_button = '绑卡并支付';
    }

    $payDialog = $.x.dialog({
      head: '支付',
      body: html_body + html_card,
      foot: '<a href="javascript:;" id="xPay" class="x-btn primary">' + text_button + '</a>'
    });

    $('#xPay').on('click', function () {
      callback();
    });
  };

  $.x.closePayDialog = function () {
    if ($payDialog) {
      $payDialog.remove();
    }
  };
})(window.Zepto || window.jQuery);(function ($) {

  var $pwdDialog = null,
      $input = null,
      $label = null,
      _options = {
    currentAmount: 0, //当前输入金额
    remain: 0, //剩余金额
    pwdLen: 6, //密码长度
    withdrawCard: '' //取现银行卡信息
  },
      _callback = function _callback() {};

  $.x.pwdDialog = function (options, callback) {

    var html_body,
        html_pwdSquare = [];

    _options = $.extend(_options, options);

    if (_options.withdrawCard) {
      html_body = '<div class="x-withdraw-info">定期提现<span class="color-primary">' + _options.currentAmount.toFixed(2) + '</span>，至<span class="color-primary">' + _options.withdrawCard + '</span></div>';
    } else {
      html_body = '<div class="x-order-info"><p class="x-des">余额支付</p><h1 class="x-amount"><span class="x-symbol">¥</span>' + _options.currentAmount.toFixed(2) + '</h1><p>当前可用余额&nbsp;<span class="x-black">' + _options.remain + '</span>&nbsp;元</p></div>';
    }

    var i = _options.pwdLen;
    while (i-- > 0) {
      html_pwdSquare.push('<span></span>');
    }

    var html_foot = '<input class="x-pwd-input" type="tel" id="xPassword"><label class="x-pwd-label" id="xPwdLabel" for="xPassword">' + html_pwdSquare.join('') + '</label>';

    $pwdDialog = $.x.dialog({
      head: '请输入交易密码',
      body: html_body,
      foot: html_foot
    });

    _callback = callback;

    // 因为在IOS上键盘挡住输入框
    var ua = navigator.userAgent.toLowerCase();
    if (ua.indexOf('iphone') > -1 || ua.indexOf('ipad') > -1) {
      $pwdDialog.find('.x-dialog').css('top', '30%');
    }

    // 绑定密码输入框的事件
    $label = $("#xPwdLabel");
    $input = $pwdDialog.find('#xPassword');
    $input.on('input', function () {
      handlePwdChange.call(this);
    });

    // 弹出键盘
    $input.focus();
  };

  // 关闭弹框
  $.x.closePwdDialog = function () {
    if ($pwdDialog) {
      $pwdDialog.remove();
    }
  };

  // 重置密码
  $.x.resetPwd = function () {
    handlePwdChange.call($input, true);
  };

  // 监听input输入
  function handlePwdChange(reset) {

    var $this = $(this);

    if (reset) {
      $this.val('');
    }

    var pwd = $(this).val();

    // 输入的密码长度超过了
    if (pwd.length > 6) {
      return;
    }

    $label.attr('nums', pwd.length);

    if (pwd.length == 6) {
      _callback(pwd);
    }
  }
})(window.Zepto || window.jQuery);