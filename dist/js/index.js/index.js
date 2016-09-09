'use strict';

/**
 * 弹框基础框架
 * 作者：leejim
 */

(function ($) {

  $dialog = null;

  $.x = $.x || {};

  $.x.dialog = function (options) {
    var _html = '<div class="x-dialog">\n    <div class="x-mask"><div/>\n    <div class="x-dialog">\n      <a class="x-dialog-close" href="javascript:;">×</a>\n      <div class="x-dialog-head">' + options.head + '</div>\n      <div class="x-dialog-body">' + options.body + '</div>\n      <div class="x-dialog-foot">' + options.foot + '</div>\n    </div>\n    </div>';

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