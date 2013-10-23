    var flexibleTimeSlider = new Object;
    flexibleTimeSlider = {
      switchPoints: [],
      switchPointsReverse: [],

      config: function( configObj ){
        this.switchPoints = configObj.switchPoints;
        this.transformSwitchPoints( this.switchPoints );
        this.display = configObj.display;
      },

      transformSwitchPoints: function( input ){
        // console.log( this.switchPoints );
        this.switchPoints = this.switchPoints.sort(dynamicSort('start'));
        this.switchPoints = this.addRestUnits( this.switchPoints );

        //Wenn man sagt this.switchPointsReverse = this.switchPoints, dann macht man nur
        //eine Referenz, die dann unten dann vier Zeilen weiter unten auch wieder mit 
        //umgedreht wird.
        this.switchPoints.sort(dynamicSortReverse('start'));
        this.switchPointsReverse = [];
        for (var i in this.switchPoints){
          this.switchPointsReverse[i] = this.switchPoints[i];
        }
        //Wieder von klein nach gross drehen
        this.switchPoints = this.switchPoints.sort(dynamicSort('start'));
        // console.log( this.switchPoints );
      },

      addRestUnits: function( inputArr ){
        for (var i = 0; i < inputArr.length ; i++) {
          if ( i == 1){

          }
          if ( (i + 1) < inputArr.length ){
            var restUnits = inputArr[i+1].start - inputArr[i].start;
            inputArr[i].restUnits = restUnits;

          }
        };

        return inputArr;
      },

      value2time: function( value ){
        var result = 0;
        var firstPartTime = 0;
        var switchPoint = this.checkSwitchpoint(value);
                

        var cycles = this.switchPoints.length - 1;
        cycles = cycles - switchPoint;
        
        for (var i = 1; i <= cycles ; i++) {
          if ( i == 1){
            firstPartTime += this.switchPoints[1].start;
          }
          else {
            firstPartTime += this.switchPoints[i-1].restUnits * this.switchPoints[i-1].step;
          }
        }
        
        // console.log( this.switchPointsReverse );
        value -= this.switchPointsReverse[switchPoint].start;
        result += (this.switchPointsReverse[switchPoint].step * value );

        // console.log( firstPartTime );
        // console.log( result );

        result += firstPartTime;

        $(this.display).html( this.timeInSec2time(result) );
      },

      timeInSec2time: function  ( value ){
        var min =  Math.floor(value / 60);
        var sec = value % 60;
        if ( sec < 10 ){
          sec = "0" + sec;
        }

        return min + ':' + sec;
      },

      checkSwitchpoint: function( value ){
        // console.log( this.switchPointsReverse );
        // console.log("this.switchPointsReverse.length:" +  this.switchPointsReverse.length);
        for (var i = 0; i < this.switchPointsReverse.length; i++) {
          // console.log("this.switchPointsReverse[i].start:" +  this.switchPointsReverse[i].start);
          if (value > this.switchPointsReverse[i].start){
            var startSwitchPoint = i;
            break;
          }
        };
        return startSwitchPoint;
      }

    };

