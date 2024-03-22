const url = 'https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json';

const dataPromise = d3.json(url);

function init() {
    // create a default bar chart on initialization
    barData = [{
      x: ['1', '2', '3', '4', '5'],
      y: [1, 2, 4, 8, 16],
      type: 'bar',
      orientation: 'h',
      text: ['a', 'b', 'c', 'd', 'e'],
      hoverinfo: 'text'
    }];

    bubbleData = [{
        x: ['1', '2', '3', '4', '5'],
        y: [1, 2, 4, 8, 16],
        mode: 'markers',
        marker: {
            color: ['rgb(93, 164, 214)', 'rgb(255, 144, 14)',  'rgb(44, 160, 101)', 'rgb(255, 65, 54)', 'rgb(255, 0, 0)'],
            size: [40, 60, 80, 100, 120]
        },
        text: ['a', 'b', 'c', 'd', 'e'],
    }];
  
    Plotly.newPlot("bar", barData);
    Plotly.newPlot("bubble", bubbleData)
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

        x = sampleValues[nameIndex].slice(0, 10).reverse();
        y = otuIds[nameIndex].slice(0, 10).map(sample => 'OTU ' + sample.toString()).reverse();
        text = otuLabels[nameIndex].slice(0, 10).reverse();

        Plotly.restyle('bar', 'x', [x]);
        Plotly.restyle('bar', 'y', [y]);
        Plotly.restyle('bar', 'text', [text]);

        Plotly.restyle('bubble', 'x', [otuIds[nameIndex]]);
        Plotly.restyle('bubble', 'y', [sampleValues[nameIndex]]);
        Plotly.restyle('bubble', 'text', [otuLabels[nameIndex]]);
        Plotly.restyle('bubble', 'marker.size', [sampleValues[nameIndex]]);
        Plotly.restyle('bubble', 'marker.color', [otuIds[nameIndex]]);

        let demographicDiv = d3.select('#sample-metadata');
        const metadata = data['metadata']
        console.log(metadata[nameIndex]['ethnicity'])
        console.log(metadata)
        let metadataList = demographicDiv.append('ul')

        metadataList.text(`id: ${metadata[nameIndex]['id']}`).attr('name', 'id')
        metadataList.text(`ethnicity: ${metadata[nameIndex]['ethnicity']}`).attr('name', 'ethnicity')
        metadataList.text(`gender: ${metadata[nameIndex]['gender']}`).attr('name', 'gender')
        metadataList.text(`age: ${metadata[nameIndex]['age']}`).attr('name', 'age')
        metadataList.text(`location: ${metadata[nameIndex]['location']}`).attr('name', 'location')
        metadataList.text(`bbtype: ${metadata[nameIndex]['bbtype']}`).attr('name', 'bbtype')
        metadataList.text(`wfreq: ${metadata[nameIndex]['wfreq']}`).attr('name', 'wfreq')

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

    let demographicDiv = d3.select('#sample-metadata');
    let metadataList = demographicDiv.append('ul')

    metadataList.append('li').attr('name', 'id')
    metadataList.append('li').attr('name', 'ethnicity')
    metadataList.append('li').attr('name', 'gender')
    metadataList.append('li').attr('name', 'age')
    metadataList.append('li').attr('name', 'location')
    metadataList.append('li').attr('name', 'bbtype')
    metadataList.append('li').attr('name', 'wfreq')
});

init();
optionChanged();