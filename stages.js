const {
  Telegraf,
  Scenes: { Stage },
  Composer,
} = require("telegraf");
const { titles } = require("telegraf-steps-engine");

const mainStage = new Stage(
  [
    ...require("./scenes/mainScene"),
    require("./scenes/clientScenes/withdrawalScene"),
    require("./scenes/clientScenes/catalogScene"),
    require("./scenes/clientScenes/connectSupportScene"),
    require("./scenes/clientScenes/sendReportScene"),
    require("./scenes/clientScenes/static/helpScene"),
    require("./scenes/clientScenes/static/profileScene"),
    require("./scenes/clientScenes/static/referalsScene"),
    require("./scenes/clientScenes/static/tasksScene"),
    require("./scenes/clientScenes/myReportsScene"),

    require("./scenes/adminScenes/adminScene"),
    require("./scenes/adminScenes/answerQuestionScene"),

    require("./scenes/adminScenes/categoriesScene"),
    require("./scenes/adminScenes/adminsScene"),
    require("./scenes/adminScenes/adsLinkScene"),
    require("./scenes/adminScenes/waScene"),
    require("./scenes/adminScenes/reportsScene"),
    require("./scenes/adminScenes/changeBalanceScene"),
    require("./scenes/adminScenes/changeTextScene"),
  ],
  {
    default: "clientScene",
  }
);

mainStage.start(async (ctx) => ctx.scene.enter("clientScene"));
mainStage.command("web", (ctx) => ctx.scene.enter("catalogScene"));
mainStage.command("tasks", (ctx) => ctx.scene.enter("tasksScene"));
mainStage.command("refs", (ctx) => ctx.scene.enter("referalsScene"));
mainStage.command("help", (ctx) => ctx.scene.enter("helpScene"));
mainStage.command("lk", (ctx) => ctx.scene.enter("profileScene"));
mainStage.command("report", (ctx) => ctx.scene.enter("myReportsScene"));

mainStage.command("cashout", (ctx) => ctx.scene.enter("withdrawalScene"));
mainStage.hears(titles.getValues("BUTTON_BACK_USER"), (ctx) =>
  ctx.scene.enter("clientScene")
);
mainStage.hears(titles.getValues("BUTTON_CLIENT_MENU"), (ctx) =>
  ctx.scene.enter("clientScene")
);

const adminStage = new Stage([
  //require("./scenes/adminScenes/adminScene"),
  // require("./scenes/adminScenes/adminsScene"),
  //require("./scenes/adminScenes/adsLinkScene"),
  //require("./scenes/adminScenes/claimsScene"),
  //require("./scenes/adminScenes/confirmCertificate"),
]);

mainStage.hears(titles.getValues("BUTTON_BACK_ADMIN"), (ctx) => {
  console.log(1);
  ctx.scene.enter("adminScene");
});

adminStage.hears(
  titles.getValues("BUTTON_ADMIN_MENU"),
  (ctx) =>
    store.isAdmin(ctx?.from?.id) &&
    ctx.scene.enter("adminScene", { edit: true })
);

const stages = new Composer();

stages.use(Telegraf.chatType("private", mainStage.middleware()));
stages.use(Telegraf.chatType("private", adminStage.middleware()));

module.exports = stages;
