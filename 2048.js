var game={
	data:[[0,0,0,0],
		 [0,0,0,0],
		 [0,0,0,0],
		 [0,0,0,0]],
	PLAYING:1,
	GAME_OVER:0,
	state:1,
	isFull:function(){
		for(row=0;row<this.data.length;row++){
			for(col=0;col<this.data[row].length;col++){
				if(game.data[row][col]==0){
					return false;
				}
			}
		}
		return true;
	},
	randomNum:function(){
		if(!game.isFull()){
			while(true){
				var row=parseInt(Math.random()*4);
				var col=parseInt(Math.random()*4);
				var n=Math.random()<0.5?2:4;
				if(this.data[row][col]==0){
					this.data[row][col]=n;
					break;
				}
			}
		}
	},
	
	showView:function(){
		for(var row=0;row<this.data.length;row++){
			for(var col=0;col<this.data[row].length;col++){
				var div=document.querySelector("#fc"+row+col);
				var n=this.data[row][col];
				div.innerHTML=n==0?"":n;
				div.className=n==0?"fcell":"fcell n"+n;
			}
		}
	},
	start:function(){
		game.randomNum();
		game.randomNum();
		game.showView();
	},
	//箱左移动
	moveLeft:function(){
		if (this.canLeft()){
			for(var i=0;i<4;i++){
				game.moveLeftInRow(i);
			}	
			game.randomNum();
			game.showView();
		}
	},
	moveLeftInRow:function(row){
		var cells=game.data[row];
		for(var i=0;i<cells.length-1;i++){
			var nexti=game.getLeftNext(row,i);
			if(nexti!=-1){
				if(cells[i]==0){
					cells[i]=cells[nexti];
					cells[nexti]=0;
					i--;
				}else{
					if(cells[i]==cells[nexti]){
						cells[i]+=cells[nexti];
						cells[nexti]=0;
					} 
				}
			}
		}
	},
	getLeftNext:function(row,start){
		var cells=game.data[row];
		for(var i=start+1;i<4;i++){
			if( cells[i]!=0){
			return i;
			}
		}
		return -1;
	},
	//向右移动
	moveRight:function(){
		if(game.canRight())
		{
			for(var i=0;i<this.data.length;i++){
				this.getRightInRow(i);
			}
			this.randomNum();
			this.showView();
		}
	},
	getRightInRow:function(row){
		for(var i=this.data[row].length-1;i>0;i--){
			var nexti=this.getRightNext(row,i);
			if(nexti!=-1){
				if(this.data[row][i]==0){
					this.data[row][i]=this.data[row][nexti];
					this.data[row][nexti]=0;
					i++;
				}else if(this.data[row][i]==this.data[row][nexti]){
					this.data[row][i]+=this.data[row][nexti];
					this.data[row][nexti]=0;
				}
			}
		}
	},
	getRightNext:function(row,start){
		for(var i=start-1;i>=0;i--){
			if(this.data[row][i]!=0){
				return i;
			}
		}
		return -1;
	},
	moveUp:function(){
		if(this.canUp())
		{
			for(var col=0;col<4;col++){
				this.moveUpInCol(col);
			}
			this.randomNum();
			this.showView();
		}
	},
	moveUpInCol:function(col){
		for(var row=0;row<3;row++){
			var nextRow=this.getUpNext(col,row);
			if(nextRow!=-1){
				if(this.data[row][col]==0){
					this.data[row][col]=this.data[nextRow][col];
					this.data[nextRow][col]=0;
					row--;
				}else if(this.data[row][col]==
					this.data[nextRow][col]){
					this.data[row][col]+=
					this.data[nextRow][col];
					this.data[nextRow][col]=0;
				}
			}
			else{
				break;  
			}
		}
	},
	getUpNext:function(col,startRow){
		for(var row=startRow+1;row<4;row++){
			if(this.data[row][col]!=0){
				return row;
			}
		}
		return -1;
	},
	moveDown:function(){
		if (this.canDown()){
			for(var col=0;col<4;col++){
				this.moveDownInCol(col);
			}
			this.randomNum();
			this.showView();
		}
	},
	moveDownInCol:function(col){
		for(var row=3;row>=0;row--){
			var nextRow=this.getDownNext(col,row);
			if (nextRow!=-1)
			{
				if (this.data[row][col]==0)
				{
					this.data[row][col]=this.data[nextRow][col];
					this.data[nextRow][col]=0;
					row++;
				}else if (this.data[row][col]==
					this.data[nextRow][col])
				{
					this.data[row][col]+=
						this.data[nextRow][col];
					this.data[nextRow][col]=0;
				}
			}
		}
	},
	getDownNext:function(col,startRow){
		for(var row=startRow-1;row>=0;row--){
			if(this.data[row][col]!=0){
				return row;
			}
		}
		return -1;
	},
	canLeft:function(){
		for(var row=0;row<4;row++){
			for (var col=1;col<4 ;col++ )
			{
				var curr=this.data[row][col];
				var left=this.data[row][col-1];
				if (curr!=0)
				{
					if (left==0||left==curr)
					{
						return true;
					}
				}

			}
		}
		
	},
	canRight:function(){
		for(var row=0;row<4;row++){
			for (var col=0;col<3 ;col++ )
			{
				var curr=this.data[row][col];
				var right=this.data[row][col+1];
				if (curr!=0)
				{
					if (right==0||right==curr)
					{
						return true;
					}
				}

			}
		}
		
	},
	canUp:function(){
		for(var row=1;row<4;row++){
			for (var col=0;col<4 ;col++ )
			{
				var curr=this.data[row][col];
				var up=this.data[row-1][col];
				if (curr!=0)
				{
					if (up==0||up==curr)
					{
						return true;
					}
				}

			}
		}
		
	},
	canDown:function(){
		for(var row=0;row<3;row++){
			for (var col=0;col<4 ;col++ )
			{
				var curr=this.data[row][col];
				var down=this.data[row+1][col];
				if (curr!=0)
				{
					if (down==0||down==curr)
					{
						return true;
					}
				}

			}
		}
		
	},
	gameOver:function(){
		if (!this.isFull()){return false;}
		for (var row=0;row<4 ;row++ ){
			for (var col=0;col<4 ;col++ ){
				var curr=this.data[row][col];
				if(curr==8192){return true;}
				if (row!=0){
					if(this.data[row-1][col]==curr){
						return false;
					}
				}
				if (row!=3){
					if(this.data[row+1][col]==curr){
						return false;
					}
				}
				if(col!=0){
					if(this.data[row][col-1]==curr){
						return false;
					}
				}
				if(col!=3){
					if(this.data[row][col+1]==curr){
						return false;
					}
				}
			}
		}
		return true;
	}


}



