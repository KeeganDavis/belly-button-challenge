const url = 'https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json';

const dataPromise = d3.json(url);

function init() {
    data = [{
      labels: [1, 2, 3, 4, 5],
      values: [1, 2, 4, 8, 16],
      type: 'bar' 
    }];
  
    Plotly.newPlot("bar", data);
  }

dataPromise.then(data => {
    const allSamples = data['samples'];

    const sampleValues = allSamples.map(sample => sample['sample_values']);

    const otuIds = allSamples.map(sample => sample['otu_ids']).filter((a, b) => b-a);
    console.log(otuIds)

    const otuLabels = allSamples.map(sample => sample['otu_labels']);

    let barData = [{
        type: 'bar',
        x: otuIds[0],
        y: sampleValues[0],
        orientation: 'h'
    }];

    Plotly.newPlot('bar', barData);


});

init();