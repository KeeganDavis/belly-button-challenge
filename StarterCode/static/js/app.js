const url = 'https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json';

const dataPromise = d3.json(url);

function init() {
    // create a default bar chart on initialization
    data = [{
      x: ['1', '2', '3', '4', '5'],
      y: [1, 2, 4, 8, 16],
      type: 'bar',
      orientation: 'h',
      text: ['a', 'b', 'c', 'd', 'e'],
      hoverinfo: 'text'
    }];
  
    Plotly.newPlot("bar", data);
  }

  function optionChanged() {
    dataPromise.then(data => {
        const allNames = data['names'];
        let dropdownMenu = d3.select('#selDataset');
        let dataset = dropdownMenu.property('value');   
        let nameIndex = allNames.indexOf(dataset);  
        console.log(nameIndex)
        

        // collect all data for the samples and use that to get the sample values, otu ids, and otu labels
        const allSamples = data['samples'];
        const sampleValues = allSamples.map(sample => sample['sample_values']);
        const otuIds = allSamples.map(sample => sample['otu_ids']);
        const otuLabels = allSamples.map(sample => sample['otu_labels']);
        console.log(sampleValues[nameIndex].slice(0, 10).reverse())

        let x = [];
        let y = [];
        let text = [];

        x = [sampleValues[nameIndex].slice(0, 10).reverse()];
        y = [otuIds[nameIndex].slice(0, 10).map(sample => 'OTU ' + sample.toString()).reverse()];
        text = [otuLabels[nameIndex].slice(0, 10).reverse()];

        // let barData = [{
        //     type: 'bar',
        //     x: [sampleValues[nameIndex].slice(0, 10).reverse()],
        //     y: [otuIds[nameIndex].slice(0, 10).map(sample => 'OTU ' + sample.toString()).reverse()],
        //     orientation: 'h',
        //     text: [otuLabels[nameIndex].slice(0, 10).reverse()],
        //     hoverinfo: 'text'
        // }];

        Plotly.restyle('bar', 'x', x);
        Plotly.restyle('bar', 'y', y);
        Plotly.restyle('bar', 'text', text);

    });
    
  };

dataPromise.then(data => {
    // get all subject names and the select html element
    const allNames = data['names'];
    let dropdownMenu = d3.select('#selDataset');
    // loop through each name and add an option element with the text and value attribute equal to the name
    allNames.forEach(name => {
        dropdownMenu.append('option')
                .text(name)
                .attr('value', name)
    });

    


    // let dataset = dropdownMenu.property('value');
    // let nameIndex = allNames.indexOf(dataset);
    // console.log(nameIndex)

    // collect all data for the samples and use that to get the sample values, otu ids, and otu labels
    // const allSamples = data['samples'];
    // const sampleValues = allSamples.map(sample => sample['sample_values']);
    // const otuIds = allSamples.map(sample => sample['otu_ids']);
    // const otuLabels = allSamples.map(sample => sample['otu_labels']);
    
    // let barData = [{
    //     type: 'bar',
    //     x: sampleValues[0].slice(0, 10).reverse(),
    //     y: otuIds[0].slice(0, 10).map(sample => 'OTU ' + sample.toString()).reverse(),
    //     orientation: 'h',
    //     text: otuLabels[0].slice(0, 10).reverse(),
    //     hoverinfo: 'text'
    // }];

    // Plotly.newPlot('bar', barData);


});

init();
optionChanged();