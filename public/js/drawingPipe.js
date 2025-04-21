function getDrawingPipe() {
    axios
        .get(ulrGetDrawingPipe)
        .then((res) => {
            for (const gp of res.data) {
                for (const p of gp.Pipes) {
                    for (const line of p.Lines) {
                        let lines = [];

                        let content = ` <p >
                                <span>Mã nhóm tuyến ống: </span>
                                <b> ${gp?.GroupPipeId}</b>
                            </p>
                            <p >
                                <span>Tên nhóm tuyến ống: </span>
                                <b> ${gp?.GroupPipeName}</b>
                            </p>
                            <p >
                                <span>Mã tuyến ống: </span>
                                <b> ${p?.PipeId}</b>
                            </p>
                            <p >
                                <span>Tên tuyến ống: </span>
                                <b> ${p?.PipeName}</b>
                            </p>
                            <p >
                                <span>Chiều dài ống: </span>
                                <b> ${p?.Length == null ? '' : p?.Length}</b>
                            </p>
                            <p >
                                <span>Kích thước ống: </span>
                                <b> ${p?.Size == null ? '' : p?.Size}</b>
                            </p>
                           `;

                        for (const l of line.Lines) {
                            var point = new L.LatLng(
                                parseFloat(l[0]),
                                parseFloat(l[1]),
                            );

                            lines.push(point);
                        }

                        var polyLine = new L.Polyline(lines, {
                            color: line.Color,
                            weight: 3,
                            opacity: 0.8,
                            smoothFactor: 1,
                        }).bindPopup(content);
                        polyLine.addTo(map);
                    }
                }
            }
        })
        .catch((err) => {
            console.log(err);
        });
}

//getDrawingPipe();

// Style for pipelines
const pipelineStyle = (feature) => {
    return {
        color: feature.properties.Color || 'green',
        weight: 2,
        opacity: 0.8,
    };
};

function getDataPipeDrawing() {
    axios
        .get(urlGetPipesByGroupPipe)
        .then((res) => {
            // Draw the converted pipelines on the map
            L.geoJSON(res.data, {
                style: pipelineStyle,
                onEachFeature: (feature, layer) => {
                    // Add popup with pipeline info
                    if (feature.properties) {
                        const props = feature.properties;
                        layer.bindPopup(`
                        <b>Pipeline ID:</b> ${props.IDDoanOC}<br>
                        <b>Length:</b> ${props.ChieuDaiHC} m<br>
                        <b>Diameter:</b> ${props.DuongKinhN} mm <br>
                    `);
                    }
                },
            }).addTo(map);
        })
        .catch((err) => {
            console.log(err);
        });
}

getDataPipeDrawing();
