
var maxLines = 8; var speed=10; var thick=2; var n, drawStraight;
var palettes = ['#E0E4CC', '#53777A', '#542437', '#ECD078'];
//var palettes = ['#E0E4CC', '#FA6900', '#C02942', '#69D2E7'];

function init()
{
	addGui();	
	canvas.drawClean = false;
	canvas.background = '#fff';
	canvas.windowTitle = 'HoneyComb &#187; Right Click & Select Save Image As'
	onStart();
}

function addLine()
{
	var c = new JS3Line({x2:Math.random()*canvas.width, y2:Math.random()*canvas.height, strokeColor:getNextColor(), strokeWidth:thick, tick:0});
	c.dirX = c.dirY = 1;
	canvas.addChild(c);
	if (canvas.numChildren >= maxLines) canvas.stop(addLine);
}

function getNextColor()
{
	n < palettes.length-1 ? n++ : n=0; return palettes[n];
}

function drip()
{
	for (var i=0; i < canvas.numChildren; i++) {
		var k = canvas.getChildAt(i);
		k.tick += Math.round(Math.random()*4);
		k.x1 = k.x2; k.y1 = k.y2;
		k.x2 += k.dirX * speed;
		k.y2 += k.dirY * speed;
		if (k.x2 > canvas.width || k.x2 < 0 || (k.tick%2==0 && !drawStraight)) k.dirX *=-1;
		if (k.y2 > canvas.height || k.y2 < 0 || (k.tick%4==0 && !drawStraight)) k.dirY *=-1;			
	};
}

function addGui()
{
	var o = {
		'Grow Speed'		: speed,		
		'Line Thickness'	: thick,
		'Color 1'	 		: '#E0E4CC',
		'Color 2' 			: '#53777A',
		'Color 3' 			: '#542437',
		'Color 4' 			: '#ECD078',
		'Draw Straight'		: false,
		'Clear Canvas'		: function() { canvas.clear(); },
		'Save as PNG'		: function() { canvas.save(); }
	}
	var gui = new dat.GUI({ autoPlace: false });
	var s1 = gui.add(o, 'Grow Speed', 1, 100);
		s1.onChange(function(val){speed=val});
	var s1 = gui.add(o, 'Line Thickness', 1, 50);
		s1.onChange(function(val){
			thick = val; for (var i=0; i < canvas.numChildren; i++) canvas.getChildAt(i).strokeWidth=val;
		});		
	var c1 = gui.addColor(o, 'Color 1');
		c1.onChange(function(val){palettes[0]=canvas.getChildAt(0).strokeColor=val});
	var c2 = gui.addColor(o, 'Color 2');
		c2.onChange(function(val){palettes[1]=canvas.getChildAt(1).strokeColor=val});	
	var c3 = gui.addColor(o, 'Color 3');
		c3.onChange(function(val){palettes[2]=canvas.getChildAt(2).strokeColor=val});	
	var c4 = gui.addColor(o, 'Color 4');
		c4.onChange(function(val){palettes[3]=canvas.getChildAt(3).strokeColor=val});	
	var rd = gui.add(o, 'Draw Straight');
		rd.onChange(function(val){drawStraight=val});
	var cl = gui.add(o, 'Clear Canvas');
	var sv = gui.add(o, 'Save as PNG');	
	var div = document.getElementById('datgui');
	div.appendChild(gui.domElement);
};

function onStart()
{
	canvas.run(drip);
	canvas.run(addLine, 1);
}

function onStop()
{
	canvas.stop(drip);	
	canvas.stop(addLine);	
}