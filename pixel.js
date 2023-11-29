const sourceMediumPlatform = (referrer = "", utmURL = "") => {
  let details = { source: "", medium: "" };

  const sources = [
    "instagram",
    "email",
    "facebook",
    "twitter",
    "google",
    "bing",
  ];

  if (!!utmURL) {
    let queryString = utmURL.split("?")[1];
    var obj = {};
    if (queryString) {
      queryString = queryString.split("#")[0];
      var arr = queryString.split("&");
      for (var i = 0; i < arr.length; i++) {
        var a = arr[i].split("=");
        var paramName = a[0];
        var paramValue = typeof a[1] === "undefined" ? true : a[1];
        paramName = paramName.toLowerCase();
        if (typeof paramValue === "string")
          paramValue = paramValue.toLowerCase();
        if (paramName.match(/\[(\d+)?\]$/)) {
          var key = paramName.replace(/\[(\d+)?\]/, "");
          if (!obj[key]) obj[key] = [];
          if (paramName.match(/\[\d+\]$/)) {
            var index = /\[(\d+)\]/.exec(paramName)[1];
            obj[key][index] = paramValue;
          } else {
            obj[key].push(paramValue);
          }
        } else {
          if (!obj[paramName]) {
            obj[paramName] = paramValue;
          } else if (obj[paramName] && typeof obj[paramName] === "string") {
            obj[paramName] = [obj[paramName]];
            obj[paramName].push(paramValue);
          } else {
            obj[paramName].push(paramValue);
          }
        }
      }

      details.source = obj?.["utm_source"];

      details.medium = obj?.["utm_medium"];
    }
  }
  if (!details.source) {
    if (utmURL.includes("utm")) {
      details.source = "(not set)";
    } else {
      sources.forEach((source, index) => {
        if (
          referrer.toLowerCase().includes(source.toLowerCase()) ||
          utmURL.toLowerCase().includes(source.toLowerCase())
        ) {
          details.source = source;
        }
      });
    }
    if (!details.source) {
      details.source = "(direct)";
    }
  }
  if (!details.medium) {
    if (utmURL.includes("utm")) {
      details.medium = "(not set)";
    } else {
      details.medium = "(none)";
    }
  }

  return { ...details };
};

const getJSessionId = () => {
  if (
    !localStorage.getItem("session_start") ||
    !localStorage.getItem("session_id")
  ) {
    localStorage.setItem("session_start", Date.now());
    localStorage.setItem("session_id", Date.now());
  } else if (
    Date.now() - localStorage.getItem("session_start") >
    30 * 60 * 1000
  ) {
    localStorage.removeItem("session_start");
    localStorage.removeItem("session_id");
    localStorage.setItem("session_start", Date.now());
    localStorage.setItem("session_id", Date.now());
  } else {
    localStorage.setItem("session_start", Date.now());
  }
  return localStorage.getItem("session_id");
};

const getUserId = async (apiEndPoint, apiKey, userEmail = "") => {
  const data = await fetch(`${apiEndPoint}user_id`, {
    method: "POST",
    headers: {
      "X-API-KEY": apiKey,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      user_email: userEmail,
    }),
  })
    .then((response) => response.json())
    .then((response) => response?.data)
    .catch((error) => console.error(error));
  return await data;
};
const getUserPseudoId = async (apiEndPoint, apiKey) => {
  let data = localStorage.getItem("pixel_pseudo_id");
  if (!data || data === "undefined") {
    data = await fetch(`${apiEndPoint}pseudo_user_id`, {
      method: "POST",
      headers: {
        "X-API-KEY": apiKey,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((response) => {
        localStorage.setItem("pixel_pseudo_id", response?.data);
        return response?.data;
      })
      .catch((error) => console.error(error));
  }

  return !data ? localStorage.getItem("pixel_pseudo_id") : data;
};

const getDate = () => {
  const objectDate = new Date();
  let day = objectDate.getDate();

  let month = objectDate.getMonth();

  let year = objectDate.getFullYear();
  if (day < 10) {
    day = "0" + day;
  }

  if (month < 10) {
    month = `0${month}`;
  }
  return `${year}${month}${day}`;
};

class myPixel {
  config(
    apiKey,
    clientId,
    techStack = "shopify",
    apiEndPoint = "https://api-dev.fastfrwd.ai/api/"
  ) {
    this.apiKey = apiKey;
    this.clientId = clientId;
    this.techStack = techStack;
    this.apiEndPoint = apiEndPoint;
  }

  async getEvent(
    eventType,
    isPurchase = false,
    purchaseRevenue = 0,
    userPseudoId = "",
    userId = "",
    userEmail = ""
  ) {
    let eventDate = getDate();
    let eventTimestamp = Date.now();
    const sessionId = getJSessionId();
    const referrer = document.referrer;
    const utmURL = document.URL;
    const { source, medium } = sourceMediumPlatform(referrer, utmURL);
    let otherPlatformPseudoUserId = "";
    let otherPlatformUserId = "";
    if (eventType === "traffic" || eventType === "purchase") {
      otherPlatformPseudoUserId =
        userPseudoId === ""
          ? await getUserPseudoId(this.apiEndPoint, this.apiKey)
          : userPseudoId;

      otherPlatformUserId =
        userId === ""
          ? userEmail === ""
            ? ""
            : await getUserId(this.apiEndPoint, this.apiKey, userEmail)
          : userId;

      fetch(`${this.apiEndPoint}pixel`, {
        method: "POST",
        headers: {
          "X-API-KEY": this.apiKey,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          clientId: this.clientId,
          eventType: eventType,
          eventDate: eventDate,
          eventTimestamp: eventTimestamp,
          sessionId: sessionId,
          userPseudoId:
            userPseudoId === "" ? otherPlatformPseudoUserId : userPseudoId,
          userId: userId === "" ? otherPlatformUserId : userId,
          source: source,
          medium: medium,
          isPurchase: isPurchase,
          purchaseRevenue: purchaseRevenue,
          referrer: referrer,
          URL: utmURL,
        }),
      })
        .then((response) => response.text())
        .then((response) => response?.data)
        .catch((error) => console.error(error));
    }
    // console.log(
    //   "clientId",
    //   this.clientId,
    //   "js Event: ",
    //   eventType,
    //   "eventDate:",
    //   eventDate,
    //   "eventTime:",
    //   eventTimestamp,
    //   "sessionId:",
    //   sessionId,
    //   "userPseudoId:",
    //   userPseudoId === "" ? otherPlatformPseudoUserId : userPseudoId,
    //   "userId",
    //   userId === "" ? otherPlatformUserId : userId,
    //   "isPurchase:",
    //   isPurchase,
    //   "purchaseRevenue:",
    //   purchaseRevenue,
    //   "referrer: ",
    //   referrer,
    //   "URL:",
    //   utmURL,
    //   "source:",
    //   source,
    //   "medium:",
    //   medium
    // );
    return {
      clientId: this.clientId,
      eventType: eventType,
      eventDate: eventDate,
      eventTimestamp: eventTimestamp,
      sessionId: sessionId,
      userPseudoId:
        userPseudoId === "" ? otherPlatformPseudoUserId : userPseudoId,
      userId: userId === "" ? otherPlatformUserId : userId,
      source: source,
      medium: medium,
      isPurchase: isPurchase,
      purchaseRevenue: purchaseRevenue,
      referrer: referrer,
      URL: utmURL,
    };
  }
}
