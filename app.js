const inputs = document.querySelectorAll('input');
const eight = document.querySelector('.eight');
const pol5 = document.querySelector('#pol5')






AOS.init({
  duration: 3000
})



trigger()


function trigger() {
  for(let i = 0; i < inputs.length; i++) {
    let input = inputs[i];
    input.addEventListener('click', function() {
      if(input.classList.contains('answer')) {
        let elements = input.parentElement.children;
        for(let el of elements) {
          if(el.classList.contains('toggle')) {
            el.style.display = 'block'
            el.style.transition = '2s ease'
          }
        }
      }      
    })
   
  }

}


pol5.addEventListener('click', () => {
  eight.lastElementChild.previousElementSibling.style.display = 'block'
  if(pol5.checked === false) {
    eight.lastElementChild.previousElementSibling.style.display = 'none'

  }
})




// d3 JS from here

let body = d3.select('#body')
d3.csv('income.csv').then(showGraph)


function toolTip(text, coor) {
 
  d3.select('#tooltip')
    .text(text)     
    .style('top', coor[1])        
    .style('display', 'block')          
}

function showGraph(incomeGroup) {
  let max = d3.max(incomeGroup, d => +d.GenderIndex)
  let scale = d3.scaleLinear()
    .range([0, 300])
    .domain([0, max])
  
  let scaleVertical = d3.scaleBand()
    .range([0, 200])
    .domain(incomeGroup.map(d => d.IncomeGroup))
    .padding(0.3)

  let join = body
    .selectAll('rect')
    .data(incomeGroup)
  
  join.enter()
      .append('rect')
      .attr('stroke', 'none')
      .attr('fill', '#55cbcd')
      .attr('width', d => scale(+d.GenderIndex))
      .attr('height', scaleVertical.bandwidth())          
      .attr('y', d => scaleVertical(d.IncomeGroup))
      .on('mouseenter', d => toolTip(d.GenderIndex + '%', [d3.event.y]))
      .on('mousemove', d =>  toolTip(d.GenderIndex + '%', [d3.event.y]))
      .on('mouseleave', d => d3.select("#tooltip").style("display", "none"))      
  
  let xAxis = d3.axisBottom(scale)
      .ticks(10)
      .tickFormat(d => d + ' %')
  d3.select('#xAxis')
      .call(xAxis)
      .attr('transform', 'translate(120, 200)')
      .attr('stroke', '#fff')

  
  let yAxis = d3.axisLeft(scaleVertical)
  d3.select('#yAxis')
      .call(yAxis)
      .attr('transform', 'translate(120, 0)')
      .attr('stroke', '#fff')          
  
}