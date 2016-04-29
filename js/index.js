/**
 * Created by xuds on 2016/4/29.
 */
var map, zoom = 14, mapClick = null;
/**
 * @summary 初始化底图
 */
var initMap = function () {
    map = new TMap("mapBox");
    map.centerAndZoom(new TLngLat(108.94235, 34.26101), zoom);
    map.enableHandleMouseScroll();

};
/**
 * @summary 添加要素点
 * @param lng
 * @param lat
 */
function addMarker(map, feature) {
    var icon = new TIcon("../img/mapMark.png", new TSize(32, 32), {anchor: new TPixel(22, 32)});
    var marker = new TMarker(new TLngLat(feature.lng, feature.lat), {icon: icon});
    addMarkerClick(marker, feature);
    map.addOverLay(marker);

}
function addMapClick() {
    mapClick = TEvent.addListener(map, "click", function (p) {
        var lnglat = map.fromContainerPixelToLngLat(p);
        console.log(lnglat.getLng() + "," + lnglat.getLat());
    });
}
/**
 * @summary 注册标注点击事件
 * @param marker
 */
function addMarkerClick(marker, feature) {
    TEvent.addListener(marker, "click", function (p) {
        alert("标注点名称：" + feature.name);//feature//marker.getLngLat().getLng() + "," + marker.getLngLat().getLat()
    });
}
$(function () {
    initMap();
    $.get("data/feature.json", function (featureList) {
        $.each(featureList, function (index, feature) {
            addMarker(map, feature);
        })
    });
});