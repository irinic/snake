    import { RenderConfig } from "../common/types";
    import AdsManager = google.ima.AdsManager;

    export class AdFlow {
        private readonly _adContainer: HTMLDivElement;
        private readonly _videoElement: HTMLVideoElement;

        constructor(private readonly _canvas: HTMLCanvasElement, private readonly _renderConfig: RenderConfig) {
            this._adContainer = document.createElement("div");
            this._videoElement = document.createElement("video");
            this._adContainer.style.position = "absolute";
            this._adContainer.style.top = "0";
            this._adContainer.style.left = "0";
            this._adContainer.style.width = `${this._renderConfig.screenWidth}px`;
            this._adContainer.style.height = `${this._renderConfig.screenHeight}px`;
            this._videoElement.style.width = "100%";
            this._videoElement.style.height = "100%";
            this._adContainer.appendChild(this._videoElement);
            this._canvas.parentElement?.appendChild(this._adContainer);
        }

        run(): Promise<void> {
            return new Promise((resolve) => {
                const adDisplayContainer = new google.ima.AdDisplayContainer(this._adContainer, this._videoElement);
                adDisplayContainer.initialize();
                const adsLoader = new google.ima.AdsLoader(adDisplayContainer);
                let adsManager: AdsManager | undefined;
                let fallbackTimer: number | undefined;
                let finished = false;
                let adPaused = false;
                const finish = (): void => {
                    if (finished) {
                        return;
                    }
                    finished = true;
                    if (fallbackTimer !== undefined) {
                        window.clearTimeout(fallbackTimer);
                    }
                    adsManager?.destroy();
                    document.removeEventListener("visibilitychange", onVisibilityChange);
                    this.stop();
                };
                const onVisibilityChange = (): void => {
                    if (document.visibilityState !== "visible" || !adPaused) {
                        return;
                    }

                    fallbackTimer = window.setTimeout(() => {
                        finish();
                        resolve();
                    }, 2000);
                };
                document.addEventListener("visibilitychange", onVisibilityChange);
                adsLoader.addEventListener(
                    google.ima.AdsManagerLoadedEvent.Type.ADS_MANAGER_LOADED,
                    event => {
                        adsManager = event.getAdsManager(this._videoElement);
                        adsManager?.addEventListener(
                            google.ima.AdEvent.Type.COMPLETE,
                            () => {
                                finish();
                                resolve();
                            },
                        );
                        adsManager?.addEventListener(
                            google.ima.AdEvent.Type.PAUSED,
                            () => {
                                adPaused = true;
                            },
                        );
                        adsManager?.addEventListener(
                            google.ima.AdEvent.Type.RESUMED,
                            () => {
                                adPaused = false;

                                if (fallbackTimer !== undefined) {
                                    window.clearTimeout(fallbackTimer);
                                    fallbackTimer = undefined;
                                }
                            },
                        );
                        adsManager?.init(
                            this._renderConfig.screenWidth,
                            this._renderConfig.screenHeight,
                            google.ima.ViewMode.NORMAL,
                        );
                        adsManager?.start();
                    },
                );
                adsLoader.addEventListener(
                    google.ima.AdErrorEvent.Type.AD_ERROR,
                    _ => {
                        finish();
                        resolve();
                    },
                );
                const adsRequest = new google.ima.AdsRequest();
                adsRequest.adTagUrl = "https://pubads.g.doubleclick.net/gampad/ads" +
                    "?iu=/21775744923/external/single_ad_samples" +
                    "&sz=640x480" +
                    "&cust_params=sample_ct%3Dlinear" +
                    "&ciu_szs=300x250%2C728x90" +
                    "&gdfp_req=1" +
                    "&output=vast" +
                    "&unviewed_position_start=1" +
                    "&env=vp" +
                    "&correlator=";
                adsRequest.linearAdSlotWidth = this._renderConfig.screenWidth;
                adsRequest.linearAdSlotHeight = this._renderConfig.screenHeight;
                adsLoader.requestAds(adsRequest);
            });
        }

        private stop(): void {
            this._adContainer.remove();
        }
    }