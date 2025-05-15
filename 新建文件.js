// 獲取 Construct 物件
const video = runtime.objects["視頻"].getFirstInstance(); // 影片物件（名稱：視頻）
const slider = runtime.objects.mySlider.getFirstInstance(); // 進度條

// 設定影片長度為 177 秒（如果影片來源無法正確提供長度）
video.element.addEventListener("loadedmetadata", () => {
    slider.maxValue = video.element.duration || 177; // 如果無法取得長度，設為 177 秒
});

// 影片播放時，讓滑桿自動更新
video.element.addEventListener("timeupdate", () => {
    if (!slider.isDragging) {  // 當滑桿未被拖動時，自動更新
        slider.value = video.element.currentTime;
    }
});

// 監聽滑桿開始拖動
slider.element.addEventListener("mousedown", () => {
    slider.isDragging = true;
});

// 監聽滑桿釋放，讓影片跳轉到對應時間
slider.element.addEventListener("mouseup", () => {
    video.element.currentTime = slider.value;
    slider.isDragging = false;
});

// 監聽滑桿變更（拖動時即時改變影片時間）
slider.element.addEventListener("input", () => {
    if (slider.isDragging) {
        video.element.currentTime = slider.value;
    }
});


