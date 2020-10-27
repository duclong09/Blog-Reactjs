

export const displayMap = locations => {
    mapboxgl.accessToken = 'pk.eyJ1IjoidHJhbmNvbmdob2EiLCJhIjoiY2tmOTJiM3M5MGkwdDMwbzd4NWUweHhvaCJ9.jrvl0Reo1_lm5LlePrSTPA';
    var map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/tranconghoa/ckg4k743o2qfe19qkreumly0a',
        // khong cho zoom
        // scrollZoom:false,
    
        // longtitude(kinh do-doc)-latitude(vi do-ngang)
        // center: [10.851586, 106.758414],
        //sep xet theo google (vi do Lati) roi den (kinh do Log)
    
        // forcus tuong tac
        center: [106.758414,10.851586],
        zoom:25,
        // khong cho keo chuot
        // interactive:false
    });
    // hien thi danh sach cac dia diem
    // const bounds = new mapboxgl.LatLngBounds();
    
    const bounds = new mapboxgl.LngLatBounds();
    // trong mongodb expect(mong doi) longtitude(kinh-doc) first then latitude
    locations.forEach(loc => {
        // create marker
        const el = document.createElement('div');
        el.className = 'marker';
        // add marker
        new mapboxgl.Marker({
            element: el,
            anchor: 'bottom'
        }).setLngLat(loc.coordinates).addTo(map);// day la mang of: longti(kinh-doc) -latitude
        // add popup
        new mapboxgl.Popup({
            offset:30
        }).setLngLat(loc.coordinates)
        .setHTML(`<p>${loc.description}</p>`)
        .addTo(map);
      
        // extend map bounds to include current location
        bounds.extend(loc.coordinates);
    });
    
    map.fitBounds(bounds,{
        padding:{
            top: 50,
            bottom: 50,
            left:50,
            right:50
        }
    });
}
