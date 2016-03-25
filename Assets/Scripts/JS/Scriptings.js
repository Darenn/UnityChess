import System;
import c0_4unity_chess;

/**
 * Main script
 * Member variables declarations
 */

// Main camera
public var mainCamera : Camera;
public var chessboard : GameObject;
public var C0 : c0_4unity_chess = new c0_4unity_chess();

// Member scripts
private var vrMenuController : VRMenuController;
private var highlighter : HighlighterController;
private var lightController : LightController;
private var scriptManager : ScriptManager;
private var flagManager : FlagManager;
private var constant : Constant;


private var case_destination : Vector3;

var toPromote=0;						// Promotion option (0-Q,1-R,2-B,3-N)...
var drag1_at="";								// square with a piece dragged after the first drag...
var drag1_animator:int=0;						// On drag start animation -counter
var move_animator:int=0;					// Animation counter when a piece is moving...
var mouse_at="";							// Keeps last mouse square at... (just for legal moves suggestion by using particle)
var message2show="";						// Message to show on GUI
var engineStatus=0;
var chess_strength=3;						// Set strength of chess engine...

/**
 * Initialize script objects
 */
function Awake()
{
	vrMenuController = GetComponent(VRMenuController);
	highlighter = GetComponent(HighlighterController);
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
	//InitiAllPiecesStartPosition();

	C0.c0_side = constant.WHITE_SIDE;	
	C0.c0_waitmove = true;				// Waiting for mouse drag...
	C0.c0_set_start_position("");		// Set the initial position...
	
	//position2board();					// Set current position on the board visually...
	//HideBlankPieces();				    // Hide blank-pieces...
	CreateActiveParticles();		    // Active particles are just copies, to keep acurate position on screen...	
}

/**
 * Called once per Frame
 */
function Update ()
{
	DoPieceMovements();			// All the movements of pieces (constant frames per second for rigidbody x,y,z)...
	DoEngineMovements();		// If chess engine should do a move...
	MouseMovement();			// Mouse movement events, suggest legal moves...
	RollBackAction();			// If a takeback should be performed/ or new game started..
	DragDetect();				// If mouse pressed on any square...
	
	if(engineStatus == 1) engineStatus = 2; 
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

				// chessboardCase.transform.parent = planeGroup;

				chessboardCase.name = idPiece;
				chessboardCase.transform.localScale = planeA8.transform.lossyScale;
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
	GameObject.Find(constant.BLACK_ROOK).GetComponent(Renderer).enabled = false;
	GameObject.Find(constant.WHITE_ROOK).GetComponent(Renderer).enabled = false;
	
	GameObject.Find(constant.BOARD_NAME + constant.OP_KNIGHT_NAME).GetComponent(Renderer).enabled = false;
	GameObject.Find(constant.BOARD_NAME + constant.KNIGHT_NAME).GetComponent(Renderer).enabled = false;
	GameObject.Find(constant.BOARD_NAME + constant.BISHOP_NAME).GetComponent(Renderer).enabled = false;
	GameObject.Find(constant.BOARD_NAME + constant.QUEEN_NAME).GetComponent(Renderer).enabled = false;
	GameObject.Find(constant.BOARD_NAME + constant.PAWN_NAME).GetComponent(Renderer).enabled = false;
	GameObject.Find(constant.BOARD_NAME + constant.ROOK_NAME).GetComponent(Renderer).enabled = false;
	GameObject.Find(constant.BOARD_NAME + constant.KING_NAME).GetComponent(Renderer).enabled = false;

	GameObject.Find(constant.MOVE_PARTICLE).GetComponent(Renderer).enabled = false;
	GameObject.Find(constant.DRAG_PARTICLE).GetComponent(Renderer).enabled = false;
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
 * Create a pieces with their right position
 *
 * @return void
 */
function position2board() : void
{
	var c0_Zposition = C0.c0_position;
	
	for(var c0_i = 0; c0_Zposition.length > c0_i; c0_i += 5)
	{
		var c0_Zcolor  = c0_Zposition.Substring(c0_i, 1);
		var c0_Zfigure = c0_Zposition.Substring(c0_i + 1, 1);
		var c0_Z_at    = c0_Zposition.Substring(c0_i + 2, 2);
		
		CreatePiece(c0_Zcolor, piecelongtype(c0_Zfigure, c0_Zcolor), c0_Z_at);
	}
}

/**
 * Place a piece by taking care of his color
 * if the piece is black, it reverse his orientation
 *
 * @param pieceColor The color of the piece to create
 * @param pieceType The type of the piece to create 
 * @param pieceAt The location of the piece
 * @return void
 */
function CreatePiece(pieceColor: String , pieceType : String, pieceAt : String) : void
{
	var object : GameObject;
	var rotation : Vector3;

	var fromObj = GameObject.Find(constant.BOARD_NAME + pieceType);
	var piecePosition = PiecePosition(pieceType, pieceAt);

	// If it's a pawn and the pawn is black :
	// Reverse the rotation
	if (pieceColor == constant.COLOR_BLACK && 
	    pieceType == constant.PAWN_NAME)
	{
		rotation = fromObj.transform.rotation.eulerAngles;
		rotation.y = 180;
	} 
	else 
	{
		rotation = fromObj.transform.rotation.eulerAngles;
	}

	toObj = Instantiate(fromObj, piecePosition, Quaternion.Euler(rotation));
	toObj.transform.localScale = fromObj.transform.lossyScale;
	toObj.name = constant.PIECE_BASE + pieceAt;
	
	// Modify the color relative to its color
	if(pieceColor == constant.COLOR_BLACK)
	{
		toObj.GetComponent(Renderer).material = 
			GameObject.Find(constant.BLACK_ROOK).GetComponent(Renderer).material;
	}
	else
	{
		toObj.GetComponent(Renderer).material = 
			GameObject.Find(constant.WHITE_ROOK).GetComponent(Renderer).material;
	}
	
	toObj.GetComponent(Renderer).enabled = true;
}

/**
 * Return the full name of the piece
 *
 * @param figure The short name of the piece
 * @param color The color of the piece
 * @return pieceName The full name of the piece
 */
function piecelongtype(figure : String, color : String) : String
{
	var pieceName : String;
	
	if(figure == "N")  
	{
		if(((color == constant.COLOR_WHITE) && (C0.c0_side > 0)) || 
		   ((color == constant.COLOR_BLACK) && (C0.c0_side < 0)))
		{
			pieceName = constant.KNIGHT_NAME;
		}
		else
		{
			pieceName = constant.OP_KNIGHT_NAME;
		}
	}
	else if(figure == "p") pieceName = constant.PAWN_NAME;
	else if(figure == "B") pieceName = constant.BISHOP_NAME;
	else if(figure == "R") pieceName = constant.ROOK_NAME;
	else if(figure == "Q") pieceName = constant.QUEEN_NAME;
	else if(figure == "K") pieceName = constant.KING_NAME;
	
	return pieceName;
}

/**
 * TODO
 *
 * @param
 * @param
 * @return 
 */
function PiecePosition(pieceType : String, pieceAt : String) : Vector3
{
	return case_destination;
}

/**
 * This function is called once per frame (Update)
 * Do something if the chess engine has to do a move
 *	
 * TODO -
 * @return void
 */
function DoEngineMovements() : void
{
	C0.c0_waitmove = (C0.c0_sidemoves == C0.c0_side);

    
	if((!flagManager.GetGameOverFlag()) && (engineStatus == 0) && (move_animator < 4))
	{
		if(C0.c0_D_is_check_to_king("w") || C0.c0_D_is_check_to_king("b"))
		{
			message2show = "Check+";
			if( C0.c0_D_is_mate_to_king("w") ) { message2show = "Checkmate! 0:1"; flagManager.SetGameOverFlag(true); }
			if( C0.c0_D_is_mate_to_king("b") ) { message2show = "Checkmate! 1:0"; flagManager.SetGameOverFlag(true); }
		}
		else
		{
			if(((C0.c0_sidemoves>0) && C0.c0_D_is_pate_to_king("w")) || ((C0.c0_sidemoves<0) && C0.c0_D_is_pate_to_king("b")))
				{ message2show = "Stalemate, draw 1/2-1/2"; flagManager.SetGameOverFlag(true); }
		}
	}

	if((!flagManager.GetGameOverFlag()) && (C0.c0_moves2do.length==0) && (engineStatus==0))
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
			// TEST
			highlighter.SetHighlighterPosition(hit.transform.position);
			case_destination = hit.transform.position;
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
						// deselect the the old piece
						if (GameObject.Find("piece_"+drag1_at) != null)
							GameObject.Find("piece_"+drag1_at).GetComponent(ActionController).StopPrepare();
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

private function doAttackAnimation(attacker : GameObject, attacked : GameObject) {	
	
	// get the controller of the pieces
	var attackerController : ActionController = attacker.GetComponent(ActionController);
	var attackedController : ActionController = attacked.GetComponent(ActionController);

	if(attackerController == null || attackedController == null) {
		Debug.Log("Action Controller not found.");
		Destroy (attacked);
		return;
	}
	
	// store the rotation of the attacker to reset it later
	var currentRotationAttacker : Quaternion = attacker.transform.rotation;
	// each piece look at each other
	attacker.transform.LookAt(attacked.transform.position);
	attacked.transform.LookAt(attacker.transform.position);
	
	// Active the preparing animation for the other piece
	attackedController.StopRun();
	attackedController.Prepare();
	// Active the preparing animation for the piece attacking
	attackerController.StopRun();
	attackerController.Prepare();
	// Wait some time before attack
	isWaiting = true;
	yield WaitForSeconds(timeBeforeAttack);
	
	// attack
	attackerController.Attack();
	attackedController.Die();
	yield WaitForSeconds(timeBeforeDestroy);
	Destroy (attacked);
	attackerController.StopPrepare();
	
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
	var actionController : ActionController;
	
	// a piece is dragged
	if(drag1_animator>0) {
		//GameObject.Find("piece_"+drag1_at).transform.position.y-=(5.5-drag1_animator)*0.06;

		var animatedObject = GameObject.Find("piece_" + drag1_at).GetComponent(ActionController);

		if(animatedObject != null && !animatedObject.IsPreparing())
		{
			animatedObject.Prepare();
		}
		else
		{
			Debug.Log("Unable to find animator");
		}

		drag1_animator--;
	}
	
	// if there are moves to do
	if(C0.c0_moves2do.length > 0 && !isWaiting) {
		// if there is an animation animating
		if(isAnimating) {
			// locate where is the piece from, and where it goes with chess coordonnates (a2)
			var move_from : String =C0.c0_moves2do.Substring(0,2);
			var move_to : String =C0.c0_moves2do.Substring(2,2);
			case_destination = GameObject.Find(constant.PLANE_BASE + move_to).transform.position;
			var bc : String =(((C0.c0_moves2do.length>4) && (C0.c0_moves2do.Substring(4,1)=="[")) ? C0.c0_moves2do.Substring(5,1) : " ");
			
			// get the piece relative to the from position
			Debug.Log("piece_"+move_from);
			var mObj : GameObject = GameObject.Find("piece_"+move_from);
			
			// Say to the piece to run
			actionController = mObj.GetComponent(ActionController);
			if (actionController != null && !actionController.IsRunning()) {
				actionController.StopPrepare();
				actionController.Run();
			}		
			var pieceat : String = ((("QRBN").IndexOf(bc)>=0) ? "p" : (C0.c0_D_what_at(move_to)).Substring(1,1));
			
			// get the piece color et the piece type
			var piececolor : String = (C0.c0_D_what_at(move_to)).Substring(0,1);
			var piecetype : String = piecelongtype(pieceat,piececolor);

			var mfrom : Vector3 = PiecePosition(piecetype,move_from);
			var mto : Vector3 = PiecePosition(piecetype,move_to);
			// I don't want the piece to go up or down
			mto.y = mObj.transform.position.y;
			
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
				
				// Say to the piece to stop running
				actionController = mObj.GetComponent(ActionController);
				if (actionController != null) {
					actionController.StopRun();
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
function RollBackAction() : void
{
	if((vrMenuController.GetNewGameFlag() || vrMenuController.GetTakeBackFlag()) 
		&& (!C0.c0_moving) && (C0.c0_moves2do.length==0) &&
		((C0.c0_sidemoves==C0.c0_side) || flagManager.GetGameOverFlag()) 
		&&  (drag1_animator==0) && (move_animator==0))
	{
		if(flagManager.GetGameOverFlag()) flagManager.SetGameOverFlag(false);
		
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

		// Recreate the chessboard prefab
		if(vrMenuController.GetNewGameFlag())
		{
			C0.c0_set_start_position("");
			//C0.c0_sidemoves=1;
			C0.c0_waitmove=false;
			//C0.c0_side=-C0.c0_side;
			C0.c0_waitmove=(C0.c0_side==C0.c0_sidemoves);
			vrMenuController.SetNewGameFlag(false);



			var tmpChessboard = GameObject.Find("Chessboard");
			var parentObject = tmpChessboard.transform.parent;

			Instantiate(chessboard, tmpChessboard.transform.position, 
									tmpChessboard.transform.rotation);
			}

			var chessboardClone = GameObject.Find("Chessboard(Clone)");
			chessboardClone.name = "Chessboard";

			chessboardClone.transform.parent = parentObject;
			chessboardClone.transform.localScale = tmpChessboard.transform.localScale;

			// Checking if a rotation (side changement) is needed
			/*if(C0.c0_side == constant.BLACK_SIDE) {
				var piecesGroup = GameObject.Find("Pieces");
				// piecesGroup.transform.Rotate(0, 180, 0);
				Debug.Log("Side Changement");
			}*/

			Destroy(tmpChessboard);
			Debug.Log("DEBUG");	
		// position2board();					// Set current position on the board visually...
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
function OnApplicationQuit() : void { }