declare namespace google.ima {
    class AdDisplayContainer {
        constructor(adContainer: HTMLElement, videoElement?: HTMLVideoElement);
        initialize(): void;
    }

    class AdsLoader {
        constructor(adDisplayContainer: AdDisplayContainer);
        addEventListener(event: string, listener: (event: any) => void): void;
        requestAds(request: AdsRequest): void;
    }

    class AdsRequest {
        adTagUrl: string;
        linearAdSlotWidth: number;
        linearAdSlotHeight: number;
    }

    class AdsManager {
        init(width: number, height: number, viewMode: string): void;
        start(): void;
        destroy(): void;
        addEventListener(event: string, listener: (event: any) => void): void;
    }

    const ViewMode: {
        NORMAL: string;
    };

    const AdsManagerLoadedEvent: {
        Type: {
            ADS_MANAGER_LOADED: string;
        };
    };

    const AdErrorEvent: {
        Type: {
            AD_ERROR: string;
        };
    };

    const AdEvent: {
        Type: {
            STARTED: string;
            COMPLETE: string;
            CLICKED: string;
            PAUSED: string;
            RESUMED: string;
        };
    };
}