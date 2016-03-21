import System;
import c0_4unity_chess;


/**
 *
 *
 *
 */
public var newGameButton : UnityEngine.UI.Button;
public var takeBackButton : UnityEngine.UI.Button;














// This is the main scripting part...
var Name="Various javascripts";
var FirstStart=true;
var drawAnim=true;						// Animation /or fastest visual performance by redrawing...

var setCamSide=false;
var setCamTop=true;

var lightsValue=1;						// One lamp at the beginning...

var toPromote=0;						// Promotion option (0-Q,1-R,2-B,3-N)...

var CameraX=0;							// Camera can be horiz-scrolled...
var CamXpre=0;
var CamSidepre=1;

var drag1_at="";								// square with a piece dragged after the first drag...
var drag1_animator:int=0;						// On drag start animation -counter

var move_animator:int=0;					// Animation counter when a piece is moving...

var mouse_at="";							// Keeps last mouse square at... (just for legal moves suggestion by using particle)

var message2show="";						// Message to show on GUI
var engineStatus=0;

var gameover=false;						// is true when the game is over...

var TakeBackFlag=false;					// true on takeback-button was pressed...

var NewGameFlag=false;					// true on new game-button was pressed...

var chess_strength=3;						// Set strength of chess engine...

public var C0:c0_4unity_chess = new c0_4unity_chess();

var jsJesterAccessible=false;				// Script sets true on jsJester is accessible...
var usejsJester=false;						// toggled by user if use...

var CraftyAccessible=false;				// Script sets true on Crafty is accessible...
var useCrafty=false;						// toggled by user if use...

var RybkaAccessible=false;				// Script sets true on Rybka is accessible...
var useRybka=false;						// toggled by user if use...

var StockfishAccessible=false;			// Script sets true on Rybka is accessible...
var useStockfish=false;					// toggled by user if use...

var TcpAccessible=true;					// Script sets true if chess server is accessible...
var playTcp=false;							// toggled by user if play...
var statusTcp=0;							// status of connection...
var TcpMessage="";							// Output on GUI of tcp-connection...
var TcpMess_scrollPosition: Vector2 = Vector2.zero;
var TcpResign=false;						// Resign flag on button pressed...
var TcpDraw=false;							// Draw flag on button pressed...
var TcpNextGame=false;					// When next-game button should be displayed...
var TcpModeCmd=false;					// On [Esc] turn on/off cmd mode...
var TcpCmd="";								// It's possible to send a message to oponent...

var TcpTakeBackWas=false;		// just if user want's it's possible to set board
var TcpPreMNr=0;					// just to keep last move Nr. for games on chess server
var TcpPreMCol="";

// GUI interface on screen...

function OnGUI () {

	var e : Event = Event.current;
	if(e.isKey && (Input.anyKey) && (e.keyCode.ToString()=="Escape") )
	{
	TcpModeCmd=!TcpModeCmd;		// Turn on/off cmd mode...
	(GameObject.Find("Script4")).SendMessage("AutoMode",  (TcpModeCmd ? "OFF" : "ON" )); 
	}
		
	if(playTcp && TcpModeCmd)
		{
		GUI.Label (Rect (14, Screen.height-70, 16, 24), "$");
		TcpCmd= GUI.TextArea(Rect (30, Screen.height-70, 200, 24), TcpCmd);
		}
	if(TcpMessage.length>0)
		{
		if(statusTcp==21)
			{
			GUI.Box (Rect (Screen.width - 190, 140, 185, 280), TcpMessage);
			if(TcpNextGame)
				{
				if(GUI.Button (Rect (Screen.width - 100, 340, 80, 30), "Next>")) TcpNextGameStarter();
				}
			}
		else
			{
			GUI.Box (Rect ((Screen.width/2-310), 25, 620, Screen.height-50), "Unity3D connection to chess server");
		
			TcpMess_scrollPosition = GUI.BeginScrollView (Rect ((Screen.width/2-305), 50, 610, Screen.height-100),
				TcpMess_scrollPosition, Rect ((Screen.width/2-305), 50, 800, 2000));
				
			TcpMessage = GUI.TextArea (Rect ((Screen.width/2-305), 50, 800, Screen.height+2000-100), TcpMessage);

			GUI.EndScrollView ();
			message2show="Wait...";
			}
		}

	if(message2show.length>0)
		{
		GUI.Box (Rect (10, 25, 120, 40), message2show);
		if(engineStatus==1) { engineStatus=2; }
		
		GUI.Box (Rect (10, 70, 120, 255), "");

		drawAnim = GUI.Toggle (Rect (20, 80, 130, 20), drawAnim, "Animation");
		
		setCamSide = GUI.Toggle (Rect (20, 115, 130, 20), setCamSide, "Top camera");
		setCamTop = GUI.Toggle (Rect (20, 135, 130, 20), setCamTop, "Side camera");
		CameraX = GUI.HorizontalSlider (Rect (20, 165, 100, 30), CameraX , -10, 10);
		
		GUI.Label (Rect (30, 185, 130, 30), "Lamps");
		lightsValue = GUI.HorizontalSlider (Rect (20, 205, 100, 30), lightsValue, 0.0, 2);
		
		GUI.Box (Rect (Screen.width - 130, 90-65, 120, 110), "Promotion");	//-65
		GUI.Label (Rect (Screen.width - 90, 110-65, 90, 22), "Queen");
		GUI.Label (Rect (Screen.width - 90, 130-65, 90, 22), "Rook");
		GUI.Label (Rect (Screen.width - 90, 150-65, 90, 22), "Bishop");
		GUI.Label (Rect (Screen.width - 90, 170-65, 90, 22), "Knight");
		toPromote = GUI.VerticalSlider (Rect (Screen.width - 110, 115-65, 80, 72), toPromote, 0, 3);
		
		if(playTcp)			// chess server mode, just play as it is
		{
			if(GUI.Button (Rect (20, 240, 100, 30), "Resign")) TcpResign=true;

			if(GUI.Button (Rect (20, 280, 100, 30), "Offer/Acc.Draw")) TcpDraw=true;
		}
		else					// various options...
		{
		if(GUI.Button (Rect (20, 240, 100, 30), "Take Back")) TakeBackFlag=true;
		





		    // Spatial GUI button handle
            //if()

		if(GUI.Button (Rect (20, 280, 100, 30), "New Game")) 
		{
		    NewGameFlag = true;
		    Debug.Log("Button pushed");
		}










		
		GUI.Box (Rect (Screen.width - 130, 140, 120, 60), "Chess strength");
		chess_strength = GUI.HorizontalSlider (Rect (Screen.width - 120, 170, 100, 30), chess_strength, 1, 6);
		
		if(jsJesterAccessible)
			{
			GUI.Box (Rect (Screen.width - 130, 205, 120, 30), "");
			usejsJester = GUI.Toggle (Rect (Screen.width - 110, 210, 90, 20), usejsJester, "script-code");
			}
		if(CraftyAccessible)
			{
			GUI.Box (Rect (Screen.width - 130, 240, 120, 30), "");
			useCrafty = GUI.Toggle (Rect (Screen.width - 110, 245, 90, 20), useCrafty, "Use Crafty");
			}
		if(RybkaAccessible)
			{
			GUI.Box (Rect (Screen.width - 130, 275, 120, 30), "");
			useRybka = GUI.Toggle (Rect (Screen.width - 110, 280, 90, 20), useRybka, "or Rybka");
			}	
		if(StockfishAccessible)
			{
			GUI.Box (Rect (Screen.width - 130, 310, 120, 30), "");
			useStockfish = GUI.Toggle (Rect (Screen.width - 110, 315, 90, 20), useStockfish, "or Stockfish");
			}	
		if(TcpAccessible)
			{
			GUI.Box (Rect (Screen.width - 130, 345, 120, 30), "");
			playTcp = GUI.Toggle (Rect (Screen.width - 116, 350, 106, 20), playTcp, "freechess.org");
			}
		}
		
		}
}

/**
 *
 *
 */
function NewGameEvent()
{
	// TODO
    Debug.Log("CECI EST UN TEST");
}

/**
 *
 *
 *
 */
function TakeBackEvent()
{
    // TODO
}

/**
 *
 *
 */
function Start ()
{
	// TODO
	newGameButton.onClick.AddListener(function() { NewGameEvent(); });



    // TODOD : INDENTATION !!!!
// Hide objects that are not visually needed... 
//(script 3d objects are just for scripting purposes, to hold chess programs and activate them frequently (frames per second)...
GameObject.Find("Script1").GetComponent.<Renderer>().enabled = false;
GameObject.Find("Script2").GetComponent.<Renderer>().enabled = false;
GameObject.Find("Script3").GetComponent.<Renderer>().enabled = false;
GameObject.Find("Script4").GetComponent.<Renderer>().enabled = false;
GameObject.Find("Script5").GetComponent.<Renderer>().enabled = false;
GameObject.Find("Script6").GetComponent.<Renderer>().enabled = false;
GameObject.Find("Script7").GetComponent.<Renderer>().enabled = false;

ActivateCamera(true);					// Initial - set side camera as main
SetLamps(true);							// Initiol - set bright Light1

}

// frames per second run part...
function Update ()
{
ActivateCamera(false);				// check for camera settings - if swap requested by user..
SetLamps(false);						// check for lights slider settings...
LookTcp();

if(FirstStart) // could be right in Start(), anyway it's the same..., sometimes good to wait a bit while all the objects are being created...
	{
	PlanesOnBoard();					// Planes needed for mouse drag... (a ray from camera to this rigibody object is catched)...
	TransformVisualAllToH1();		// The board contains blank-pieces (to clone from) just on some squares. Moving all of them to h1... 

	//1.FEN startup test (ok):	
	//C0.c0_start_FEN="8/p3r1k1/6p1/3P2Bp/p4N1P/p5P1/5PK1/8 w - - 0 1";
	//C0.c0_set_start_position("");
	//print(C0.c0_get_FEN());
		
	//C0.c0_start_FEN="7k/Q7/2P2K2/8/8/8/8/8 w - - 0 70";		// a checkmate position just for tests...

	C0.c0_side=1;							// This side is white.   For black set -1
	C0.c0_waitmove=true;					// Waiting for mouse drag...
	C0.c0_set_start_position("");		// Set the initial position... 
	
	//2.PGN functions test (ok):
	//PGN0="1.d4 d5 2.c4 e6 3.Nf3 Nf6 4.g3 Be7 5.Bg2 0-0 6.0-0 dxc4 7.Qc2 a6 8.Qxc4 b5 9.Qc2 Bb7 10.Bd2 Be4 11.Qc1 Bb7 12.Qc2 Ra7 13.Rc1 Be4 14.Qb3 Bd5 15.Qe3 Nbd7 16.Ba5 Bd6 17.Nc3 Bb7 18.Ng5 Bxg2 19.Kxg2 Qa8+ 20.Qf3 Qxf3+ 21.Kxf3 e5 22.e3 Be7 23.Ne2 Re8 24.Kg2 Nd5 25.Nf3 Bd6 26.dxe5 Nxe5 27.Nxe5 Rxe5 28.Nd4 Ra8 29.Nc6 Re6 30.Rc2 Nb6 31.b3 Kf8 32.Rd1 Ke8 33.Nd4 Rf6 34.e4 Rg6 35.e5 Be7 36.Rxc7 Nd5 37.Rb7 Bd8 38.Nf5 Nf4+ 39.Kf3 Bxa5 40.gxf4 Bb4 41.Rdd7 Rc8 42.Rxf7 Rc3+ 43.Ke4 1-0";
	//var mlist= C0.c0_get_moves_from_PGN(PGN0); print(mlist);
	//var PGN1=C0.c0_put_to_PGN(mlist); print(PGN1);
	
	//3.Fischerrandom support test (ok):
	//var PGN0="[White Aronian, Levon][Black Rosa, Mike][Result 0:1][SetUp 1][FEN bbrkqnrn/pppppppp/8/8/8/8/PPPPPPPP/BBRKQNRN w GCgc - 0 0] 1. c4 e5 2. Nhg3 Nhg6 3. b3 f6 4. e3 b6 5. Qe2 Ne6 6. Qh5 Rh8 7. Nf5 Ne7 8. Qxe8+ Kxe8 9. N1g3 h5 10. Nxe7 Kxe7 11. d4 d6 12. h4 Kf7 13. d5 Nf8 14. f4 c6 15. fxe5 dxe5 16. e4 Bd6 17. Bd3 Ng6 18. O-O Nxh4 19. Be2 Ng6 20. Nf5 Bc5+ 21. Kh2 Nf4 22. Rc2 cxd5 23. exd5 h4 24. Bg4 Rce8 25. Bb2 g6 26. Nd4 exd4 27.Rxf4 Bd6 0-1";
	//var mlist= C0.c0_get_moves_from_PGN(PGN0); print(mlist);
	//var PGN1=C0.c0_put_to_PGN(mlist); print(PGN1);
	
	//4.Other functions, and, of course, access variables directly C0.<variable>=...
	//C0.c0_position=...  -position of pieces on board...
	//C0.c0_moveslist=... -moveslist is the list of moves made on board currently...
	
	// Make a first move e4...
	//C0.c0_set_start_position("");
	//C0.c0_move_to("e2","e4");
	
	// Show the last move made...
	//print(C0.c0_D_last_move_was());
	// And take it back...
	//C0.c0_take_back();
	
		// To see possible movements...
	//print(C0.c0_get_next_moves());
	
	//Other functions:
	//Is e2-e4 a legal move in current position...
	//print(C0.c0_D_can_be_moved("a2","a4"));
	//Is there stalemate to the white king right now? ("b"/"w"- the parameter)
	//print(C0.c0_D_is_pate_to_king("w"));
	//Is there check to the white king right now? 
	//print(C0.c0_D_is_check_to_king("w"));
	//Is there checkmate to the white king right now? 
	//print(C0.c0_D_is_mate_to_king("w"));
	
	// What a piece on the square g7?
	//print(C0.c0_D_what_at("g7"));
	// Is the square g6 empty? (no piece on it)
	//print(C0.c0_D_is_empty("g6"));

	}

DoPieceMovements();							// All the movements of pieces (constant frames per second for rigidbody x,y,z)...
DoEngineMovements();							// If chess engine should do a move...
MouseMovement();								// Mouse movement events, suggest legal moves...
RollBackAction();									// If a takeback should be performed/ or new game started..


if(FirstStart)
	{
	position2board();					// Set current position on the board visually...
	HideBlankPieces();				// Hide blank-pieces...
	CreateActiveParticles();		// Active particles are just copies, to keep acurate position on screen...
	FirstStart=false;
	}
else
	{
	DragDetect();						// If mouse pressed on any square...
	}
}

function ActivateCamera(first:boolean):void
{
var c1=(GameObject.Find("CameraSide")).GetComponent.<Camera>();
var c2=(GameObject.Find("CameraTop")).GetComponent.<Camera>();

if(first)
	{ 
	c1.enabled=setCamSide;
	c2.enabled=setCamTop;
	}
else
	{
	if((!c2.enabled) && setCamSide) { setCamTop=false; c2.enabled=true; c1.enabled=false; }
	if((!c1.enabled) && setCamTop) { setCamSide=false; c1.enabled=true; c2.enabled=false; }
	}
	
if(!(CamXpre==CameraX))
	{
	GameObject.Find("CameraSide").transform.position.x += 1.5 * (CamXpre-CameraX);
	GameObject.Find("CameraTop").transform.position.x += 0.1 * (CamXpre-CameraX);
	CamXpre=CameraX;
	}
	
if(!(C0.c0_side==CamSidepre))
	{
	CamSidepre=C0.c0_side;
	}
}

function SetLamps(first:boolean):void
{
	var l1=(GameObject.Find("Light1")).GetComponent.<Light>();
	var l2=(GameObject.Find("Light2")).GetComponent.<Light>();
	if(first)
		{
		l1.intensity=0.738;			// Otherwise scene editing is unpleasant...
		}
	else
		{
		var n_l1=l1.enabled;
		var n_l2=l2.enabled;
		if(lightsValue==0) { n_l1=true; n_l2=false; }
		if(lightsValue==1) { n_l1=false; n_l2=true; }
		if(lightsValue==2) { n_l1=true; n_l2=true;  }
		if(!(l1.enabled==n_l1)) l1.enabled=n_l1;
		if(!(l2.enabled==n_l2)) l2.enabled=n_l2;
				// adjust lights intensity a bit on too much light set...
		if((lightsValue>1) && (l1.intensity>0.6)) l1.intensity*=0.5;
		if((lightsValue<2) && (l1.intensity<0.6)) l1.intensity*=2;
		}
}

function Revert_at(ats:String):String
{
var horiz=System.Convert.ToChar( System.Convert.ToInt32("a"[0]) + (System.Convert.ToInt32("h"[0]) - System.Convert.ToInt32(ats[0])) );
var vert=(9 - System.Convert.ToInt32( ats.Substring(1,1) ) ).ToString();
return horiz+vert;
}

function MouseMovement():void
{
var pObj = GameObject.Find("MoveParticle_active");
if((!drawAnim) || (drag1_at.length==0) || C0.c0_moving || ((mouse_at.length>0) && (!(drag1_at==mouse_at))))
	{
	if(!(pObj==null)) pObj.GetComponent.<Renderer>().enabled=false;
	mouse_at="";
	}

if((drag1_at.length>0) && (!C0.c0_moving))
{
	// We need to actually hit an object
    var hit : RaycastHit;

    // Debug.DrawRay(Camera.main.transform.position, cam);

	if(Physics.Raycast( Camera.main.ScreenPointToRay(Input.mousePosition),  hit, 1000)  && (!(hit.rigidbody==null)))
	{
		var at="";
		for(var h=0;h<8;h++)
		 for(var v=8;v>0;v--)
		{
		var id="plane_"+System.Convert.ToChar(System.Convert.ToInt32("a"[0])+h)+v.ToString();		// Is this square mouse is over?
		var qObj=GameObject.Find(id);
		if((!(qObj==null)) && (qObj.transform.position==hit.rigidbody.position)) at=id.Substring(6,2);
		}	

		if(at.length>0) 
		{
		if(C0.c0_side<0) at=Revert_at(at);

		if((mouse_at.length==0) || (!(at==mouse_at)))
			{
			if(C0.c0_D_can_be_moved(drag1_at,at))
				{
				mouse_at=at;
																		// Particle on legal movement...
				pObj.transform.position = PiecePosition("MoveParticle",at);
				if(drawAnim) pObj.GetComponent.<Renderer>().enabled=true;
				}
			}
		}

		}
	}
}


function DragDetect():void
{
	// Make sure the user pressed the mouse down
	if (!Input.GetMouseButtonDown (0)) return;

	// We need to actually hit an object
	var hit : RaycastHit;
	if (Physics.Raycast( Camera.main.ScreenPointToRay(Input.mousePosition),  hit, 1000) && (!(hit.rigidbody==null)))
		{
		if(!C0.c0_moving)		// If no piece is moving right now... (this animation algorithm is not good for the blitz-playing)
		{
		if(C0.c0_waitmove)			// If waiting for action only...
		{
		var at="";
		for(var h=0;h<8;h++)
		 for(var v=8;v>0;v--)
		{
		var id="plane_"+System.Convert.ToChar(System.Convert.ToInt32("a"[0])+h)+v.ToString();		// Is this square dragged?
		var qObj=GameObject.Find(id);
		if((!(qObj==null)) && (qObj.transform.position==hit.rigidbody.position)) at=id.Substring(6,2);
		}	

		if(at.length>0)
				{
				if(C0.c0_side<0) at=Revert_at(at);
				if(drag1_at.length>0)
						{
						var q2Obj=GameObject.Find("plane_"+((C0.c0_side<0)?Revert_at(drag1_at):drag1_at) );
						if(!(q2Obj==null)) q2Obj.GetComponent.<Renderer>().enabled=false;
						}
				
				var gObj = GameObject.Find("DragParticle_active");
				if((!drawAnim) || (drag1_at.length>0))  gObj.GetComponent.<Renderer>().enabled=false;
				
				var piecedrag=C0.c0_D_what_at(at);
				if((piecedrag.length>0 && piecedrag.Substring(0,1)==((C0.c0_side>0)?"w":"b")))
					{
					if(drag1_animator==0)			// If the previous animation is over...
						{
						drag1_at=at;
						if(drawAnim) 
							{
							drag1_animator= GetTimeDelta(10,3);		// 3-seconds for animation...
							
															// Particle on drag....
							gObj.transform.position = PiecePosition("DragParticle",at);
							gObj.GetComponent.<Renderer>().enabled=true;
							}
						else 
							{
							var q3Obj=GameObject.Find("plane_"+((C0.c0_side<0)?Revert_at(drag1_at):drag1_at) );
							if(!(q3Obj==null)) q3Obj.GetComponent.<Renderer>().enabled=true;
							}
						}
					}
				else
					{
					var Piece2promote="Q";
					if(toPromote==1) Piece2promote="R";
					else if(toPromote==2) Piece2promote="B";
					else if(toPromote==3) Piece2promote="N";
					
					C0.c0_become_from_engine=Piece2promote;
					
					if((drag1_at.length>0) && C0.c0_D_can_be_moved(drag1_at,at))
						{
						if(playTcp)
							{
							(GameObject.Find("Script4")).SendMessage("Movement",
								drag1_at + "-" + at + ((Piece2promote=="Q") ? "" : "="+Piece2promote));
							}
						C0.c0_move_to(drag1_at,at);
						C0.c0_sidemoves=-C0.c0_sidemoves;
						}
					}
				}
		}
		}
		}
}

function PlanesOnBoard():void
{
var toObj: GameObject;
var a8Obj = GameObject.Find("plane_a8");
var h1Obj = GameObject.Find("plane_h1");
var dx=(h1Obj.transform.position.x-a8Obj.transform.position.x)/7;
var dy=(h1Obj.transform.position.y-a8Obj.transform.position.y)/7;
var dz=(h1Obj.transform.position.z-a8Obj.transform.position.z)/7;

for(var h=0;h<8;h++)
 for(var v=8;v>0;v--)
 {
  var id="plane_"+System.Convert.ToChar(System.Convert.ToInt32("a"[0])+h)+v.ToString();
  if((!(id=="plane_a8"))&&(!(id=="plane_h1"))) 
	{
	toObj=Instantiate(a8Obj, a8Obj.transform.position+ Vector3(dx*h,dy*(Mathf.Sqrt(Mathf.Pow(h,2)+Mathf.Pow((8-v),2))),
			dz*(8-v)),  a8Obj.transform.rotation); 
    toObj.name=id;
	}
 }
}

function TransformVisualAllToH1():void
{
//Initial position:  Qd1, Ke1, Bf1, Ng1, Rh1, ph2, oponent'sNg3...
// Coord-s should be adjusted according to piece type... the problem is that can't move piece to one x,y,z - looks different 
TransformVisualPieceToH1("bishop","f1");
TransformVisualPieceToH1("queen","d1");
TransformVisualPieceToH1("king","e1");
TransformVisualPieceToH1("knight","g1");
TransformVisualPieceToH1("oponents_knight","g3");
TransformVisualPieceToH1("pawn","h2");

TransformVisualPieceToH1("DragParticle","e1");
TransformVisualPieceToH1("MoveParticle","c3");
}

function TransformVisualPieceToH1(piecetype,piece_from):void
{
// Blender complect of pieces is good way to create models and put to Unity3D, just copy to assets folder,
var Obj = GameObject.Find( ((piecetype.IndexOf("Particle")>=0) ? piecetype :  "chessboard_min2/"+piecetype) );
var a8Obj = GameObject.Find("black_rook_scaled_a8");
var h1Obj = GameObject.Find("white_rook_scaled_h1");
var dx=(h1Obj.transform.position.x-a8Obj.transform.position.x)/7;
var dy=(h1Obj.transform.position.y-a8Obj.transform.position.y)/7;
var dz=(h1Obj.transform.position.z-a8Obj.transform.position.z)/7;

var h=System.Convert.ToInt32(piece_from[0])-System.Convert.ToInt32("a"[0]);
var v=System.Convert.ToInt32(piece_from.Substring(1,1));

Obj.transform.position +=Vector3(dx*(7-h),dy*(Mathf.Sqrt(Mathf.Pow((7-h),2)+Mathf.Pow((v-1),2))),dz*(v-1));
}

function HideBlankPieces():void
{
GameObject.Find("black_rook_scaled_a8").GetComponent.<Renderer>().enabled = false;
GameObject.Find("white_rook_scaled_h1").GetComponent.<Renderer>().enabled=false;
GameObject.Find("chessboard_min2/pawn").GetComponent.<Renderer>().enabled=false;
GameObject.Find("chessboard_min2/knight").GetComponent.<Renderer>().enabled=false;
GameObject.Find("chessboard_min2/oponents_knight").GetComponent.<Renderer>().enabled=false;
GameObject.Find("chessboard_min2/bishop").GetComponent.<Renderer>().enabled=false;
GameObject.Find("chessboard_min2/rook").GetComponent.<Renderer>().enabled=false;
GameObject.Find("chessboard_min2/queen").GetComponent.<Renderer>().enabled=false;
GameObject.Find("chessboard_min2/king").GetComponent.<Renderer>().enabled=false;

GameObject.Find("MoveParticle").GetComponent.<Renderer>().enabled=false;
GameObject.Find("DragParticle").GetComponent.<Renderer>().enabled=false;
}

function CreateActiveParticles():void
{
var p1Obj = GameObject.Find("MoveParticle");
var p2Obj = GameObject.Find("DragParticle");

toObj1=Instantiate(p1Obj, p1Obj.transform.position, p1Obj.transform.rotation); 
toObj1.name="MoveParticle_active";
toObj2=Instantiate(p2Obj, p2Obj.transform.position, p2Obj.transform.rotation); 
toObj2.name="DragParticle_active";
}

function CreatePiece(piece_color:String,piecetype:String,piece_at:String):void
{
var toObj : GameObject;
var fromObj = GameObject.Find("chessboard_min2/"+piecetype);
var piece_position= PiecePosition(piecetype,piece_at);

toObj=Instantiate(fromObj, piece_position, fromObj.transform.rotation );
toObj.name="piece_"+piece_at;
toObj.GetComponent.<Renderer>().material=(GameObject.Find( ((piece_color=="b") ? "black_rook_scaled_a8" : "white_rook_scaled_h1"  ))).GetComponent.<Renderer>().material;

toObj.GetComponent.<Renderer>().enabled=true;
}

function PiecePosition(piecetype:String,piece_at:String):Vector3
{
var a8Obj = GameObject.Find("black_rook_scaled_a8");
var h1Obj = GameObject.Find("white_rook_scaled_h1");
var dx=(h1Obj.transform.position.x-a8Obj.transform.position.x)/7;
var dy=(h1Obj.transform.position.y-a8Obj.transform.position.y)/7;
var dz=(h1Obj.transform.position.z-a8Obj.transform.position.z)/7;

var drx=-(h1Obj.transform.rotation.x-a8Obj.transform.rotation.x)/7;
var dry=-(h1Obj.transform.rotation.y-a8Obj.transform.rotation.y)/7;
var drz=-(h1Obj.transform.rotation.z-a8Obj.transform.rotation.z)/7;

var fromObj = GameObject.Find( ((piecetype.IndexOf("Particle")>=0) ? piecetype :  "chessboard_min2/"+piecetype) );

var h=System.Convert.ToInt32(piece_at[0])-System.Convert.ToInt32("a"[0]);
var v=System.Convert.ToInt32(piece_at.Substring(1,1));
if(C0.c0_side<0)			// Could also work with cameras, anyway this also isn't a bad solution... (Swap board if black)
	{
	h=7-h;
	v=9-v;
	}
	
// Very according to camera placement...
//  The thing is that 2D board 8x8 calculation can't be measured with 3D vectors in a simple way. So, constants were used for existing models...
var h1=(7-h)*0.96;
var v1=(v-1)*1.04;

return (fromObj.transform.position+ Vector3(-dx*h1,-dy*0.6*(Mathf.Sqrt(Mathf.Pow(h1,2)+Mathf.Pow(v1,2))),-dz*v1));
}

function position2board():void
{
var c0_Zposition=C0.c0_position;
for(var c0_i=0;c0_Zposition.length>c0_i; c0_i+=5)
	{
	var c0_Zcolor=c0_Zposition.Substring(c0_i,1);
	var c0_Zfigure=c0_Zposition.Substring(c0_i+1,1);
	var c0_Z_at = c0_Zposition.Substring(c0_i+2,2);
	CreatePiece(c0_Zcolor,piecelongtype(c0_Zfigure,c0_Zcolor),c0_Z_at);
	}
}

function piecelongtype(figure1:String,color1:String):String
{
var ret="";
if(figure1=="p") ret="pawn";
else if(figure1=="N") ret=(((color1=="w") && (C0.c0_side>0)) || ((color1=="b") && (C0.c0_side<0))  ? "knight":"oponents_knight");
else if(figure1=="B") ret="bishop";
else if(figure1=="R") ret="rook";
else if(figure1=="Q") ret="queen";
else if(figure1=="K") ret="king";
return ret;
}

function DoPieceMovements():void
{
	if(drag1_animator>0)
		{
		GameObject.Find("piece_"+drag1_at).transform.position.y-=(5.5-drag1_animator)*0.06;
		drag1_animator--;
		}
	if(C0.c0_moves2do.length>0)
		{
		if(move_animator>0)
			{
			var move_from=C0.c0_moves2do.Substring(0,2);
			var move_to=C0.c0_moves2do.Substring(2,2);
			var bc=(((C0.c0_moves2do.length>4) && (C0.c0_moves2do.Substring(4,1)=="[")) ? C0.c0_moves2do.Substring(5,1) : " ");

			var mObj:GameObject;
			mObj=GameObject.Find("piece_"+move_from);
			
			var pieceat=((("QRBN").IndexOf(bc)>=0) ? "p" : (C0.c0_D_what_at(move_to)).Substring(1,1));
			var piececolor=(C0.c0_D_what_at(move_to)).Substring(0,1);
			var piecetype=piecelongtype(pieceat,piececolor);

			var mfrom=PiecePosition(piecetype,move_from);
			var mto=PiecePosition(piecetype,move_to);
						// piece moves constantly towards the square...
			mObj.transform.position =  mfrom + ((mto - mfrom)/10 * (11-move_animator));
						// a little jump for knight and castling rook...
			if((piecetype.IndexOf("knight")>=0)  || ((bc=="0") && (piecetype=="rook")))
						mObj.transform.position.y+=(move_animator-(5-(move_animator>5?5:move_animator))+3)*0.2;
	
			move_animator--;
			if((!drawAnim) || (move_animator==3))		// If a piece was captured and moving near...
				{
				var dObj:GameObject;
				dObj=GameObject.Find("piece_"+ move_to);
				if(dObj==null)
					{
					if((piecetype=="pawn") && (!(move_from.Substring(0,1)==move_to.Substring(0,1))))	// en-passant...
						{
						dObj=GameObject.Find("piece_"+ move_to.Substring(0,1)+move_from.Substring(1,1));
						if(!(dObj==null)) Destroy (dObj);
						}
					}
				else Destroy (dObj);
				}

			if(move_animator==0)
				{
				mObj.name="piece_"+move_to;

					// If a pawn becomes a better piece...
				if(("QRBN").IndexOf(bc)>=0)
					{
					Destroy (mObj);
					CreatePiece(piececolor,piecelongtype(bc,piececolor),move_to); 		// promotion...
					}
				C0.c0_moves2do=(C0.c0_moves2do).Substring( ((bc==" ")? 4 : 7) );

				if(C0.c0_moves2do.length==0) C0.c0_moving=false;
				}
			}
		else
			{
			move_animator=(drawAnim ? GetTimeDelta(10,4): 1);					// 4 seconds animation anyway...
			drag1_animator=0;
			}
		}
}

// this routine starts chess engine if needed...
function DoEngineMovements():void
{
    C0.c0_waitmove=(C0.c0_sidemoves==C0.c0_side);

    /*if(!gameover && engineStatus == 0 && move_animator < 4) 
    {
        gameover = true;
        message2show = "Check+";
        message2show = "Checkmate! 0:1";
    }*/
    
if((!gameover) && (engineStatus==0) && (move_animator<4))
{
	if(C0.c0_D_is_check_to_king("w") || C0.c0_D_is_check_to_king("b"))
		{
		message2show = "Check+";
		if( C0.c0_D_is_mate_to_king("w") ) { message2show = "Checkmate! 0:1"; gameover=true; }
		if( C0.c0_D_is_mate_to_king("b") ) { message2show = "Checkmate! 1:0"; gameover=true; }
		}
	else
		{
		if(((C0.c0_sidemoves>0) && C0.c0_D_is_pate_to_king("w")) || ((C0.c0_sidemoves<0) && C0.c0_D_is_pate_to_king("b")))
			{ message2show = "Stalemate, draw 1/2-1/2"; gameover=true; }
		}
}

if((!gameover) && (C0.c0_moves2do.length==0) && (engineStatus==0))
	{
	if(C0.c0_waitmove) message2show="Your move..."; 
	else if(!(C0.c0_sidemoves==C0.c0_side))
		{
		if(statusTcp==21)
			{
			message2show="Oponent's move";
			}
		else
			{
			message2show="Calculating...";
			engineStatus=1;
			}
		}
	}
if(engineStatus==2)
	{
	// Request to other components can be sent via slow SendMessage function., Here it's good, not often.
	if(usejsJester)
		{
		(GameObject.Find("Script7")).SendMessage("SetDeepLevel",chess_strength.ToString());
		(GameObject.Find("Script7")).SendMessage("SetMovesList",C0.c0_moveslist);
		}
	else if(useCrafty)
		{
		(GameObject.Find("Script3")).SendMessage("SetDeepLevel",chess_strength.ToString());
		(GameObject.Find("Script3")).SendMessage("SetRequestFEN",C0.c0_get_FEN());
		}
	else if(useRybka)
		{
		(GameObject.Find("Script5")).SendMessage("SetDeepLevel",chess_strength.ToString());
		(GameObject.Find("Script5")).SendMessage("SetRequestFEN",C0.c0_get_FEN());
		}
	else if(useStockfish)
		{
		(GameObject.Find("Script6")).SendMessage("SetDeepLevel",chess_strength.ToString());
		(GameObject.Find("Script6")).SendMessage("SetRequestFEN",C0.c0_get_FEN());
		}
	else
		{
		(GameObject.Find("Script1")).SendMessage("JSSetDeep",chess_strength.ToString());
		(GameObject.Find("Script1")).SendMessage("JSRequest",C0.c0_get_FEN());
		}
	engineStatus=3;
	}
}

	// this call receives answer from the chess engine... (from other object)
function EngineAnswer(answer:String):void
{
var move="";
if(answer.length>0)
	{
	if((answer.length>6) && (answer.Substring(0,7)=="Jester:"))
		{
		move=answer.Substring(8,4);
		C0.c0_become_from_engine = ((answer.length<13)?"Q":(answer.Substring(13,1)).ToUpper());
		if(move.length>0)
			{
			message2show = answer.Substring(0,10)+"-"+answer.Substring(10);
			C0.c0_move_to(move.Substring(0,2),move.Substring(2,2));
			C0.c0_sidemoves=-C0.c0_sidemoves;
			}
		}
	else if((answer.length>6) && (answer.Substring(0,7)=="Crafty:"))
		{
		move=C0.c0_from_Crafty_standard(answer.Substring(8),(C0.c0_sidemoves>0?"w":"b"));
		if(move.length>0)
			{
			C0.c0_become_from_engine = ((move.length>4)?move.Substring(5,1):"Q");
			message2show = answer;
			C0.c0_move_to(move.Substring(0,2),move.Substring(2,2));
			C0.c0_sidemoves=-C0.c0_sidemoves;
			}
		}
	else if((answer.length>5) && (answer.Substring(0,6)=="Rybka:"))
		{
		move=answer.Substring(7,4);
		C0.c0_become_from_engine = ((answer.length<12)?"Q":(answer.Substring(11,1)).ToUpper());
		if(move.length>0)
			{
			message2show = answer.Substring(0,9)+"-"+answer.Substring(9);
			C0.c0_move_to(move.Substring(0,2),move.Substring(2,2));
			C0.c0_sidemoves=-C0.c0_sidemoves;
			}
		}
	else if((answer.length>9) && (answer.Substring(0,10)=="Stockfish:"))
		{
		move=answer.Substring(11,4);
		C0.c0_become_from_engine = ((answer.length<16)?"Q":(answer.Substring(15,1)).ToUpper());
		if(move.length>0)
			{
			message2show = answer.Substring(0,13)+"-"+answer.Substring(13);
			C0.c0_move_to(move.Substring(0,2),move.Substring(2,2));
			C0.c0_sidemoves=-C0.c0_sidemoves;
			}
		}
	else
		{
		C0.c0_become_from_engine = ((answer.length>5)?answer.Substring(6,1):"Q");
		if(C0.c0_D_can_be_moved(answer.Substring(0,2),answer.Substring(3,2)))
			{
			message2show="My move is " + answer;
			C0.c0_move_to(answer.Substring(0,2),answer.Substring(3,2));
			C0.c0_sidemoves=-C0.c0_sidemoves;
			}
		}
	}
engineStatus=0;
}


// Takeback and new game starting is like RollBack - one/all moves.
function RollBackAction():void
{
if((TakeBackFlag || NewGameFlag) && (!C0.c0_moving) && (C0.c0_moves2do.length==0) &&
			((C0.c0_sidemoves==C0.c0_side) || gameover) &&  (drag1_animator==0) && (move_animator==0))
	{
	if(gameover) gameover=false;
	
	for(var h=0;h<8;h++)
		for(var v=8;v>0;v--)
		{
		var id="piece_"+System.Convert.ToChar(System.Convert.ToInt32("a"[0])+h)+v.ToString();		// Is this square mouse is over?
		var qObj=GameObject.Find(id);
		if(!(qObj==null)) Destroy(qObj);
		}	
	if(TakeBackFlag)
		{
		C0.c0_take_back();
		if(!(C0.c0_sidemoves==C0.c0_side)) C0.c0_take_back();
		TakeBackFlag=false;
		}
	if(NewGameFlag)
		{
		C0.c0_set_start_position("");
		C0.c0_sidemoves=1;
		C0.c0_waitmove=false;
		C0.c0_side=-C0.c0_side;
		C0.c0_waitmove=(C0.c0_side==C0.c0_sidemoves);
		NewGameFlag=false;
		}	
	
	position2board();					// Set current position on the board visually...
	}
}

function GetTimeDelta(min_interval:int, secs:int):int		// To slow animation on fastest CPU
{
var dt= ((Time.deltaTime*min_interval)/secs).ToString();		// 3-seconds to move...
var pt=dt.IndexOf("."); if(pt<0) pt=dt.IndexOf(".");
var dt_int= System.Convert.ToInt32( ((pt<0)? dt : dt.Substring(0,pt)) );
return Mathf.Max(min_interval,dt_int);
}

function jsJesterAccess(status:String):void
{
 jsJesterAccessible=(status=="YES");
 if(!jsJesterAccessible)
	{
	usejsJester=false;
	if(engineStatus>0)
		{ 
		engineStatus=0;			// actually pass to the next chess engine...
		message2show = "jsJestercall error"; 
		}
	}
}

function CraftyAccess(status:String):void
{
 CraftyAccessible=(status=="YES");
 if(!CraftyAccessible)
	{
	useCrafty=false;
	if(engineStatus>0)
		{ 
		engineStatus=0;			// actually pass to the next chess engine...
		message2show = "Craftycall error"; 
		}
	}
}

function RybkaAccess(status:String):void
{
 RybkaAccessible=(status=="YES");
 if(!RybkaAccessible)
	{
	useRybka=false;
	if(engineStatus>0)
		{ 
		engineStatus=0;			// actually pass to the next chess engine...
		message2show = "Rybkacall error"; 
		}
	}
}

function StockfishAccess(status:String):void
{
 StockfishAccessible=(status=="YES");
 if(!StockfishAccessible)
	{
	useStockfish=false;
	if(engineStatus>0)
		{ 
		engineStatus=0;			// actually pass to the next chess engine...
		message2show = "Stockfishcall error"; 
		}
	}
}
// TCP connection related functions...
//
function TcpAccess(status:String):void
{
 TcpAccessible=(status=="YES");
 if(!TcpAccessible) { PlayTcp=false; TcpMessage=""; }
}
		// to send message from other object...
function TcpAddMessage(mess:String):void
{
					// If a game is active then show a small GUI window of TCP connection (let the chess board be main)
	
 if((mess.Length>=4) && (mess.Substring(0,4)=="<12>"))		// style 12 not used, but user can set it ....
		{
		var a1=mess.IndexOf(")");
		if( (a1>=0) &&  (!(C0.c0_sidemoves==C0.c0_side)))
			{
			// Initiate move by oponent if information is provided...
			var move_given=mess.Substring(a1+2);
			move_given=move_given.Substring(0,move_given.IndexOf(" "));
			move_given=move_given.Replace(" ","");
			var move=C0.c0_from_Crafty_standard(move_given,(C0.c0_sidemoves>0?"w":"b"));
			if(move.length>0)
				{
				C0.c0_become_from_engine = ((move.length>4)?move.Substring(5,1):"Q");
				message2show = "Op.Move: "+move;
				C0.c0_move_to(move.Substring(0,2),move.Substring(2,2));
				C0.c0_sidemoves=-C0.c0_sidemoves;
				}
			}	
		TcpMessage +=mess;
		
		if(TcpTakeBackWas)			// It's better not to use this routine, anyway is possible...
		{
													// fics provided current FEN of position... (No castling indicators, just postition for extremal setup)...
		var fFEN=mess.Substring(5,71);
		fFEN=convertFENnormal(fFEN);
		if(!(fFEN==(C0.c0_get_FEN()).Substring(0,fFEN.Length)))		// if position is wrong obviously...
			{
			// This sets position on board...(not quite correctly, anyway is possible)
			C0.c0_start_FEN=fFEN+" " +(mess.Substring(78,1)=="W" ? "w":"b") + " QKqk";
			C0.c0_moveslist="";

			C0.c0_side=-C0.c0_side;	// will swap the board...
			NewGameFlag=true;			// starts new game+sets postion...
			gameover=true;
			}
		}
			
		}
		
 if((statusTcp==20) || (statusTcp==21))		// If a game is active then show a small GUI window of TCP connection (let the chess board be main)
	{
	if(!TcpNextGame)			// Show options to start new or exit chess server...
	{
	mess=mess.Replace("'","");
	if((mess.Length>5) && (mess.Substring(0,5)=="Game "))
		{
		a1=mess.IndexOf("(");
		if(a1>=0) TcpMessage="\n"+mess.Substring(0,a1)+"\n"+mess.Substring(a1);
		else TcpMessage=mess;
		}
	else
		{
		if(mess.IndexOf("has lost")>=0) gameover=true;			// Lost connections...
		if(mess.IndexOf("}")>=0)
			{
			mess=mess.Substring(mess.IndexOf("}")+1);
			if((mess.IndexOf("1-0")>=0) || (mess.IndexOf("0-1")>=0)  || (mess.IndexOf("1/2")>=0) || (mess.IndexOf("*")>=0))
				{
				gameover=true;
				}
			}
		if(gameover && (!NewGameFlag)) TcpNextGame=true;
		
		var addmess=	 ((mess.IndexOf("|")<0)?  mess : mess.Substring(mess.LastIndexOf("|")+1));		
		
		if(addmess.Replace(" ","")=="\n") addmess="";
		if((addmess.IndexOf("h   g   f   e")>=0) || (addmess.IndexOf("e   f   g   h")>=0)) addmess="";
		
		addmess=TcpFormatizeToWidth(addmess,36);	// visual word wraps...
		
		TcpMessage +=addmess;
		
		a1=mess.IndexOf( ((C0.c0_side>0) ? "Black" : "White" ) + " Moves :" );
		if( (a1>=0) &&  (!(C0.c0_sidemoves==C0.c0_side)))
			{
			// Initiate move by oponent if information is provided...
			move_given=mess.Substring(a1+13);
			move_given=move_given.Substring(0,move_given.IndexOf("("));
			move_given=move_given.Replace(" ","");
			move=C0.c0_from_Crafty_standard(move_given,(C0.c0_sidemoves>0?"w":"b"));
			if(move.length>0)
				{
				C0.c0_become_from_engine = ((move.length>4)?move.Substring(5,1):"Q");
				message2show = "Op.Move: "+move;
				C0.c0_move_to(move.Substring(0,2),move.Substring(2,2));
				C0.c0_sidemoves=-C0.c0_sidemoves;
				}
			}

		a1=mess.IndexOf("Move # :");
		if(a1>=0)
			{
			var MoveNrStr=mess.Substring(a1+8);
			a1=MoveNrStr.IndexOf("(");
			var MoveColor=MoveNrStr.Substring(a1+1,5);
			MoveNrStr=MoveNrStr.Substring(0,a1);
			var MoveNr=System.Convert.ToInt32(MoveNrStr);
			if( (MoveNr<TcpPreMNr) || ((MoveNr==TcpPreMNr) && (MoveColor=="White") && (TcpPreMCol=="Black") ) )
				{
				if(TcpTakeBackWas)			// It's better not to use this routine, anyway is possible...
					{
					//Ups, takebacks were or something went wrong...
					TcpCmd="set style 12"+"\n";			// this at least will set up board...
					}
				}
			TcpPreMNr=MoveNr; TcpPreMCol=MoveColor;
			}
		}
	}
	}
else
	{
	 if(TcpMessage.Length>4000)			// cut some if too long...
		{
		TcpMessage=TcpMessage.Substring(3000);
		TcpMessage=TcpMessage.Substring(TcpMessage.IndexOf("\n"));
		}
	 TcpMessage+=mess;
	}
}

//Converts fics notation fen to normal fen... (just pieces, no castlings. fics notation is quite differrent)
function convertFENnormal( ficsFEN )
{
	ficsFEN=ficsFEN.Replace(" ","/");
	for(var q=8; q>0; q--)
		{
		var s=""; for(var w=1; w<=q; w++) s+="-";
		ficsFEN=ficsFEN.Replace(s,q.ToString());
		}
	return ficsFEN;
}
		// Our color of pieces...
function TcpOurColor(piece_color:String):void
{
TcpTakeBackWas=false; TcpPreMNr=0; TcpPreMCol="Black";
C0.c0_side=( (piece_color=="black") ? 1 : -1);
NewGameFlag=true;		// will swap the board...
gameover=true;
}

		// to set current TCP status from other object...
function TcpStatus(cur_status:String):void
{
 var pre_status=statusTcp;
 statusTcp=System.Convert.ToInt32(cur_status);
 if((statusTcp>=20) && (pre_status<20))
		{
		var at1=TcpMessage.LastIndexOf("Game ");
		TcpMessage="\n"+ ( (at1<0) ? "Starting game!"+"\n" : TcpMessage.Substring(at1) );
		var at2=TcpMessage.IndexOf(")");
		if(at2>=0) TcpMessage=TcpMessage.Substring(0,at2+1);
		a1=TcpMessage.IndexOf("(");
		if(a1>=0) TcpMessage=TcpMessage.Substring(0,a1)+"\n"+TcpMessage.Substring(a1);
		}
}
		// actions on frames-per-second...
function LookTcp():void
{
if(TcpResign)
	{
	(GameObject.Find("Script4")).SendMessage("SendLinesOUT","resign");
	TcpResign=false;
	}
if(TcpDraw)
	{
	(GameObject.Find("Script4")).SendMessage("SendLinesOUT","draw");
	TcpDraw=false;
	}
if(TcpAccessible && playTcp)
	{
	if(statusTcp==0)
		{
		// Start TCP...
		(GameObject.Find("Script4")).SendMessage("ConnectServer","");

		drawAnim=false;	// anyway too slow...
		}
	}
TcpCmdOnSend();	// send command if there is...
}

function TcpNextGameStarter()
	{
	TcpNextGame=false;
	gameover=false;
	C0.c0_start_FEN="";		// in case takebacks were..
	(GameObject.Find("Script4")).SendMessage("StartNextGame","");
	}

// Just for visal representation of messages...
function TcpFormatizeToWidth(str:String,wlen:int):String
{
var str2="";

if(str.length>0)
{
var str1=str.Replace("\n"," ");
str1=str1.Replace("  "," ");

for(; str1.length>0; )
	{
	if((str1.length>wlen) || (str1.LastIndexOf(" ")>=0))		// if can divide...
		{
		var str3=str1.Substring(0,Mathf.Min(wlen,str1.length));
		var at2=str3.LastIndexOf(" ");
		if(at2<0) at2=str1.LastIndexOf(" ");

		str2+=str1.Substring(0,at2)+"\n";			// divide by replacing " " with cr-ret
		str1=str1.Substring(at2+1);
		}
	else
		{
		str2+=str1;			//  just add remaining
		str1="";
		}
	}
if((str2.length>0) && (!(str2.Substring(str2.length-1,1)=="\n"))) str2+="\n";
}
return str2;
}
									
function TcpCmdOnSend():void
{
 if(TcpCmd.IndexOf("\n")>=0)
	{
	TcpCmd=TcpCmd.Replace("\n","");
	if(!TcpTakeBackWas) TcpTakeBackWas=((TcpCmd.ToUpper()).IndexOf("TAKEBACK")>=0);		// attention, the position may change...
	if((TcpCmd.Replace(" ","")).length>0)						// Send command...
		{
		(GameObject.Find("Script4")).SendMessage("SendLinesOUT", "CMD: "+TcpCmd); TcpCmd="";
		}
	}
}

// On monobehaviour ends, this is called....
function OnApplicationQuit():void { }