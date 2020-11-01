import React, { Component } from "react";
import {getCategoriesList, getCategoryVideos} from '../../request'
import Chart from "react-apexcharts";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      options: {
        chart: {
          id: "basic-bar"
        },
        xaxis: {
          categories: []
        }
      },
      series: [
        {
          name: "series-1",
          data: []
        }
      ]
    };
  }

    componentDidMount() {
        this.getCategoryWiseData()
    }

    getCategoryWiseData = async () => {
       let categories = await getCategoriesList()

       const categoryNames = categories.map(item => item.category)
       console.log(categoryNames)
        this.setState({
            options: {
                chart: {
                  id: "basic-bar",
                  height: 20
                },
                xaxis: {
                  categories: categoryNames
                }
              }
        });

       const promises = categories.map( async (category) => {
            let videos = await getCategoryVideos(category.id);
            return videos.length
       })

       let numberOfMovies = await Promise.all(promises);
       this.setState({
         series: [
            {
              name: "series-1",
              data: numberOfMovies
            }
          ]
       })
    }

  render() {
    return (
      <div className="app">
        <div className="row">
          <div className="mixed-chart">
            <Chart
              options={this.state.options}
              series={this.state.series}
              type="bar"
              width="700"
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;