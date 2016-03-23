import System;
import c0_4unity_chess;

/**
 * Main script
 * Member variables declarations
 */

// Main camera
public var mainCamera : Camera;

// Member scripts
private var vrMenuController : VRMenuController;
private var lightController : LightController;
private var scriptManager : ScriptManager;
private var flagManager : FlagManager;
private var constant : Constant;

var toPromote=0;						// Promotion option (0-Q,1-R,2-B,3-N)...
var drag1_at="";								// square with a piece dragged after the first drag...
var drag1_animator:int=0;						// On drag start animation -counter
var move_animator:int=0;					// Animation counter when a piece is moving...
var mouse_at="";							// Keeps last mouse square at... (just for legal moves suggestion by using particle)
var message2show="";						// Message to show on GUI
var engineStatus=0;
var gameover=false;						// is true when the game is over...
var chess_strength=3;						// Set strength of chess engine...
public var C0:c0_4unity_chess = new c0_4unity_chess();

/**
 * Initialize script objects
 */
function Awake()
{
	vrMenuController = GetComponent(VRMenuController);
	lightController = GetComponent(LightController);
	scriptManager = GetComponent(ScriptManager);
	flagManager = GetComponent(FlagManager);
	constant = GetComponent(Constant);
}

/**
 * Initialize attributes
 */
function Start ()
{	
	// Set the light intensity
	lightController.EnableLight();
	lightController.SetLightIntensity(constant.LAMP_INTENSITY);
	
	CreateChessboard();
	InitiAllPiecesStartPosition();

	C0.c0_side = 1;						// This side is white.   For black set -1
	C0.c0_waitmove = true;				// Waiting for mouse drag...
	C0.c0_set_start_position("");		// Set the initial position...
	
	position2board();					// Set current position on the board visually...
	HideBlankPieces();				    // Hide blank-pieces...
	CreateActiveParticles();		    // Active particles are just copies, to keep acurate position on screen...
	FirstStart=false;	
}

/**
 * Called once per Frame
 * TODO
 */
function Update ()
{
	DoPieceMovements();			// All the movements of pieces (constant frames per second for rigidbody x,y,z)...
	DoEngineMovements();		// If chess engine should do a move...
	MouseMovement();			// Mouse movement events, suggest legal moves...
	RollBackAction();			// If a takeback should be performed/ or new game started..
	DragDetect();				// If mouse pressed on any square...
	
	if(engineStatus == 1) 
	{
		engineStatus = 2; 
	}
}

/**
 * Create the chessboard (8x8) from
 * two respective planes (black and white)
 *
 * @return void
 */
function CreateChessboard() : void
{
	var chessboardCase : GameObject;
	var planeA8 = GameObject.Find(constant.PLANE_A8);
	var planeH1 = GameObject.Find(constant.PLANE_H1);
	
	var dx = (planeH1.transform.position.x - planeA8.transform.position.x) / 7;
	var dy = (planeH1.transform.position.y - planeA8.transform.position.y) / 7;
	var dz = (planeH1.transform.position.z - planeA8.transform.position.z) / 7;
	
	var position : Vector3;
	
	for(var horizontalIndex = 0; horizontalIndex < constant.CASE_NUMBER.x; horizontalIndex++)
	{
		 for(var verticalIndex = constant.CASE_NUMBER.y; verticalIndex > 0; verticalIndex--)
		 {
			var idPiece = constant.PLANE_BASE + System.Convert.ToChar(System.Convert.ToInt32("a"[0]) 
						  + horizontalIndex ) 
						  + verticalIndex.ToString();
			
			if((!(idPiece == constant.PLANE_A8)) && (!(idPiece == constant.PLANE_H1))) 
			{
				position = new Vector3(dx * horizontalIndex,
									   dy * (Mathf.Sqrt(Mathf.Pow(horizontalIndex, 2) + 
									   		 Mathf.Pow(constant.CASE_NUMBER.y - verticalIndex, 2))),
									   dz * (constant.CASE_NUMBER.y - verticalIndex)); 
				
				chessboardCase = Instantiate(planeA8, 
								 planeA8.transform.position + position, 
								 planeA8.transform.rotation);

				chessboardCase.name = idPiece;
			}
		 }
	}
}

/**
 * Place all pieces on the chessboard
 *
 * @return void
 */
function InitiAllPiecesStartPosition() : void
{
	InitPieceStartPosition(constant.BISHOP_NAME, "f1");
	InitPieceStartPosition(constant.QUEEN_NAME,  "d1");
	InitPieceStartPosition(constant.KING_NAME,   "e1");
	InitPieceStartPosition(constant.KNIGHT_NAME, "g1");
	InitPieceStartPosition(constant.PAWN_NAME,   "h2");
	
	InitPieceStartPosition(constant.OP_KNIGHT_NAME, "g3");
	InitPieceStartPosition(constant.DRAG_PARTICLE,  "e1");
	InitPieceStartPosition(constant.MOVE_PARTICLE,  "c3");
}

/**
 * Place the specified piece on the chessboard
 *
 * @param pieceType The type of the piece (i.e queen)
 * @param pieceFrom The case location of the piece (i.e f1)
 * @return void
 */
function InitPieceStartPosition(pieceType : String, pieceFrom : String) : void
{
	// To piece to place on the board
	var currentPiece = GameObject.Find(constant.BOARD_NAME + pieceType);
	
	var a8Obj = GameObject.Find(constant.BLACK_ROOK);
	var h1Obj = GameObject.Find(constant.WHITE_ROOK);
	
	var dx = (h1Obj.transform.position.x - a8Obj.transform.position.x) / 7;
	var dy = (h1Obj.transform.position.y - a8Obj.transform.position.y) / 7;
	var dz = (h1Obj.transform.position.z - a8Obj.transform.position.z) / 7;

	var h = System.Convert.ToInt32(pieceFrom[0]) - System.Convert.ToInt32("a"[0]);
	var v = System.Convert.ToInt32(pieceFrom.Substring(1, 1));
	
	var position = new Vector3(dx * (7 - h),
							   dy * (Mathf.Sqrt(Mathf.Pow((7 - h) ,2) + 
							   		 Mathf.Pow((v - 1) , 2))),
							   dz * (v - 1));

	currentPiece.transform.position += position;
}

/**
 * Hide all blank pieces
 * (pieces use as clone)
 *
 * @return void
 */
function HideBlankPieces() : void
{
	GameObject.Find(constant.BLACK_ROOK).GetComponent.<Renderer>().enabled = false;
	GameObject.Find(constant.WHITE_ROOK).GetComponent.<Renderer>().enabled = false;
	
	GameObject.Find(constant.BOARD_NAME + constant.OP_KNIGHT_NAME).GetComponent(Renderer).enabled = false;
	GameObject.Find(constant.BOARD_NAME + constant.KNIGHT_NAME).GetComponent(Renderer).enabled = false;
	GameObject.Find(constant.BOARD_NAME + constant.BISHOP_NAME).GetComponent(Renderer).enabled = false;
	GameObject.Find(constant.BOARD_NAME + constant.QUEEN_NAME).GetComponent(Renderer).enabled = false;
	GameObject.Find(constant.BOARD_NAME + constant.PAWN_NAME).GetComponent(Renderer).enabled = false;
	GameObject.Find(constant.BOARD_NAME + constant.ROOK_NAME).GetComponent(Renderer).enabled = false;
	GameObject.Find(constant.BOARD_NAME + constant.KING_NAME).GetComponent(Renderer).enabled = false;

	GameObject.Find(constant.MOVE_PARTICLE).GetComponent.<Renderer>().enabled = false;
	GameObject.Find(constant.DRAG_PARTICLE).GetComponent.<Renderer>().enabled = false;
}

/**
 * Create two particle system
 * TODO - Create a particle controller ?
 * 
 * @return void
 */
function CreateActiveParticles() : void
{
	var particleSystem_1 = GameObject.Find(constant.MOVE_PARTICLE);
	var particleSystem_2 = GameObject.Find(constant.DRAG_PARTICLE);

	activeParticles_1 = Instantiate(particleSystem_1, 
		particleSystem_1.transform.position, 
		particleSystem_1.transform.rotation);
		
	activeParticles_2 = Instantiate(particleSystem_2, 
		particleSystem_2.transform.position, 
		particleSystem_2.transform.rotation);
	
	activeParticles_1.name = constant.MOVE_PARTICLE + "_active";
	activeParticles_2.name = constant.DRAG_PARTICLE + "_active";
}

/**
 *
 */
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

/**
 * TODO
 */
function Revert_at(ats:String):String
{
	var horiz=System.Convert.ToChar( System.Convert.ToInt32("a"[0]) + (System.Convert.ToInt32("h"[0]) - System.Convert.ToInt32(ats[0])) );
	var vert=(9 - System.Convert.ToInt32( ats.Substring(1,1) ) ).ToString();
	return horiz+vert;
}

/**
 * TODO
 */
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

/**
 * TODO
 */
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
						
						C0.c0_move_to(drag1_at,at);
						C0.c0_sidemoves=-C0.c0_sidemoves;
						}
					}
				}
		}
		}
		}
}

function CreatePiece(piece_color:String,piecetype:String,piece_at:String):void
{
var toObj : GameObject;
var rotation : Vector3;

var fromObj = GameObject.Find(constant.BOARD_NAME + piecetype);
var piece_position= PiecePosition(piecetype,piece_at);

// if it's a black and a pawn, reverse the rotation
if (piece_color == "b" && piecetype == "pawn") {
	rotation = fromObj.transform.rotation.eulerAngles;
	rotation.y = 180;
} else {
	rotation = fromObj.transform.rotation.eulerAngles;
}

toObj=Instantiate(fromObj, piece_position, Quaternion.Euler(rotation));
toObj.name="piece_"+piece_at;
// Modify the color relative to its color
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

var fromObj = GameObject.Find( ((piecetype.IndexOf("Particle")>=0) ? piecetype :  constant.BOARD_NAME + piecetype) );

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

private function doAttackAnimation(attacker : GameObject, attacked : GameObject) {	
	// Active the preparing animation for the other piece
	var animAttacker : Animator = attacker.GetComponent(Animator);
	var animAttacked : Animator = attacked.GetComponent(Animator);

	if(animAttacked == null || animAttacker == null) {
		Debug.Log("Animator not found");
		Destroy (attacked);
		return;
	}
	
	// store the rotation of the attacker to reset it later
	var currentRotationAttacker : Quaternion = attacker.transform.rotation;
	// each piece look at each other
	attacker.transform.LookAt(attacked.transform.position);
	attacked.transform.LookAt(attacker.transform.position);
	
	// Active the preparing animation for the other piece
	animAttacked.SetBool("IsMoving", false);
	animAttacked.SetBool("IsPreparing", true);
	// Active the preparing animation for the piece attacking
	animAttacker.SetBool("IsMoving", false);
	animAttacker.SetBool("IsPreparing", true);
	// Wait some time before attack
	isWaiting = true;
	yield WaitForSeconds(timeBeforeAttack);
	
	// attack
	animAttacker.SetTrigger("Attack");
	animAttacked.SetTrigger("IsAttacked");
	yield WaitForSeconds(timeBeforeDestroy);
	Destroy (attacked);
	animAttacker.SetBool("IsPreparing", false);
	// Reset the rotation of the attacker
	attacker.transform.rotation = currentRotationAttacker;
	isWaiting = false;
}

public var speed : float = 1.5; // speed of animations
public var distanceOfAttack : float = 0.9; // distance where the piece will attack in px
public var timeBeforeAttack : float = 4; // in seconds
public var timeBeforeDestroy : float = 3; // in seconds
public var drawAnim : Boolean = false; // if animations are activated

private var isAnimating : Boolean = false;
private var isWaiting : boolean = false; // wait some time to humans

function DoPieceMovements(): IEnumerable
{
	var anim : Animator;
	
	// a piece is dragged
	if(drag1_animator>0) {
		GameObject.Find("piece_"+drag1_at).transform.position.y-=(5.5-drag1_animator)*0.06;
		drag1_animator--;
	}
	
	// if there are moves to do
	if(C0.c0_moves2do.length > 0 && !isWaiting) {
		// if there is an animation animating
		if(isAnimating) {
			// locate where is the piece from, and where it goes with chess coordonnates (a2)
			var move_from : String =C0.c0_moves2do.Substring(0,2);
			var move_to : String =C0.c0_moves2do.Substring(2,2);
			var bc : String =(((C0.c0_moves2do.length>4) && (C0.c0_moves2do.Substring(4,1)=="[")) ? C0.c0_moves2do.Substring(5,1) : " ");
			
			// get the piece relative to the from position
			var mObj : GameObject = GameObject.Find("piece_"+move_from);
			
			// launch the run animation on the piece
			anim = mObj.GetComponent(Animator);
			if (anim != null) {
				if (!anim.GetBool("IsMoving"))
					anim.SetBool("IsMoving", true);
			}
			
			
			var pieceat : String = ((("QRBN").IndexOf(bc)>=0) ? "p" : (C0.c0_D_what_at(move_to)).Substring(1,1));
			
			// get the piece color et the piece type
			var piececolor : String = (C0.c0_D_what_at(move_to)).Substring(0,1);
			var piecetype : String = piecelongtype(pieceat,piececolor);

			var mfrom : Vector3 = PiecePosition(piecetype,move_from);
			var mto : Vector3 = PiecePosition(piecetype,move_to);
			
			// The step size is equal to speed times frame time.
			var step : float = speed * Time.deltaTime;
		
			// Move our position a step closer to the target.
			mObj.transform.position = Vector3.MoveTowards(mObj.transform.position, mto, step);
			
			// TODO jump for knight and castling rook
			//if((piecetype.IndexOf("knight")>=0)  || ((bc=="0") && (piecetype=="rook")))
				//mObj.transform.position.y+=(move_animator-(5-(move_animator>5?5:move_animator))+3)*0.2;
			
			// If a piece was captured and moving near
			if((Vector3.Distance(mObj.transform.position, mto) <= distanceOfAttack))	{
				var dObj : GameObject = GameObject.Find("piece_"+ move_to);
				if(dObj == null) { // we just move near
					if((piecetype=="pawn") && (!(move_from.Substring(0,1)==move_to.Substring(0,1)))) {
						dObj = GameObject.Find("piece_"+ move_to.Substring(0,1)+move_from.Substring(1,1));
						if(dObj != null) {
							//doAttackAnimation(mObj, dObj);
						}
					}
				} else {
					doAttackAnimation(mObj, dObj);
				}
			}
			
			// if finished the move
			if(mObj.transform.position == mto) {
				isAnimating = false;
				mObj.name="piece_"+move_to;
				
				// Stop the run animation
				anim = GameObject.Find("piece_"+move_to).GetComponent(Animator);
				if (anim != null) {
					anim.SetBool("IsMoving", false);
				}

				// If a pawn becomes a better piece...
				if(("QRBN").IndexOf(bc)>=0) {
					Destroy (mObj);
					CreatePiece(piececolor,piecelongtype(bc,piececolor),move_to); 		// promotion...
				}
				C0.c0_moves2do=(C0.c0_moves2do).Substring( ((bc==" ")? 4 : 7) );
				
				// if there is no more move to do, we are not moving
				if(C0.c0_moves2do.length == 0) {
					C0.c0_moving=false;
				}	
			} 
		} else {
				isAnimating = true;
				//move_animator=(drawAnim ? GetTimeDelta(10,4): 1);
				// 4 seconds animation anyway...
				drag1_animator=0;
		}
	}
}

// this routine starts chess engine if needed...
function DoEngineMovements():void
{
    C0.c0_waitmove=(C0.c0_sidemoves==C0.c0_side);

    
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
			message2show="Calculating...";
			engineStatus=1;
		}
	}
	
	if(engineStatus==2)
	{
		// Request to other components can be sent via slow SendMessage function., Here it's good, not often.
		scriptManager.GetScript("valilCES").SendMessage("JSSetDeep",chess_strength.ToString());
		scriptManager.GetScript("valilCES").SendMessage("JSRequest",C0.c0_get_FEN());
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

	if((vrMenuController.GetTakeBackFlag() || vrMenuController.GetTakeBackFlag()) 
		&& (!C0.c0_moving) && (C0.c0_moves2do.length==0) &&
		((C0.c0_sidemoves==C0.c0_side) || gameover) 
		&&  (drag1_animator==0) && (move_animator==0))
	{
	if(gameover) gameover=false;
	
	for(var h=0;h<8;h++)
		for(var v=8;v>0;v--)
		{
		var id="piece_"+System.Convert.ToChar(System.Convert.ToInt32("a"[0])+h)+v.ToString();		// Is this square mouse is over?
		var qObj=GameObject.Find(id);
		if(!(qObj==null)) Destroy(qObj);
		}	
	if(vrMenuController.GetTakeBackFlag())
	{
		C0.c0_take_back();
		if(!(C0.c0_sidemoves==C0.c0_side)) C0.c0_take_back();
		vrMenuController.SetTakeBackFlag(false);
	}
	if(vrMenuController.GetNewGameFlag())
	{
		C0.c0_set_start_position("");
		C0.c0_sidemoves=1;
		C0.c0_waitmove=false;
		C0.c0_side=-C0.c0_side;
		C0.c0_waitmove=(C0.c0_side==C0.c0_sidemoves);
		vrMenuController.SetNewGameFlag(false);
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


// On monobehaviour ends, this is called....
function OnApplicationQuit():void { }