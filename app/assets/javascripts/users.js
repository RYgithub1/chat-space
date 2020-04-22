$(function () {
  $("#user-search-field").on("keyup", function () {
    let input = $("#user-search-field").val();
    $.ajax({
      type: "GET",
      url: "/users",
      // キーが入力される度に非同期通信でユーザーを検索したい
      // users_controller#index、にリクエストの送信先を設定する
      data: { keyword: input },
      dataType: "json",
    })
      .done(function (users) {
        console.log("成功です");
      })
      .fail(function () {
        console.log("失敗です");
      });
  });
});
