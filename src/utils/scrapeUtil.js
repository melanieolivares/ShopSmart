import UserAgent from "user-agents";
import puppeteer from "puppeteer";

export async function setUpPuppeteer() {
  const browser = await puppeteer.launch({
    headless: true,
    devtools: false,
    timeout: 60000,
    slowMo: 25,
    defaultViewport: null,
    handleSIGINT: true,
    handleSIGTERM: true,
    handleSIGHUP: true,
    args: [
      `--no-zygote`,
      `--no-sandbox`,
      `--disable-setuid-sandbox`,
      `--disable-web-security`,
      `--ignore-certificate-errors`,
      `--ignore-certificate-errors-spki-list`,
      `--disable-features=IsolateOrigins,site-per-process`,
      `--disable-site-isolation-trials`,

      `--disable-blink-features`,
      `--disable-blink-features=AutomationControlled`,

      `--no-default-browser-check`,
      `--no-first-run`,
      `--disable-infobars`,
      `--disable-notifications`,
      `--disable-desktop-notifications`,
      `--hide-scrollbars`,
      `--mute-audio`,

      `--window-position=0,0`,
      `--window-size=1920,1080`,

      `--font-render-hinting=none`,
      `--disable-gpu`,
      `--disable-gpu-sandbox`,
      `--disable-dev-shm-usage`,
      `--disable-software-rasterizer`,
      `--enable-low-res-tiling`,
      `--disable-accelerated-2d-canvas`,
      `--disable-canvas-aa`,
      `--disable-2d-canvas-clip-aa`,
      `--disable-gl-drawing-for-tests`,

      // `--kiosk`,

      `--disable-background-timer-throttling`,
      `--disable-backgrounding-occluded-windows`,
      `--disable-breakpad`,
      `--disable-client-side-phishing-detection`,
      `--disable-component-extensions-with-background-pages`,
      `--disable-default-apps`,
      `--disable-dev-shm-usage`,
      `--disable-extensions`,
      `--disable-features=TranslateUI`,
      `--disable-hang-monitor`,
      `--disable-ipc-flooding-protection`,
      `--disable-popup-blocking`,
      `--disable-prompt-on-repost`,
      `--disable-renderer-backgrounding`,
      `--disable-sync`,
      `--force-color-profile=srgb`,
      `--metrics-recording-only`,

      `--disable-webgl`,
      `--disable-webgl2`,
      `--disable-gpu-compositing`,
    ],

    ignoreDefaultArgs: [`--enable-automation`],
  });

  let page = await browser.newPage();
  await page.setViewport({ width: 1920 - 0, height: 1080 - 74 });

  const client = await page.createCDPSession();
  client.send("Network.setUserAgentOverride", {
    userAgent: new UserAgent().toString(),
  });

  await page.emulateTimezone(`Europe/Amsterdam`);

  await page.evaluateOnNewDocument(() => {
    const customRTC = (target) => {
      console.log(`customRTC ${target}`);
      return undefined;
    };
    window.__defineGetter__("MediaStreamTrack", () =>
      customRTC("window.MediaStreamTrack")
    );
    window.__defineGetter__("RTCPeerConnection", () =>
      customRTC("window.RTCPeerConnection")
    );
    window.__defineGetter__("RTCSessionDescription", () =>
      customRTC("window.RTCSessionDescription")
    );
    window.__defineGetter__("webkitMediaStreamTrack", () =>
      customRTC("window.webkitMediaStreamTrack")
    );
    window.__defineGetter__("webkitRTCPeerConnection", () =>
      customRTC("window.webkitRTCPeerConnection")
    );
    window.__defineGetter__("webkitRTCSessionDescription", () =>
      customRTC("window.webkitRTCSessionDescription")
    );
    navigator.mediaDevices.__defineGetter__("getUserMedia", () =>
      customRTC("navigator.mediaDevices.getUserMedia")
    );
    navigator.__defineGetter__("webkitGetUserMedia", () =>
      customRTC("navigator.webkitGetUserMedia")
    );
    navigator.__defineGetter__("getUserMedia", () =>
      customRTC("navigator.getUserMedia")
    );

    const fnSW = () => {};
    navigator.serviceWorker.register = () => new Promise(fnSW);
  });

  page.on("dialog", async (dialog) => {
    await new Promise((r) => setTimeout(r, 3000));
    await dialog.accept();
  });

  return { page, browser };
}
