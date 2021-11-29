const WatermarkUtil = function () {
	
	var build = function(arg) {
        // 獲取頁面寬度
        let maxWidth = Math.max(document.body.scrollWidth, window.screen.width) - 20;
        // 獲取頁面高度
        let maxHeight = Math.max(document.body.scrollHeight, document.body.clientHeight) + 100;
        if (maxHeight === 0){
            return;
        }
        let setting = {
            text: "",                // 預設水印內容
            beginX: 50,              // 預設起始x座標
            endX: 0,                 // 預設結束x座標
            beginY: 50,              // 預設起始y座標
            endY: 0,                 // 預設結束y座標
            intervalX: 150,          // 預設橫向間隔寬度
            intervalY: 100,          // 預設縱向間隔高度
            opacity: 0.3,            // 字型透明度
            angle: 20,               // 字型傾斜度
            fontsize: '15px',        // 字型大小
            fontFamily: '微軟雅黑',     // 字型
            width: 100,              // 水印（每個）寬度
            height: 80,              // 水印（每個）高度
            innerDate: false,        // 是否附帶日期
        };
        // 預設變數與自定義變數結合
        if (arguments.length ===1 && typeof arguments[0] === "object"){
            let src = arguments[0] || {};
            for (let key in src){
                if (!src.hasOwnProperty(key) || !src[key]){
                    continue;
                }
                for (let def in setting){
                    if (key === def){
                        setting[def] = src[key];
                    }
                }
            }
        }
        // 計算列個數
        let cols = parseInt((setting.intervalX + maxWidth - setting.beginX - setting.endX) / (setting.width + setting.intervalX) + "");
        // 計算行個數
        let rows = parseInt((setting.intervalY + maxHeight - setting.beginY - setting.endY) / (setting.height + setting.intervalY) + "");
        // 水印內容附加日期
        if (setting.innerDate){
            let date = new Date();
            setting.text = [setting.text, "<br>", date.getFullYear(), "年", date.getMonth() + 1, "月", date.getDate(), "日"].join("");
        }
        let fragment = document.createDocumentFragment();
        let x, y;
        for (let i=0; i<rows; i++){
            y = setting.beginY + (setting.intervalY + setting.height) * i;
            for (let j=0; j<cols; j++){
                x = setting.beginX + (setting.width + setting.intervalX) * j;
                let element = document.createElement('div');
                element.id = 'watermark' + i + j;
                // 設定傾斜角
                element.style.MozTransform = "rotate(-" + setting.angle + "deg)";
                element.style.msTransform = "rotate(-" + setting.angle + "deg)";
                element.style.OTransform = "rotate(-" + setting.angle + "deg)";
                element.style.transform = "rotate(-" + setting.angle + "deg)";
                element.style.position = "absolute";
                element.style.left = x + 'px';
                element.style.top = y + 'px';
                element.style.overflow = "hidden";
                element.style.zIndex = "9999";
                element.style.pointerEvents = 'none';
                element.style.opacity = setting.opacity;
                element.style.fontSize = setting.fontsize;
                element.style.fontFamily = setting.fontFamily;
                element.style.color = '#aaa';
                element.style.textAlign = "center";
                element.style.width = setting.width + 'px';
                element.style.height = setting.height + 'px';
                element.style.display = "block";
                element.innerHTML = setting.text;
                fragment.appendChild(element);
            }
        }
        document.body.appendChild(fragment);
	}
	
    return {
        build: build
    }
}();