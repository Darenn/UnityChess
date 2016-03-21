
import System; 

var Name="jsJester engine";

var Requests = false;
var Answer = "";

	// This is an experimental javascript version for Unity3D of Jester chess engine

	//  Originally Jester (http://www.ludochess.com/) is a strong java chess engine
	// A real treasure for the Chess society!
	// The author is Stephane N.B. Nguyen.
	//
	// This chess engine is a state-machine. 
	// Look auto-samples at the end to see it working.
	// Use chess logic before calling requests.
	// 
	// Javascript work by http://chessforeva.blogspot.com

	// HEAVY MODIFIED for Mono compiler.
	
	// PROBLEM: Timeout always interrupts searches because this Unity-Javascript-Mono-compilation is too slow and heavy for chess programming
	
	 var opnmv = "";						// Contains all moves made till now
	
	 function _BTREE(a:Array):void
		{
		a[0] = 0;					// .replay
		a[1] = 0;					// .f
		a[2] = 0;					// .t
		a[3] = 0;					// .flags
		a[4] = 0;					// .score
		}

	 function _GAMESTATS(a:Array):void
		{
		a[0] = false;			// .mate
		a[1] = false;			// .timeout
		a[2] = false;			// .recapture
		}

	 function _INT(a:Array):void
		{
		a[0] = 0;				// .i
		}

	 function _MOVES(a:Array):void
		{
		a[0] = 0;						// .gamMv
		a[1] = 0;						// .piece
		a[2] = 0;						// .color 
		a[3] = 0;						// not used-
		a[4] = 0;						// .score
		}

	function parseInt(nstr:String):int
	{
	var rv=0;
	if(nstr.length>0 && (("0123456789").IndexOf(nstr.Substring(0,1))>=0)) rv=System.Convert.ToInt32(nstr);
	return rv;
	}
	
	function charCodeAt(str:String, at:int):int { return System.Convert.ToInt32(str[at]); }
	function fromCharCode(cd:int) :String { return (""+System.Convert.ToChar(cd)); }


	  var Js_maxDepth = 6;			// Search Depth setting for javascript (no timeout option)

	  var Js_TONodes = 999999;			// TimeOut nodes
	  var Js_searchTimeout = 5.0;		// 5 seconds for search allowed (not working)

	  var Js_startTime = 0.0;
	  var Js_nMovesMade = 0;
	  var Js_computer = 0;
	  var Js_player = 0;
	  var Js_enemy = 0;

	  var Js_fUserWin_kc = false;
	  var Js_fInGame = false;


	  var Js_fGameOver = false;

	  var Js_fCheck_kc = false;
	  var Js_fMate_kc = false;
	  var Js_bDraw = 0;
	  var Js_fStalemate = false;
	  var Js_fSoonMate_kc = false;		// Algo detects soon checkmate
	  var Js_fAbandon = false;			// Algo resigns, if game lost
	
	  var Js_working = 0;
	  var Js_working2 = 0;
	  var Js_advX_pawn = 10;
	  var Js_isoX_pawn = 7;
	  var Js_pawnPlus = 0;
	  var Js_castle_pawn = 0;
	  var Js_bishopPlus = 0;
	  var Js_adv_knight = 0;
	  var Js_far_knight = 0;
	  var Js_far_bishop = 0;
	  var Js_king_agress = 0;

	  var Js_junk_pawn = -15;
	  var Js_stopped_pawn = -4;
	  var Js_doubled_pawn = -14;
	  var Js_bad_pawn = -4;
	  var Js_semiOpen_rook = 10;
	  var Js_semiOpen_rookOther = 4;
	  var Js_rookPlus = 0;
	  var Js_crossArrow = 8;
	  var Js_pinnedVal = 10;
	  var Js_semiOpen_king = 0;
	  var Js_semiOpen_kingOther = 0;
	  var Js_castle_K = 0;
	  var Js_moveAcross_K = 0;
	  var Js_safe_King = 0;

	  var Js_agress_across = -6;
	  var Js_pinned_p = -8;
	  var Js_pinned_other = -12;

	  var Js_nGameMoves = 0;	//int
	  var Js_depth_Seek = 0;
	  var Js_c1 = 0;
	  var Js_c2 = 0;
	  var Js_agress2 = new Array();	//int[]
	  var Js_agress1 = new Array();	//int[]
	  var Js_ptValue = 0;
	  var Js_flip = false;
	  var Js_fEat = false;
	  var Js_myPiece = "";

	  var Js_fiftyMoves = 0;
	  var Js_indenSqr = 0;
	  var Js_realBestDepth = 0;
	  var Js_realBestScore = 0;
	  var Js_realBestMove = 0;
	  var Js_lastDepth = 0;
	  var Js_lastScore = 0;
	  var Js_fKO = false;


	  var Js_fromMySquare = 0;
	  var Js_toMySquare = 0;
	  var Js_cNodes = 0;
	  var Js_scoreDither = 0;
	  var Js__alpha = 0;
	  var Js__beta = 0;
	  var Js_dxAlphaBeta = 0;
	  var Js_maxDepthSeek = 0;
	  var Js_specialScore = 0;
	  var Js_hint = 0;

	  var Js_currentScore = 0;

	  var Js_proPiece = 0;
	  var Js_pawc1 = new Array();
	  var Js_pawc2 = new Array();
	  var Js_origSquare = 0;
	  var Js_destSquare = 0;

	  var Js_cCompNodes = 0;
	  var Js_dxDither = 0;
	  var Js_scoreWin0 = 0;
	  var Js_scoreWin1 = 0;
	  var Js_scoreWin2 = 0;
	  var Js_scoreWin3 = 0;
	  var Js_scoreWin4 = 0;

	  var Js_USER_TOPLAY = 0;
	  var Js_JESTER_TOPLAY = 1;

	  var Js_hollow = 2;
	  var Js_empty = 0;
	  var Js_pawn = 1;
	  var Js_knight = 2;
	  var Js_bishop = 3;
	  var Js_rook = 4;
	  var Js_queen = 5;
	  var Js_king = 6;

	  var Js_white = 0;
	  var Js_black = 1;

	  var Js_N9 = 90;

	  var Js_szIdMvt = "ABCDEFGH" + "IJKLMNOP" + "QRSTUVWX" + "abcdefgh" + "ijklmnop" + "qrstuvwx" + "01234567" + "89YZyz*+";
	  var Js_szAlgMvt:Array = [ "a1", "b1", "c1", "d1", "e1", "f1", "g1", "h1", "a2", "b2", "c2", "d2", "e2", "f2", "g2", "h2", "a3", "b3", "c3", "d3", "e3", "f3", "g3", "h3", "a4", "b4", "c4", "d4", "e4", "f4", "g4", "h4", "a5", "b5", "c5", "d5", "e5", "f5", "g5", "h5", "a6", "b6", "c6", "d6", "e6", "f6", "g6", "h6", "a7", "b7", "c7", "d7", "e7", "f7", "g7", "h7", "a8", "b8", "c8", "d8", "e8", "f8", "g8", "h8" ];

	  var Js_color_sq:Array = [ 0, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0 ];

	  var Js_bkPawn = 7;
	  var Js_pawn_msk = 7;
	  var Js_promote = 8;
	  var Js_castle_msk = 16;
	  var Js_enpassant_msk = 32;
	  var Js__idem = 64;
	  var Js_menace_pawn = 128;
	  var Js_check = 256;
	  var Js_capture = 512;
	  var Js_draw = 1024;
	  var Js_pawnVal = 100;
	  var Js_knightVal = 350;
	  var Js_bishopVal = 355;
	  var Js_rookVal = 550;
	  var Js_queenVal = 1050;
	  var Js_kingVal = 1200;
	  var Js_xltP = 16384;
	  var Js_xltN = 10240;
	  var Js_xltB = 6144;
	  var Js_xltR = 1024;
	  var Js_xltQ = 512;
	  var Js_xltK = 256;
	  var Js_xltBQ = 4608;
	  var Js_xltBN = 2048;
	  var Js_xltRQ = 1536;
	  var Js_xltNN = 8192;

	  var Js_movesList = new Array();										//new _MOVES[512];
	  var Js_flag = new  Array(); _GAMESTATS(Js_flag);		//new _GAMESTATS();
	  var Js_Tree = new Array();												//new _BTREE[2000];
	  var Js_root = new Array(); _BTREE(Js_root);				//new _BTREE();
	  var Js_tmpTree = new Array();  _BTREE(Js_tmpTree);		//new _BTREE();
	  var Js_treePoint = new Array();			//new int[Js_maxDepth];
	  var Js_board = new Array();				//new int[64];
	  var Js_color = new Array();				//new int[64];
	  var Js_pieceMap = new Array();		//new int[2][16];
	  var Js_pawnMap = new Array();		//new int[2][8];
	  var Js_roquer:Array = [ 0, 0 ];
	  var Js_nMvtOnBoard = new Array();			//new int[64];
	  var Js_scoreOnBoard = new Array();			//new int[64];
	  var Js_gainScore = new Array(); _INT(Js_gainScore);		//new int

	  var Js_otherTroop:Array = [ 1, 0, 2 ];
	  var Js_variants = new Array();			//new int[Js_maxDepth];
	  var Js_pieceIndex = new Array();			//new int[64];
	  var Js_piecesCount:Array = [ 0, 0 ];
	  var Js_arrowData = new Array();			//new int[4200];
	  var Js_crossData = new Array();			//new int[4200];
	  var Js_agress = new Array();			//new int[2][64];
	  var Js_matrl:Array = [ 0, 0 ];
	  var Js_pmatrl:Array = [ 0, 0 ];
	  var Js_ematrl :Array= [ 0, 0 ];
	  var Js_pinned:Array = [ 0, 0 ];
	  var Js_withPawn:Array = [ 0, 0 ];
	  var Js_withKnight:Array = [ 0, 0 ];
	  var Js_withBishop:Array = [ 0, 0 ];
	  var Js_withRook:Array = [ 0, 0 ];
	  var Js_withQueen:Array = [ 0, 0 ];
	  var Js_flagCheck = new Array();			//new int[Js_maxDepth];
	  var Js_flagEat = new Array();			//new int[Js_maxDepth];
	  var Js_menacePawn = new Array();			//new int[Js_maxDepth];
	  var Js_scorePP = new Array();			//new int[Js_maxDepth];
	  var Js_scoreTP = new Array();			//new int[Js_maxDepth];
	  var Js_eliminate0 = new Array();			//new int[Js_maxDepth]; 
	  var Js_eliminate1 = new Array();			//new int[Js_maxDepth];
	  var Js_eliminate2 = new Array();			//new int[Js_maxDepth];
	  var Js_eliminate3 = new Array();			//new int[Js_maxDepth];
	  var Js_storage = new Array();			//new short[10000];
	  var Js_wPawnMvt = new Array();			//new int[64];
	  var Js_bPawnMvt = new Array();			//new int[64];
	  var Js_knightMvt = new Array();			//new int[2][64];
	  var Js_bishopMvt = new Array();			//new int[2][64];
	  var Js_kingMvt = new Array();			//new int[2][64];
	  var Js_killArea = new Array();			//new int[2][64];
	  var Js_fDevl:Array = [ 0, 0 ];
	  var Js_nextCross = new Array();			//new char[40000];
	  var Js_nextArrow = new Array();			//new char[40000];
	  var Js_tmpCh = new Array();				//new char[20];
	  var Js_movCh = new Array();				//new char[8];
	  var Js_b_r = new Array();				//new int[64];

	  var Js_upperNot:Array = [ " ", "P", "N", "B", "R", "Q", "K" ];
	  var Js_lowerNot:Array = [ " ", "p", "n", "b", "r", "q", "k" ];
	  var Js_rgszPiece:Array = [ "", "", "N", "B", "R", "Q", "K" ];
	  var Js_asciiMove = new Array();
	  var Js_reguBoard:Array = [ Js_rook, Js_knight, Js_bishop, Js_queen, Js_king, Js_bishop, Js_knight, Js_rook, Js_pawn, Js_pawn, Js_pawn, Js_pawn, Js_pawn, Js_pawn, Js_pawn, Js_pawn, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, Js_pawn, Js_pawn, Js_pawn, Js_pawn, Js_pawn, Js_pawn, Js_pawn, Js_pawn, Js_rook, Js_knight, Js_bishop, Js_queen, Js_king, Js_bishop, Js_knight, Js_rook ];
	  var Js_reguColor:Array = [ Js_white, Js_white, Js_white, Js_white, Js_white, Js_white, Js_white, Js_white, Js_white, Js_white, Js_white, Js_white, Js_white, Js_white, Js_white, Js_white, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, Js_black, Js_black, Js_black, Js_black, Js_black, Js_black, Js_black, Js_black, Js_black, Js_black, Js_black, Js_black, Js_black, Js_black, Js_black, Js_black ];
	  var Js_pieceTyp:Array = [ [ Js_empty, Js_pawn, Js_knight, Js_bishop, Js_rook, Js_queen, Js_king, Js_empty ], [ Js_empty, Js_bkPawn, Js_knight, Js_bishop, Js_rook, Js_queen, Js_king, Js_empty ] ];
	  var Js_direction:Array = [ [ 0, 0, 0, 0, 0, 0, 0, 0 ], [ 10, 9, 11, 0, 0, 0, 0, 0 ], [ 8, -8, 12, -12, 19, -19, 21, -21 ], [ 9, 11, -9, -11, 0, 0, 0, 0 ], [ 1, 10, -1, -10, 0, 0, 0, 0 ], [ 1, 10, -1, -10, 9, 11, -9, -11 ], [ 1, 10, -1, -10, 9, 11, -9, -11 ], [ -10, -9, -11, 0, 0, 0, 0, 0 ] ];
	  var Js_maxJobs:Array = [ 0, 2, 1, 7, 7, 7, 1, 2 ];
	  var Js_virtualBoard:Array = [ -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0, 1, 2, 3, 4, 5, 6, 7, -1, -1, 8, 9, 10, 11, 12, 13, 14, 15, -1, -1, 16, 17, 18, 19, 20, 21, 22, 23, -1, -1, 24, 25, 26, 27, 28, 29, 30, 31, -1, -1, 32, 33, 34, 35, 36, 37, 38, 39, -1, -1, 40, 41, 42, 43, 44, 45, 46, 47, -1, -1, 48, 49, 50, 51, 52, 53, 54, 55, -1, -1, 56, 57, 58, 59, 60, 61, 62, 63, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1 ];
	  var Js_start_K:Array = [ 0, 0, -4, -10, -10, -4, 0, 0, -4, -4, -8, -12, -12, -8, -4, -4, -12, -16, -20, -20, -20, -20, -16, -12, -16, -20, -24, -24, -24, -24, -20, -16, -16, -20, -24, -24, -24, -24, -20, -16, -12, -16, -20, -20, -20, -20, -16, -12, -4, -4, -8, -12, -12, -8, -4, -4, 0, 0, -4, -10, -10, -4, 0, 0 ];
	  var Js_end_K:Array = [ 0, 6, 12, 18, 18, 12, 6, 0, 6, 12, 18, 24, 24, 18, 12, 6, 12, 18, 24, 30, 30, 24, 18, 12, 18, 24, 30, 36, 36, 30, 24, 18, 18, 24, 30, 36, 36, 30, 24, 18, 12, 18, 24, 30, 30, 24, 18, 12, 6, 12, 18, 24, 24, 18, 12, 6, 0, 6, 12, 18, 18, 12, 6, 0 ];
	  var Js_vanish_K:Array = [ 0, 8, 16, 24, 24, 16, 8, 0, 8, 32, 40, 48, 48, 40, 32, 8, 16, 40, 56, 64, 64, 56, 40, 16, 24, 48, 64, 72, 72, 64, 48, 24, 24, 48, 64, 72, 72, 64, 48, 24, 16, 40, 56, 64, 64, 56, 40, 16, 8, 32, 40, 48, 48, 40, 32, 8, 0, 8, 16, 24, 24, 16, 8, 0 ];
	  var Js_end_KBNK:Array = [ 99, 90, 80, 70, 60, 50, 40, 40, 90, 80, 60, 50, 40, 30, 20, 40, 80, 60, 40, 30, 20, 10, 30, 50, 70, 50, 30, 10, 0, 20, 40, 60, 60, 40, 20, 0, 10, 30, 50, 70, 50, 30, 10, 20, 30, 40, 60, 80, 40, 20, 30, 40, 50, 60, 80, 90, 40, 40, 50, 60, 70, 80, 90, 99 ];
	  var Js_knight_pos:Array = [ 0, 4, 8, 10, 10, 8, 4, 0, 4, 8, 16, 20, 20, 16, 8, 4, 8, 16, 24, 28, 28, 24, 16, 8, 10, 20, 28, 32, 32, 28, 20, 10, 10, 20, 28, 32, 32, 28, 20, 10, 8, 16, 24, 28, 28, 24, 16, 8, 4, 8, 16, 20, 20, 16, 8, 4, 0, 4, 8, 10, 10, 8, 4, 0 ];
	  var Js_bishop_pos:Array = [ 14, 14, 14, 14, 14, 14, 14, 14, 14, 22, 18, 18, 18, 18, 22, 14, 14, 18, 22, 22, 22, 22, 18, 14, 14, 18, 22, 22, 22, 22, 18, 14, 14, 18, 22, 22, 22, 22, 18, 14, 14, 18, 22, 22, 22, 22, 18, 14, 14, 22, 18, 18, 18, 18, 22, 14, 14, 14, 14, 14, 14, 14, 14, 14 ];
	  var Js_pawn_pos:Array = [ 0, 0, 0, 0, 0, 0, 0, 0, 4, 4, 4, 0, 0, 4, 4, 4, 6, 8, 2, 10, 10, 2, 8, 6, 6, 8, 12, 16, 16, 12, 8, 6, 8, 12, 16, 24, 24, 16, 12, 8, 12, 16, 24, 32, 32, 24, 16, 12, 12, 16, 24, 32, 32, 24, 16, 12, 0, 0, 0, 0, 0, 0, 0, 0 ];
	  var Js_valueMap:Array = [ 0, Js_pawnVal, Js_knightVal, Js_bishopVal, Js_rookVal, Js_queenVal, Js_kingVal ];
	  var Js_xlat:Array = [ 0, Js_xltP, Js_xltN, Js_xltB, Js_xltR, Js_xltQ, Js_xltK ];
	  var Js_pss_pawn0:Array = [ 0, 60, 80, 120, 200, 360, 600, 800 ];
	  var Js_pss_pawn1:Array = [ 0, 30, 40, 60, 100, 180, 300, 800 ];
	  var Js_pss_pawn2:Array = [ 0, 15, 25, 35, 50, 90, 140, 800 ];
	  var Js_pss_pawn3:Array = [ 0, 5, 10, 15, 20, 30, 140, 800 ];
	  var Js_isol_pawn:Array = [ -12, -16, -20, -24, -24, -20, -16, -12 ];
	  var Js_takeBack:Array = [ -6, -10, -15, -21, -28, -28, -28, -28, -28, -28, -28, -28, -28, -28, -28, -28 ];
	  var Js_mobBishop:Array = [ -2, 0, 2, 4, 6, 8, 10, 12, 13, 14, 15, 16, 16, 16 ];
	  var Js_mobRook:Array = [ 0, 2, 4, 6, 8, 10, 11, 12, 13, 14, 14, 14, 14, 14, 14 ];
	  var Js_menaceKing:Array = [ 0, -8, -20, -36, -52, -68, -80, -80, -80, -80, -80, -80, -80, -80, -80, -80, -80, -80, -80, -80, -80, -80, -80, -80, -80, -80, -80, -80, -80, -80, -80, -80, -80, -80, -80, -80 ];
	  var Js_queenRook:Array = [ 0, 56, 0 ];
	  var Js_kingRook:Array = [ 7, 63, 0 ];
	  var Js_kingPawn:Array = [ 4, 60, 0 ];
	  var Js_raw7:Array = [ 6, 1, 0 ];
	  var Js_heavy:Array = [ false, false, false, true, true, true, false, false ];

	  var Js_AUTHOR = "Copyright © 1998-2002 - Stephane N.B. Nguyen - Vaureal, FRANCE";
	  var Js_WEBSITE = "http://www.ludochess.com/";
	  var Js_STR_COPY = "JESTER 1.10e by " + Js_AUTHOR + Js_WEBSITE;


	function BoardCpy(a: Array, b: Array):void
	{
	  for( var sq= 0; sq < 64; sq++ ) b[sq] = a[sq]; 
	}
	 
	 
	function WatchPosit():void
	{
	  var PawnStorm = false;
	  var i=0; 
	  Agression(Js_white, Js_agress[Js_white]);
	  Agression(Js_black, Js_agress[Js_black]);
	 
	  ChangeForce();
	  Js_withKnight[Js_white] = 0;
	  Js_withKnight[Js_black] = 0;
	  Js_withBishop[Js_white] = 0;
	  Js_withBishop[Js_black] = 0;
	  Js_withRook[Js_white] = 0;
	  Js_withRook[Js_black] = 0;
	  Js_withQueen[Js_white] = 0;
	  Js_withQueen[Js_black] = 0;
	  Js_withPawn[Js_white] = 0;
	  Js_withPawn[Js_black] = 0;
	  for (var side = Js_white; side <= Js_black; ++side) {
	    for (i = Js_piecesCount[side]; i >= 0; --i)
	    {
	      var b = Js_board[Js_pieceMap[side][i]];
	      if (b == Js_knight)
	        Js_withKnight[side] += 1;
	      else if (b == Js_bishop)
	        Js_withBishop[side] += 1;
	      else if (b == Js_rook)
	        Js_withRook[side] += 1;
	      else if (b == Js_queen)
	        Js_withQueen[side] += 1;
	      else if (b == Js_pawn) {
	        Js_withPawn[side] += 1;
	      }
	    }
	  }
	 
	  if (Js_fDevl[Js_white] == 0)
	  {
	    Js_fDevl[Js_white] = (((Js_board[1] == Js_knight) || (Js_board[2] == Js_bishop) || (Js_board[5] == Js_bishop) || (Js_board[6] == Js_knight)) ? 0 : 1);
	  }
	 
	  if (Js_fDevl[Js_black] == 0)
	  {
	    Js_fDevl[Js_black] = (((Js_board[57] == Js_knight) || (Js_board[58] == Js_bishop) || (Js_board[61] == Js_bishop) || (Js_board[62] == Js_knight)) ? 0 : 1);
	  }
	 
	  if ((!(PawnStorm)) && (Js_working < 5))
	  {
	    PawnStorm = ((IColmn(Js_pieceMap[Js_white][0]) < 3) && (IColmn(Js_pieceMap[Js_black][0]) > 4)) || (
	      (IColmn(Js_pieceMap[Js_white][0]) > 4) && (IColmn(Js_pieceMap[Js_black][0]) < 3));
	  }
	 
	  BoardCpy(Js_knight_pos, Js_knightMvt[Js_white]);
	  BoardCpy(Js_knight_pos, Js_knightMvt[Js_black]);
	  BoardCpy(Js_bishop_pos, Js_bishopMvt[Js_white]);
	  BoardCpy(Js_bishop_pos, Js_bishopMvt[Js_black]);

	  //slice is faster, but not exist in Unity
	  
	  //Js_knightMvt[Js_white] = Js_knight_pos.slice();
	  //Js_knightMvt[Js_black] = Js_knight_pos.slice();
	  //Js_bishopMvt[Js_white] = Js_bishop_pos.slice();
	  //Js_bishopMvt[Js_black] = Js_bishop_pos.slice();

	  MixBoard(Js_start_K, Js_end_K, Js_kingMvt[Js_white]);
	  MixBoard(Js_start_K, Js_end_K, Js_kingMvt[Js_black]);
	 
	  for( var sq= 0; sq < 64; sq++ )
	  {
	    var fyle = IColmn(sq);
	    var rank = IRaw(sq);
	    var bstrong = 1;
	    var wstrong = 1;
	    for (i = sq; i < 64; i += 8) {
	      if (!(Pagress(Js_black, i)))
	        continue;
	      wstrong = 0;
	      break;
	    }
	    for (i = sq; i >= 0; i -= 8) {
	      if (!(Pagress(Js_white, i)))
	        continue;
	      bstrong = 0;
	      break;
	    }
	    var bpadv = Js_advX_pawn;
	    var wpadv = Js_advX_pawn;
	    if ((((fyle == 0) || (Js_pawnMap[Js_white][(fyle - 1)] == 0))) && ((
	      (fyle == 7) || (Js_pawnMap[Js_white][(fyle + 1)] == 0))))
	      wpadv = Js_isoX_pawn;
	    if ((((fyle == 0) || (Js_pawnMap[Js_black][(fyle - 1)] == 0))) && ((
	      (fyle == 7) || (Js_pawnMap[Js_black][(fyle + 1)] == 0))))
	      bpadv = Js_isoX_pawn;
	    Js_wPawnMvt[sq] = (wpadv * Js_pawn_pos[sq] / 10);
	    Js_bPawnMvt[sq] = (bpadv * Js_pawn_pos[(63 - sq)] / 10);
	    Js_wPawnMvt[sq] += Js_pawnPlus;
	    Js_bPawnMvt[sq] += Js_pawnPlus;
	    if (Js_nMvtOnBoard[Js_kingPawn[Js_white]] != 0)
	    {
	      if ((((fyle < 3) || (fyle > 4))) && (IArrow(sq, Js_pieceMap[Js_white][0]) < 3))
	        Js_wPawnMvt[sq] += Js_castle_pawn;
	    }
	    else if ((rank < 3) && (((fyle < 2) || (fyle > 5))))
	      Js_wPawnMvt[sq] += Js_castle_pawn / 2;
	    if (Js_nMvtOnBoard[Js_kingPawn[Js_black]] != 0)
	    {
	      if ((((fyle < 3) || (fyle > 4))) && (IArrow(sq, Js_pieceMap[Js_black][0]) < 3))
	        Js_bPawnMvt[sq] += Js_castle_pawn;
	    }
	    else if ((rank > 4) && (((fyle < 2) || (fyle > 5))))
	      Js_bPawnMvt[sq] += Js_castle_pawn / 2;
	    if (PawnStorm)
	    {
	      if (((IColmn(Js_pieceMap[Js_white][0]) < 4) && (fyle > 4)) || (
	        (IColmn(Js_pieceMap[Js_white][0]) > 3) && (fyle < 3)))
	        Js_wPawnMvt[sq] += 3 * rank - 21;
	      if (((IColmn(Js_pieceMap[Js_black][0]) < 4) && (fyle > 4)) || (
	        (IColmn(Js_pieceMap[Js_black][0]) > 3) && (fyle < 3)))
	        Js_bPawnMvt[sq] -= 3 * rank;
	    }
	    Js_knightMvt[Js_white][sq] += 5 - IArrow(sq, Js_pieceMap[Js_black][0]);
	    Js_knightMvt[Js_white][sq] += 5 - IArrow(sq, Js_pieceMap[Js_white][0]);
	    Js_knightMvt[Js_black][sq] += 5 - IArrow(sq, Js_pieceMap[Js_white][0]);
	    Js_knightMvt[Js_black][sq] += 5 - IArrow(sq, Js_pieceMap[Js_black][0]);
	    Js_bishopMvt[Js_white][sq] += Js_bishopPlus;
	    Js_bishopMvt[Js_black][sq] += Js_bishopPlus;
	
	    for (i = Js_piecesCount[Js_black]; i >= 0; --i)
	    {
	      var pMap2 = Js_pieceMap[Js_black][i];
	      if (IArrow(sq, pMap2) < 3)
	        Js_knightMvt[Js_white][sq] += Js_adv_knight;
	    }
	    for (i = Js_piecesCount[Js_white]; i >= 0; --i)
	    {
	      pMap2 = Js_pieceMap[Js_white][i];
	      if (IArrow(sq, pMap2) < 3) {
	        Js_knightMvt[Js_black][sq] += Js_adv_knight;
	      }
	    }
	 
	    if (wstrong != 0)
	      Js_knightMvt[Js_white][sq] += Js_far_knight;
	    if (bstrong != 0) {
	      Js_knightMvt[Js_black][sq] += Js_far_knight;
	    }
	    if (wstrong != 0)
	      Js_bishopMvt[Js_white][sq] += Js_far_bishop;
	    if (bstrong != 0) {
	      Js_bishopMvt[Js_black][sq] += Js_far_bishop;
	    }
	 
	    if (Js_withBishop[Js_white] == 2)
	      Js_bishopMvt[Js_white][sq] += 8;
	    if (Js_withBishop[Js_black] == 2)
	      Js_bishopMvt[Js_black][sq] += 8;
	    if (Js_withKnight[Js_white] == 2)
	      Js_knightMvt[Js_white][sq] += 5;
	    if (Js_withKnight[Js_black] == 2) {
	      Js_knightMvt[Js_black][sq] += 5;
	    }
	    Js_killArea[Js_white][sq] = 0;
	    Js_killArea[Js_black][sq] = 0;
	    if (IArrow(sq, Js_pieceMap[Js_white][0]) == 1)
	      Js_killArea[Js_black][sq] = Js_king_agress;
	    if (IArrow(sq, Js_pieceMap[Js_black][0]) == 1) {
	      Js_killArea[Js_white][sq] = Js_king_agress;
	    }
	    var Pd = 0;
	    var pp = 0;
	    var z1 = 0;
	    var j = 0;
		var val =0;
		
	    for ( var k = 0; k <= Js_piecesCount[Js_white]; ++k)
	    {
	      i = Js_pieceMap[Js_white][k];
	      if (Js_board[i] != Js_pawn)
	        continue;
	      pp = 1;
	      if (IRaw(i) == 6)
	        z1 = i + 8;
	      else
	        z1 = i + 16;
	      for (j = i + 8; j < 64; j += 8) {
	        if ((!(Pagress(Js_black, j))) && (Js_board[j] != Js_pawn))
	          continue;
	        pp = 0;
	        break;
	      }
	      if (pp != 0)
	        Pd += 5 * Js_crossData[(sq * 64 + z1)];
	      else {
	        Pd += Js_crossData[(sq * 64 + z1)];
	      }
	    }
	    for ( k = 0; k <= Js_piecesCount[Js_black]; ++k)
	    {
	      i = Js_pieceMap[Js_black][k];
	      if (Js_board[i] != Js_pawn)
	        continue;
	      pp = 1;
	      if (IRaw(i) == 1)
	        z1 = i - 8;
	      else
	        z1 = i - 16;
	      for (j = i - 8; j >= 0; j -= 8) {
	        if ((!(Pagress(Js_white, j))) && (Js_board[j] != Js_pawn))
	          continue;
	        pp = 0;
	        break;
	      }
	      if (pp != 0)
	        Pd += 5 * Js_crossData[(sq * 64 + z1)];
	      else {
	        Pd += Js_crossData[(sq * 64 + z1)];
	      }
	    }
	    if (Pd == 0)
	      continue;
	    
		val = ( Pd * Js_working2 / 10 );
	    Js_kingMvt[Js_white][sq] -= val;
	    Js_kingMvt[Js_black][sq] -= val;
	  }

	}
	 
	 
	function CalcKBNK(winner:int, king1:int, king2:int):int
	{
	  var end_KBNKsq = 0;
	 
	  for( var sq= 0; sq < 64; sq++ )
	  {
	    if (Js_board[sq] == Js_bishop)
	      if (IRaw(sq) % 2 == IColmn(sq) % 2)
	        end_KBNKsq = 0;
	      else
	        end_KBNKsq = 7;
	  }
	 
	  var s = Js_ematrl[winner] - 300;
	  if (end_KBNKsq == 0)
	    s += Js_end_KBNK[king2];
	  else
	    s += Js_end_KBNK[Iwxy(IRaw(king2), 7 - IColmn(king2))];
	  s -= Js_crossData[(king1 * 64 + king2)];
	  s -= IArrow(Js_pieceMap[winner][1], king2);
	  s -= IArrow(Js_pieceMap[winner][2], king2);
	  return s;
	}
	 
	 
	function ChangeForce():void
	{
	  Js_ematrl[Js_white] = (Js_matrl[Js_white] - Js_pmatrl[Js_white] - Js_kingVal);
	  Js_ematrl[Js_black] = (Js_matrl[Js_black] - Js_pmatrl[Js_black] - Js_kingVal);
	  var tmatrl = Js_ematrl[Js_white] + Js_ematrl[Js_black];
	  var s1 = (tmatrl < 1400) ? 10 : (tmatrl > 6600) ? 0 : ( (6600 - tmatrl) / 520 );
	  if (s1 == Js_working)
	    return;
	  Js_working = s1;
	  Js_working2 = ((tmatrl < 1400) ? 10 : (tmatrl > 3600) ? 0 : (3600 - tmatrl) / 220);
	  
	  Js_castle_pawn = (10 - Js_working);

	  Js_pawnPlus = Js_working;
	 
	  Js_adv_knight = ((Js_working + 2) / 3);
	  Js_far_knight = ((Js_working + 6) / 2);
	 
	  Js_far_bishop = ((Js_working + 6) / 2);
	  Js_bishopPlus = (2 * Js_working);
	 
	  Js_rookPlus = (6 * Js_working);
	 
	  Js_semiOpen_king = ((3 * Js_working - 30) / 2);
	  Js_semiOpen_kingOther = (Js_semiOpen_king / 2);
	  Js_castle_K = (10 - Js_working);
	  Js_moveAcross_K = (-40 / (Js_working + 1));
	  Js_king_agress = ((10 - Js_working) / 2);
	  if (Js_working < 8)
	    Js_safe_King = (16 - (2 * Js_working));
	  else {
	    Js_safe_King = 0;
	  }

	}
	 
	 
	function UndoMv():void
	{
	  var f = Js_movesList[Js_nGameMoves][0] >> 8;
	  var t = Js_movesList[Js_nGameMoves][0] & 0xFF;
	  if ((Js_board[t] == Js_king) && (IArrow(t, f) > 1))
	  {
	    DoCastle(Js_movesList[Js_nGameMoves][2], f, t, 2);
	  }
	  else
	  {
	    if (((Js_color[t] == Js_white) && (IRaw(f) == 6) && (IRaw(t) == 7)) || (
	      (Js_color[t] == Js_black) && (IRaw(f) == 1) && (IRaw(t) == 0)))
	    {
	      var from = f;
	      for (var g = Js_nGameMoves - 1; g > 0; --g)
	      {
	        if ((Js_movesList[g][0] & 0xFF) != from)
	          continue;
	        from = Js_movesList[g][0] >> 8;
	      }
	 
	      if (((Js_color[t] == Js_white) && (IRaw(from) == 1)) || ((Js_color[t] == Js_black) && (IRaw(from) == 6)))
	      {
	        Js_board[t] = Js_pawn;
	      }
	    }
	    Js_board[f] = Js_board[t];
	    Js_color[f] = Js_color[t];
	    Js_board[t] = Js_movesList[Js_nGameMoves][1];
	    Js_color[t] = Js_movesList[Js_nGameMoves][2];
	    if (Js_color[t] != Js_hollow) Js_nMvtOnBoard[t] += -1;
	    Js_nMvtOnBoard[f] += -1;
	  }
	 
	  Js_nGameMoves += -1;
	  if( Js_fiftyMoves < Js_nGameMoves ) Js_fiftyMoves = Js_nGameMoves;

	  Js_computer = Js_otherTroop[Js_computer];
	  Js_enemy = Js_otherTroop[Js_enemy];
	  Js_flag[0] = false;
	  Js_depth_Seek = 0;

	  UpdateDisplay();

	  InitStatus();
			
	}
	 
	function ISqAgrs(sq:int,side:int):int
	{
	  var xside = Js_otherTroop[side];
	 
	  var idir = Js_pieceTyp[xside][Js_pawn] * 64 * 64 + sq * 64;
	 
	  var u = Js_nextArrow[(idir + sq)];
	  if (u != sq)
	  {
	    if ((Js_board[u] == Js_pawn) && (Js_color[u] == side)) {
	      return 1;
	    }
	    u = Js_nextArrow[(idir + u)];
	    if ((u != sq) && (Js_board[u] == Js_pawn) && (Js_color[u] == side)) {
	      return 1;
	    }
	  }
	  if (IArrow(sq, Js_pieceMap[side][0]) == 1) {
	    return 1;
	  }
	 
	  var ipos = Js_bishop * 64 * 64 + sq * 64;
	  idir = ipos;
	 
	  for( u = Js_nextCross[(ipos + sq)]; ; )
	  {
	   if (Js_color[u] == Js_hollow)
	    {
	      u = Js_nextCross[(ipos + u)];
	    }
	    else {
	      if ((Js_color[u] == side) && (((Js_board[u] == Js_queen) || (Js_board[u] == Js_bishop)))) {
	        return 1;
	      }
	      u = Js_nextArrow[(idir + u)];
	    }
		if(u == sq) break;
	  }
	 
	  ipos = Js_rook * 64 * 64 + sq * 64;
	  idir = ipos;
	 
	  for( u = Js_nextCross[(ipos + sq)]; ; )
	  {
	   if (Js_color[u] == Js_hollow)
	    {
	      u = Js_nextCross[(ipos + u)];
	    }
	    else {
	      if ((Js_color[u] == side) && (((Js_board[u] == Js_queen) || (Js_board[u] == Js_rook)))) {
	        return 1;
	      }
	      u = Js_nextArrow[(idir + u)];
	    }
		if(u == sq) break;
	  }

	 
	  idir = Js_knight * 64 * 64 + sq * 64;

	  for( u = Js_nextArrow[(idir + sq)]; ; )
	  {
	    if ((Js_color[u] == side) && (Js_board[u] == Js_knight))
	    {
	      return 1;
	    }
	    u = Js_nextArrow[(idir + u)];
		if(u == sq) break;
	  }

	  return 0;
	}
	 
	function Iwxy(a:int,b:int):int
	{
	  return (a << 3 | b);
	}
	 
	function XRayBR(sq:int, s:Array, mob:Array):void
	{
	  var Kf = Js_killArea[Js_c1];
	  mob[0] = 0;
	  var piece = Js_board[sq];
	 
	  var ipos = piece * 64 * 64 + sq * 64;
	  var idir = ipos;
	 
	  var u = Js_nextCross[(ipos + sq)];
	  var pin = -1;
	  
	  for( ; ; )
	  {	  
		s[0] += Kf[u];
	 
	    if (Js_color[u] == Js_hollow)
	    {
	      mob[0] += 1;
	 
	      if (Js_nextCross[(ipos + u)] == Js_nextArrow[(idir + u)])
	        pin = -1;
	      u = Js_nextCross[(ipos + u)];
	    }
	    else if (pin < 0)
	    {
	      if ((Js_board[u] == Js_pawn) || (Js_board[u] == Js_king)) {
	        u = Js_nextArrow[(idir + u)];
	      }
	      else {
	        if (Js_nextCross[(ipos + u)] != Js_nextArrow[(idir + u)])
	          pin = u;
	        u = Js_nextCross[(ipos + u)];
	      }
	    }
	    else
	    {
	      if ((Js_color[u] == Js_c2) && (((Js_board[u] > piece) || (Js_agress2[u] == 0))))
	      {
	        if (Js_color[pin] == Js_c2)
	        {
	          s[0] += Js_pinnedVal;
	          if ((Js_agress2[pin] == 0) || (Js_agress1[pin] > Js_xlat[Js_board[pin]] + 1))
	            Js_pinned[Js_c2] += 1;
	        }
	        else {
	          s[0] += Js_crossArrow; }
	      }
	      pin = -1;
	      u = Js_nextArrow[(idir + u)];
	    }
		if(u == sq) break;
	  }

	}
	 
	function ComputerMvt():void
	{
	  if (Js_flag[0]) {
	    return;
	  }
	  Js_startTime = Time.time;

	  Js_Nodes = 0;
	  
	  ChoiceMov(Js_computer, 1);
	  IfCheck();
	  if (!(Js_fUserWin_kc)) ShowMov(Js_asciiMove[0]);
	  if (!(CheckMatrl())) Js_bDraw = 1;
	  ShowStat();

	}
	 
	function InitMoves():void {
	  var dest = new Array();
	  var steps = new Array();
	  var sorted = new Array();
	 
	  for ( var ptyp= 0; ptyp < 8; ptyp++ )
	   for ( var po= 0; po < 64; po++ )
	    for ( var p0= 0; p0 < 64; p0++ )
		  {
	        var i = ptyp * 64 * 64 + po * 64 + p0;
	        Js_nextCross[i] = po;	//(char)
	        Js_nextArrow[i] = po;	//(char)
	      }

	 
	  
	  for ( ptyp = 1; ptyp < 8; ptyp++ )
		{
		for ( po = 21; po< 99; po++ )
	    { if (Js_virtualBoard[po] < 0) {
	        continue;
	      }
	 
	      var ipos = ptyp * 64 * 64 + Js_virtualBoard[po] * 64;
	 
	      var idir = ipos;
	 
		  var di = 0;
	        
	      var s = 0;
	      for(var d = 0;;)
	      {
	        dest[d] = new Array();
	        dest[d][0] = Js_virtualBoard[po];
	        var delta = Js_direction[ptyp][d];
	        if (delta != 0)
	        {
	          p0 = po;
	          for (s = 0; s < Js_maxJobs[ptyp]; ++s)
	          {
	            p0 += delta;
	 
	            if ((Js_virtualBoard[p0] < 0) || (
	              (((ptyp == Js_pawn) || (ptyp == Js_bkPawn))) && (s > 0) && (((d > 0) || (Js_reguBoard[Js_virtualBoard[po]] != Js_pawn))))) {
	              break;
	            }
	            dest[d][s] = Js_virtualBoard[p0];
	          }
	        }
	        else {
	          s = 0;
	        }
	 
	        steps[d] = s;
		     for (di = d; (s > 0) && (di > 0); --di)
	          if (steps[sorted[(di - 1)]] == 0)
	            sorted[di] = sorted[(di - 1)];
	          else
	            break;
	        sorted[di] = d;
			
			if(++d >= 8) break;
	      }
	 
	      p0 = Js_virtualBoard[po];
	      if ((ptyp == Js_pawn) || (ptyp == Js_bkPawn))
	      {
	        for (s = 0; s < steps[0]; ++s)
	        {
	          Js_nextCross[(ipos + p0)] = dest[0][s];			//(char)
	          p0 = dest[0][s];
	        }
	        p0 = Js_virtualBoard[po];
	        for( d = 1; d < 3; d++ )
	        {
	          Js_nextArrow[(idir + p0)] = dest[d][0];			//(char)
	          p0 = dest[d][0];
	        }
	      }
	      else
	      {
	        Js_nextArrow[(idir + p0)] = dest[sorted[0]][0];			//(char)
	        for( d = 0; d < 8; d++ )
			 for (s = 0; s < steps[sorted[d]]; ++s)
	          {
	            Js_nextCross[(ipos + p0)] = dest[sorted[d]][s];		//(char)
	            p0 = dest[sorted[d]][s];
	            if (d >= 7)
	              continue;
	            Js_nextArrow[(idir + p0)] = dest[sorted[(d + 1)]][0];	//(char)
	          }
	      }
	    }
	  }
	}
	 
	function ShowMov(rgchMove:Array):void
	{
	  var fKcastle = false;
	  var fQcastle = false;
	 
	  for( var i= 0; i < 8; i++ ) Js_movCh[i] = " ";
	 
	  var szM = "";
	  if (!(Js_flip))
	  {
	    Js_nMovesMade += 1;
	    if (Js_nMovesMade < 10) szM = " ";
	    szM = szM + Js_nMovesMade + ".";
	  }
	 
	  Js_movCh[0] = rgchMove[0];
	  Js_movCh[1] = rgchMove[1];
	  Js_movCh[2] = "-";
	
	  if ((Js_root[3] & Js_capture) != 0 || Js_fEat) Js_movCh[2] = "x";
	  
	  Js_movCh[3] = rgchMove[2];
	  Js_movCh[4] = rgchMove[3];

	  var waspromo:String = (((Js_root[3] & Js_promote) != 0) ? Js_upperNot[Js_board[Js_root[2]]] : "" );
	  if( rgchMove[4] == "=" ) waspromo = rgchMove[5];

	  i = 5;
	  if (waspromo.length>0 )
	  {
	    Js_movCh[(i++)] = "=";
	    Js_movCh[(i++)] = waspromo;
	  }
	  if (Js_bDraw != 0) Js_movCh[i] = "=";
	  if (Js_fCheck_kc) Js_movCh[i] = "+";
	  if (Js_fMate_kc) Js_movCh[i] = "#";

	  var mv2:String = StrValueOf(Js_movCh);
	  if (Js_myPiece == "K")
	  {
	    if ((mv2=="e1-g1") || (mv2=="e8-g8")) fKcastle = true;
	    if ((mv2=="e1-c1") || (mv2=="e8-c8")) fQcastle = true;
	  }
	 
	  if ((fKcastle) || (fQcastle))
	  {
	    if (fKcastle) szM += "O-O" + Js_movCh[i];
	    if (fQcastle) szM += "O-O-O" + Js_movCh[i];
	  }
	  else
	  {
	    szM += Js_myPiece + mv2;
	  }
	  szM += " ";

	  if (Js_fAbandon) szM = "resign";
	  Js_myPiece = "";
	  MessageOut(szM, Js_flip);

	  Js_flip = (!(Js_flip));
	  
	  opnmv += mv2.Substring(0,2) + mv2.Substring(3,2) + (waspromo.length>0 ? "["+waspromo+"]" : "" );
	  
	}
	 
	function CheckMov(s:Array, iop:int):int
	{
	  var tempb = new Array(); _INT(tempb);
	  var tempc = new Array(); _INT(tempc);
	  var tempsf = new Array(); _INT(tempsf);
	  var tempst = new Array(); _INT(tempst);
	  var xnode = new Array(); _BTREE(xnode);
	 
	  var cnt = 0;
	  var pnt = 0;
	 

	  if (iop == 2)
	  {
	    UnValidateMov(Js_enemy, xnode, tempb, tempc, tempsf, tempst);
	    return 0;
	  }
	  cnt = 0;
	  AvailMov(Js_enemy, 2);
	  pnt = Js_treePoint[2];
	  var s0 = StrValueOf(s);
	  while (pnt < Js_treePoint[3])
	  {
	    var node = Js_Tree[(pnt++)];	// _BTREE

	    Lalgb(node[1], node[2], node[3]);
	    var s1 = StrValueOf(Js_asciiMove[0]);
		
	    if ((((s[0] != Js_asciiMove[0][0]) || (s[1] != Js_asciiMove[0][1]) || (s[2] != Js_asciiMove[0][2]) || (s[3] != Js_asciiMove[0][3]))) && 
	      (((s[0] != Js_asciiMove[1][0]) || (s[1] != Js_asciiMove[1][1]) || (s[2] != Js_asciiMove[1][2]) || (s[3] != Js_asciiMove[1][3]))) && 
	      (((s[0] != Js_asciiMove[2][0]) || (s[1] != Js_asciiMove[2][1]) || (s[2] != Js_asciiMove[2][2]) || (s[3] != Js_asciiMove[2][3]))) && ((
	      (s[0] != Js_asciiMove[3][0]) || (s[1] != Js_asciiMove[3][1]) || (s[2] != Js_asciiMove[3][2]) || (s[3] != Js_asciiMove[3][3]))))
	      continue;
	    ++cnt;

	    xnode = node;

	    break;
	  }

	  if (cnt == 1)
	  {
	    ValidateMov(Js_enemy, xnode, tempb, tempc, tempsf, tempst, Js_gainScore);
	    if (ISqAgrs(Js_pieceMap[Js_enemy][0], Js_computer) != 0)
	    {
	      UnValidateMov(Js_enemy, xnode, tempb, tempc, tempsf, tempst);
	 
	      return 0;
	    }
	 
	    if (iop == 1) return 1;
	 
	    UpdateDisplay();

	    Js_fEat = ((xnode[3] & Js_capture) != 0);
	    if ((Js_board[xnode[2]] == Js_pawn) || ((xnode[3] & Js_capture) != 0) || ((xnode[3] & Js_castle_msk) != 0))
	    {
	      Js_fiftyMoves = Js_nGameMoves;
	    }
	 
	    Js_movesList[Js_nGameMoves][4] = 0;
	 
	    Lalgb(xnode[1], xnode[2], 0);
	    return 1;
	  }
	 
	  return 0;
	}
	 	 
 
	function GetRnd(iVal:int):int
	{
	  return Mathf.RoundToInt( UnityEngine.Random.Range(0,  iVal) );		// (int)	
	}
	 
	function UnValidateMov(side:int, node:Array, tempb:Array, tempc:Array, tempsf:Array, tempst:Array):void
	{
	  var xside = Js_otherTroop[side];
	  var f = node[1];
	  var t = node[2];
	  Js_indenSqr = -1;
	  Js_nGameMoves += -1;
	  if ((node[3] & Js_castle_msk) != 0) {
	    DoCastle(side, f, t, 2);
	  }
	  else {
	    Js_color[f] = Js_color[t];
	    Js_board[f] = Js_board[t];
	    Js_scoreOnBoard[f] = tempsf[0];
	    Js_pieceIndex[f] = Js_pieceIndex[t];
	    Js_pieceMap[side][Js_pieceIndex[f]] = f;
	    Js_color[t] = tempc[0];
	    Js_board[t] = tempb[0];
	    Js_scoreOnBoard[t] = tempst[0];
	    if ((node[3] & Js_promote) != 0)
	    {
	      Js_board[f] = Js_pawn;
	      Js_pawnMap[side][IColmn(t)] += 1;
	      Js_matrl[side] += (Js_pawnVal - Js_valueMap[(node[3] & Js_pawn_msk)]);
	      Js_pmatrl[side] += Js_pawnVal;
	    }
	 
	    if (tempc[0] != Js_hollow)
	    {
	      UpdatePiecMap(tempc[0], t, 2);
	      if (tempb[0] == Js_pawn)
	        Js_pawnMap[tempc[0]][IColmn(t)] += 1;
	      if (Js_board[f] == Js_pawn)
	      {
	        Js_pawnMap[side][IColmn(t)] += -1;
	        Js_pawnMap[side][IColmn(f)] += 1;
	      }
	      Js_matrl[xside] += Js_valueMap[tempb[0]];
	      if (tempb[0] == Js_pawn) {
	        Js_pmatrl[xside] += Js_pawnVal;
	      }
	 
	      Js_nMvtOnBoard[t] += -1;
	    }
	    if ((node[3] & Js_enpassant_msk) != 0) {
	      PrisePassant(xside, f, t, 2);
	    }
	 
	    Js_nMvtOnBoard[f] += -1;

	  }
	}
	 
	function FJunk(sq:int):boolean
	{
	  var piece = Js_board[sq];
	  var ipos = Js_pieceTyp[Js_c1][piece] * 64 * 64 + sq * 64;
	  var idir = ipos;
	  var u = 0;
	  if (piece == Js_pawn)
	  {
	    u = Js_nextCross[(ipos + sq)];
	    if (Js_color[u] == Js_hollow)
	    {
	      if (Js_agress1[u] >= Js_agress2[u])
	        return false;
	      if (Js_agress2[u] < Js_xltP)
	      {
	        u = Js_nextCross[(ipos + u)];
	        if ((Js_color[u] == Js_hollow) && (Js_agress1[u] >= Js_agress2[u]))
	          return false;
	      }
	    }
	    u = Js_nextArrow[(idir + sq)];
	    if (Js_color[u] == Js_c2) return false;
	    u = Js_nextArrow[(idir + u)];
	    if (Js_color[u] == Js_c2) return false;
	  }
	  else
	  {
	    for( u = Js_nextCross[(ipos + sq)]; ; )
	    { if ((Js_color[u] != Js_c1) && ((
	        (Js_agress2[u] == 0) || (Js_board[u] >= piece)))) {
	        return false;
	      }
	      if (Js_color[u] == Js_hollow)
	        u = Js_nextCross[(ipos + u)];
	      else
	        u = Js_nextArrow[(idir + u)];
		 if(u==sq) break;
	    }
	  }
	  return true;
	}
	 
	function ShowThink(score4:int, best:Array):void
	{
	  if (Js_depth_Seek > Js_realBestDepth) Js_realBestScore = -20000;
	  if ((Js_depth_Seek >= Js_realBestDepth) && (score4 >= Js_realBestScore))
	  {
	    Js_realBestDepth = Js_depth_Seek;
	    Js_realBestScore = score4;
	    Js_realBestMove = best[1];
	  }
	 
	  if ((Js_depth_Seek == Js_lastDepth) && (score4 == Js_lastScore)) return;
	  Js_lastDepth = Js_depth_Seek;
	  Js_lastScore = score4;
	 
	  var s = "";
	  for (var i = 0; best[(++i)] > 0; )
	  {
	    Lalgb(best[i] >> 8, best[i] & 0xFF, 0);
	 
	    Js_tmpCh[0] = Js_asciiMove[0][0];
	    Js_tmpCh[1] = Js_asciiMove[0][1];
	    Js_tmpCh[2] = "-";
	    Js_tmpCh[3] = Js_asciiMove[0][2];
	    Js_tmpCh[4] = Js_asciiMove[0][3];
	    Js_tmpCh[5] = "";
	    s = s + StrValueOf(Js_tmpCh) + " ";
	  }
	  //MessageOut("Thinking: " + s , true);

	  //ShowScore(score4);
	}
	 
	 
	function ResetData():void
	{
	  for( var i= 0; i < 512; i++ )
		{
		Js_movesList[i] = new Array(); _MOVES( Js_movesList[i] );
		}
	 
	  for( i = 0; i < 2000; i++ )
		{
		Js_Tree[i] = new Array(); _BTREE( Js_Tree[i] );
		}

	  for (i = 0; i < 100; ++i)
	  {
	    Js_treePoint[i] = 0;
	    Js_variants[i] = 0;
	    Js_flagCheck[i] = 0;
	    Js_flagEat[i] = 0;
	    Js_menacePawn[i] = 0;
	    Js_scorePP[i] = 0;
	    Js_scoreTP[i] = 0;
	    Js_eliminate0[i] = 0;
		Js_eliminate1[i] = 0;
	    Js_eliminate2[i] = 0;
	    Js_eliminate3[i] = 0; }
	 

	  for( i = 0; i < 2; i++ )
	  {
		Js_pieceMap[i] = new Array();
	    for( var j= 0;  j < 16; j++ ) Js_pieceMap[i][j] = 0;
	  }
	 
	  for( i = 0; i < 2; i++ )
	  {
	    Js_pawnMap[i] = new Array();
	    for( j = 0;  j < 8; j++ )Js_pawnMap[i][j] = 0;
	  }

	  for( i = 0; i < 64; i++ )
	  {
	    Js_nMvtOnBoard[i] = 0;
	    Js_scoreOnBoard[i] = 0;
	    Js_pieceIndex[i] = 0;
	  }
	 
	  for( i = 0; i < 4200; i++ )
	  {
	    Js_arrowData[i] = 0;
	    Js_crossData[i] = 0;
	  }
	 
	  for( i = 0; i < 2; i++ )
	  {
	    Js_agress[i] = new Array();
	    for( j = 0; j< 64; j++ ) Js_agress[i][j] = 0;
	  }
	 
	  for( i = 0; i < 10000; i++ )	 Js_storage[i] = 0;
	 
	  for( i = 0; i < 64; i++ )
	  {
	    Js_wPawnMvt[i] = 0;
	    Js_bPawnMvt[i] = 0;
	  }
	 
	  for( i=0; i<2; i++ )
	  {
	      Js_knightMvt[i] = new Array();
	      Js_bishopMvt[i] = new Array();
	      Js_kingMvt[i] =new Array();
	      Js_killArea[i] = new Array();
	    for( j=0; j<64; j++ )
		{
	      Js_knightMvt[i][j] = 0;
	      Js_bishopMvt[i][j] = 0;
	      Js_kingMvt[i][j] = 0;
	      Js_killArea[i][j] = 0;
	    }
	  }
	 
	  for( i = 0; i < 40000; i++ )	
	  {
	    Js_nextCross[i] = 0;
	    Js_nextArrow[i] = 0;
	  }
	  
	  opnmv = "";
	}
	 	 
	function InChecking(side:int):boolean
	{
	  for( var i= 0; i < 64; i++ )
	  {
	    if ((Js_board[i] == Js_king) && 
	      (Js_color[i] == side) && 
	      (ISqAgrs(i, Js_otherTroop[side]) != 0)) return true;
	  }
	  return false;
	}
	 
	 
	function ShowScore(score5:int):void
	{
	  var fMinus = (score5 < 0);
	  if (fMinus) score5 = -score5;
	  if (score5 != 0) ++score5;

	  var sz = "";
	  if (score5 == 0)
	    sz = "";
	  else if (fMinus)
	    sz = "-";
	  else {
	    sz = "+";
	  }
	  var sc100 = Mathf.Floor( score5 );
	  sz += (sc100/100).ToString();
	  
	  MessageOut("(" + sz + ")",false);
	}

	 
	function MixBoard(a:Array, b:Array, c:Array):void
	{
	  for( var sq= 0; sq < 64; sq++ ) c[sq] = ((a[sq] * (10 - Js_working) + b[sq] * Js_working) / 10);
	}
	 
	function InitGame():void
	{
	  ResetData();

	  Js_flip = false;

	  Js_fInGame = true;
	  Js_fGameOver = false;

	  Js_fCheck_kc = false;
	  Js_fMate_kc = false;
	  Js_fSoonMate_kc = false;
	 
	  Js_bDraw = 0;
	  Js_fStalemate = false;
	  Js_fAbandon = false;
	  Js_fUserWin_kc = false;
	 
	 
	  InitArrow();
	  InitMoves();
	 
	  Js_working = -1;
	  Js_working2 = -1;
	 
	  Js_flag[0] = false;
	  Js_flag[2] = true;

	  Js_cNodes = 0;
	  Js_indenSqr = 0;
	  Js_scoreDither = 0;
	  Js__alpha = Js_N9;
	  Js__beta = Js_N9;
	  Js_dxAlphaBeta = Js_N9;
	  Js_maxDepthSeek = (Js_maxDepth - 1);

	  Js_nMovesMade = 0;	 
	  Js_specialScore = 0;
	  Js_nGameMoves = 0;
	  Js_fiftyMoves = 1;
	  Js_hint = 3092;

	  Js_fDevl[Js_white] = 0;
	  Js_fDevl[Js_black] = 0;
	  Js_roquer[Js_white] = 0;
	  Js_roquer[Js_black] = 0;
	  Js_menacePawn[0] = 0;
	  Js_flagEat[0] = 0;
	  Js_scorePP[0] = 12000;
	  Js_scoreTP[0] = 12000;
	 
	  for( var i= 0; i < 4; i++ )
	   {
	   Js_asciiMove[i] = new Array();
	   for( var j= 0; j < 6; j++ ) Js_asciiMove[i][j]="";
	   }
	 
	  for( i = 0; i < 64; i++ )
	  {
	    Js_board[i] = Js_reguBoard[i];
	    Js_color[i] = Js_reguColor[i];
	    Js_nMvtOnBoard[i] = 0;
	  }
	 
	  if (Js_nMovesMade == 0)
	  {
	    Js_computer = Js_white;
	    Js_player = Js_black;
	    Js_enemy = Js_player;
	  }

	  Js_fUserWin_kc=false;

	  InitStatus();
		 
	}
	 
	 
	function IColmn(a:int):int
	{
	  return (a & 0x7);
	}
	 

	function ShowStat():void
	{
	  var sz = "";
	 
	  if ((Js_fMate_kc) && (!(Js_fCheck_kc)))
	  {
	    Js_fStalemate = true;
	  }
	 
	  if (Js_fCheck_kc)
	  {
	    sz = "Check+";
	  }
	 
	  if (Js_fMate_kc) sz = "Checkmate!";
	 
	  if (Js_bDraw != 0) sz = "Draw";
	  if (Js_fStalemate) sz = "Stalemate!";
	  if (Js_fAbandon) sz = "resign";
	  if (Js_bDraw == 3)
	  {
	    sz += "At least 3 times repeat-position !";
	  }
	  else if (Js_bDraw == 1)
	  {
	    sz += "Can't checkmate !";
	  }
	 
	  if ((!(Js_fMate_kc)) && (Js_bDraw == 0) && (!(Js_fStalemate)) && (!(Js_fAbandon)))
		 return;

		// when game is finished only, otherwise show status 
	  Js_fInGame = false;

	  if(sz.length>0) MessageOut(sz,true);
	}
	 
	function IRaw(a:int):int
	{
	  return (a >> 3);
	} 
				 			 	
	 
	function CalcKPK(side:int, winner:int, loser:int, king1:int, king2:int, sq:int):int
	{
	  var s = 0;
	  if (Js_piecesCount[winner] == 1)
	    s = 50;
	  else
	    s = 120;
	  var r = 0;
	  if (winner == Js_white)
	  {
	    if (side == loser)
	      r = IRaw(sq) - 1;
	    else
	      r = IRaw(sq);
	    if ((IRaw(king2) >= r) && (IArrow(sq, king2) < 8 - r))
	      s += 10 * IRaw(sq);
	    else
	      s = 500 + 50 * IRaw(sq);
	    if (IRaw(sq) < 6)
	      sq += 16;
	    else if (IRaw(sq) == 6)
	      sq += 8;
	  }
	  else
	  {
	    if (side == loser)
	      r = IRaw(sq) + 1;
	    else
	      r = IRaw(sq);
	    if ((IRaw(king2) <= r) && (IArrow(sq, king2) < r + 1))
	      s += 10 * (7 - IRaw(sq));
	    else
	      s = 500 + 50 * (7 - IRaw(sq));
	    if (IRaw(sq) > 1)
	      sq -= 16;
	    else if (IRaw(sq) == 1) {
	      sq -= 8;
	    }
	  }
	  s += 8 * Js_crossData[(king2 * 64 + sq)] - Js_crossData[(king1 * 64 + sq)];
	  return s;
	}
	 
	function CalcKg(side:int, score:Array):void
	{
	  ChangeForce();
	  var winner = -1;
	  if (Js_matrl[Js_white] > Js_matrl[Js_black])
	    winner = Js_white;
	  else
	    winner = Js_black;
	  var loser = Js_otherTroop[winner];
	  var king1 = Js_pieceMap[winner][0];
	  var king2 = Js_pieceMap[loser][0];
	 
	  var s = 0;
	 
	  if (Js_pmatrl[winner] > 0)
	  {
	    for (var i = 1; i <= Js_piecesCount[winner]; ++i) {
	      s += CalcKPK(side, winner, loser, king1, king2, Js_pieceMap[winner][i]);
	    }
	  }
	  else if (Js_ematrl[winner] == Js_bishopVal + Js_knightVal)
	  {
	    s = CalcKBNK(winner, king1, king2);
	  }
	  else if (Js_ematrl[winner] > Js_bishopVal)
	  {
	    s = 500 + Js_ematrl[winner] - Js_vanish_K[king2] - (2 * IArrow(king1, king2));
	  }
	 
	  if (side == winner)
	    score[0] = s;
	  else
	    score[0] = (s * -1);
	}
	 
	function IArrow( a:int, b:int ):int
	{
	  return Js_arrowData[(a * 64 + b)];
	}
	 
	 
	function MoveTree(to:Array, from:Array):void
	{
	  to[1] = from[1];
	  to[2] = from[2];
	  to[4] = from[4];
	  to[0] = from[0];
	  to[3] = from[3];
	}
	 
	function PrisePassant( xside:int, f:int, t:int, iop:int):void
	{
	  var l = 0;
	  if (t > f)
	    l = t - 8;
	  else
	    l = t + 8;
	  if (iop == 1)
	  {
	    Js_board[l] = Js_empty;
	    Js_color[l] = Js_hollow;
	  }
	  else
	  {
	    Js_board[l] = Js_pawn;
	    Js_color[l] = xside;
	  }
	  InitStatus();
	}
	 
 
	function GetAlgMvt(ch:String):String
	{
	  for( var i= 0; i < 64; i++ )
	  {
	    if (ch == Js_szIdMvt.Substring(i,1))
	    {
	      return Js_szAlgMvt[i];
	    }
	  }
	  return "a1";
	}
	 

	function StrValueOf(m:Array):String
	{
	  var str="";
	  for( var i=0; m.length>i; i++ )
		{
		var s2 = (m[i]).ToString();
		if( s2.length == 0 ) break;
		str+=s2;
		}
	  return str;
	}
	
	 
	function Agression(side:int, a:Array):void
	{
	  for( var i=0; i < 64; i++ )
	  {
	    a[i] = 0;
	    Js_agress[side][i] = 0;
	  }

	 
	  for (i = Js_piecesCount[side]; i >= 0; --i)
	  {
	    var sq = Js_pieceMap[side][i];
	    var piece = Js_board[sq];
	    var c = Js_xlat[piece];
	    var idir = 0;
	    var u = 0;
	    if (Js_heavy[piece] != false)
	    {
	      var ipos = piece * 64 * 64 + sq * 64;
	      idir = ipos;
	 
		  for( u = Js_nextCross[(ipos + sq)] ; ; )
	      {
		a[u] += 1;
		a[u] |= c;
	 
	        Js_agress[side][u] += 1;
	        Js_agress[side][u] |= c;
	 
	        if (Js_color[u] == Js_hollow)
	          u = Js_nextCross[(ipos + u)];
	        else
	          u = Js_nextArrow[(idir + u)];
			  
		  if(u == sq) break;
	      }
	    }
	    else
	    {
	      idir = Js_pieceTyp[side][piece] * 64 * 64 + sq * 64;

		  for( u = Js_nextArrow[(idir + sq)] ; ; )
	      {
		a[u] += 1;
		a[u] |= c;

	 
	        Js_agress[side][u] += 1;
	        Js_agress[side][u] |= c;
	 
	        u = Js_nextArrow[(idir + u)];
			
			if(u == sq) break;
	      }
	    }
	  }
	}
	 	 
	function InitArrow():void
	{
	  for( var a= 0; a < 64; a++ )
	  {
		for( var b= 0; b < 64; b++ )
	    {
	      var d = IColmn(a) - IColmn(b);
	      d = Mathf.Abs(d);
	      var di = IRaw(a) - IRaw(b);
	      di = Mathf.Abs(di);
	 
	      Js_crossData[(a * 64 + b)] = (d + di);
	      if (d > di)
	        Js_arrowData[(a * 64 + b)] = d;
	      else
	        Js_arrowData[(a * 64 + b)] = di;
	    }
	  }
	}
	 
	function IfCheck():void
	{
	  for( var i= 0; i < 64; i++ )
	  {
	    if (Js_board[i] != Js_king)
	      continue;
	    if (Js_color[i] == Js_white)
	    {
	      if (ISqAgrs(i, Js_black) != 0)
	      {
	        Js_fCheck_kc = true;
	        return;
	      }
	    }
	    else
	    {
	      if (ISqAgrs(i, Js_white) == 0)
	        continue;
	      Js_fCheck_kc = true;
	      return;
	    }
	  }
	 
	  Js_fCheck_kc = false;
	}
	 
	function Anyagress(c:int, u:int):int
	{
	  if (Js_agress[c][u] > 0) {
	    return 1;
	  }
	  return 0;
	}
	 
	function KnightPts(sq:int, side:int):int
	{
	  var s = Js_knightMvt[Js_c1][sq];
	  var a2 = Js_agress2[sq] & 0x4FFF;
	  if (a2 > 0)
	  {
	    var a1 = Js_agress1[sq] & 0x4FFF;
	    if ((a1 == 0) || (a2 > Js_xltBN + 1))
	    {
	      s += Js_pinned_p;
	      Js_pinned[Js_c1] += 1;
	      if (FJunk(sq))
	        Js_pinned[Js_c1] += 1;
	    }
	    else if ((a2 >= Js_xltBN) || (a1 < Js_xltP)) {
	      s += Js_agress_across; }
	  }
	  return s;
	}
	 
	function QueenPts(sq:int, side:int):int
	{
	  var s = (IArrow(sq, Js_pieceMap[Js_c2][0]) < 3) ? 12 : 0;
	  if (Js_working > 2)
	    s += 14 - Js_crossData[(sq * 64 + Js_pieceMap[Js_c2][0])];
	  var a2 = Js_agress2[sq] & 0x4FFF;
	  if (a2 > 0)
	  {
	    var a1 = Js_agress1[sq] & 0x4FFF;
	    if ((a1 == 0) || (a2 > Js_xltQ + 1))
	    {
	      s += Js_pinned_p;
	      Js_pinned[Js_c1] += 1;
	      if (FJunk(sq)) Js_pinned[Js_c1] += 1;
	    }
	    else if ((a2 >= Js_xltQ) || (a1 < Js_xltP)) {
	      s += Js_agress_across; }
	  }
	  return s;
	}
	 
	function PositPts(side:int, score:Array):int
	{
	  var pscore:Array = [ 0, 0 ];
	 
	  ChangeForce();
	  var xside = Js_otherTroop[side];
	  pscore[Js_black] = 0;
	  pscore[Js_white] = 0;
	 
	  for (Js_c1 = Js_white; Js_c1 <= Js_black; Js_c1 += 1)
	  {
	    Js_c2 = Js_otherTroop[Js_c1];
	    Js_agress1 = Js_agress[Js_c1];
	    Js_agress2 = Js_agress[Js_c2];
	    Js_pawc1 = Js_pawnMap[Js_c1];
	    Js_pawc2 = Js_pawnMap[Js_c2];
	    for (var i = Js_piecesCount[Js_c1]; i >= 0; --i)
	    {
	      var sq = Js_pieceMap[Js_c1][i];
	      var s = 0;
	      if (Js_board[sq] == Js_pawn)
	        s = PawnPts(sq, side);
	      else if (Js_board[sq] == Js_knight)
	        s = KnightPts(sq, side);
	      else if (Js_board[sq] == Js_bishop)
	        s = BishopPts(sq, side);
	      else if (Js_board[sq] == Js_rook)
	        s = RookPts(sq, side);
	      else if (Js_board[sq] == Js_queen)
	        s = QueenPts(sq, side);
	      else if (Js_board[sq] == Js_king)
	        s = KingPts(sq, side);
	      else
	        s = 0;
	      pscore[Js_c1] += s;
	      Js_scoreOnBoard[sq] = s;
	    }
	  }
	  if (Js_pinned[side] > 1)
	    pscore[side] += Js_pinned_other;
	  if (Js_pinned[xside] > 1) {
	    pscore[xside] += Js_pinned_other;
	  }
	  score[0] = (Js_matrl[side] - Js_matrl[xside] + pscore[side] - pscore[xside] + 10);
	 
	  if ((score[0] > 0) && (Js_pmatrl[side] == 0))
	  {
	    if (Js_ematrl[side] < Js_rookVal)
	      score[0] = 0;
	    else if (score[0] < Js_rookVal)
	      score[0] /= 2;
	  }
	  if ((score[0] < 0) && (Js_pmatrl[xside] == 0))
	  {
	    if (Js_ematrl[xside] < Js_rookVal)
	      score[0] = 0;
	    else if (-score[0] < Js_rookVal) {
	      score[0] /= 2;
	    }
	  }
	  if ((Js_matrl[xside] == Js_kingVal) && (Js_ematrl[side] > Js_bishopVal))
	    score[0] += 200;
	  if ((Js_matrl[side] == Js_kingVal) && (Js_ematrl[xside] > Js_bishopVal))
	    score[0] -= 200;
	}
	 
	function PlayMov():void
	{
	  UpdateDisplay();
	 
	  Js_currentScore = Js_root[4];
	  Js_fSoonMate_kc = false;
	  if ((((Js_root[3] == 0) ? 0 : 1) & ((Js_draw == 0) ? 0 : 1)) != 0)
	  {
	    Js_fGameOver = true;
	  }
	  else if (Js_currentScore == -9999)
	  {
	    Js_fGameOver = true;
	    Js_fMate_kc = true;
	    Js_fUserWin_kc = true;
	  }
	  else if (Js_currentScore == 9998)
	  {
	    Js_fGameOver = true;
	    Js_fMate_kc = true;
	    Js_fUserWin_kc = false;
	  }
	  else if (Js_currentScore < -9000)
	  {
	    Js_fSoonMate_kc = true;
	  }
	  else if (Js_currentScore > 9000)
	  {
	    Js_fSoonMate_kc = true;
	  }
	  ShowScore(Js_currentScore);
	 
	}

	function IRepeat(cnt:int):int
	{
	  var c = 0;
	  cnt = 0;
	  if (Js_nGameMoves > Js_fiftyMoves + 3)
	  {
	    for( var i= 0; i < 64; i++ ) Js_b_r[i] = 0;
	 
	    for (i = Js_nGameMoves; i > Js_fiftyMoves; --i)
	    {
	      var m = Js_movesList[i][0];
	      var f = m >> 8;
	      var t = m & 0xFF;
	      Js_b_r[f] += 1;
	      if (Js_b_r[f] == 0) --c;
	      else ++c;
	      Js_b_r[t] += -1;
	      if (Js_b_r[t] == 0) --c;
	      else ++c;
	      if (c != 0) continue;
	      ++cnt;
	    }
	  }
	 
	  if (cnt == 3) Js_bDraw = 3;
	 
	  return cnt;
	}

	 
	function ChoiceMov(side:int, iop:int):void
	{
	  var tempb = new Array(); _INT(tempb);
	  var tempc = new Array(); _INT(tempc);
	  var tempsf = new Array(); _INT(tempsf);
	  var tempst = new Array(); _INT(tempst);
	  var rpt = new Array(); _INT(rpt);
	  var score = new Array(); _INT(score);
	 
	  var alpha = 0;
	  var beta = 0;
	 
	  Js_flag[1] = false;
	  var xside = Js_otherTroop[side];
	  if (iop != 2)
	    Js_player = side;
	  WatchPosit();
	 
	  PositPts(side, score);
	  
	  var i = 0;
	  if (Js_depth_Seek == 0)
	  {
	    for( i = 0; i < 10000; i++ ) Js_storage[i] = 0;

	    Js_origSquare = -1;
	    Js_destSquare = -1;
	    Js_ptValue = 0;
	    if (iop != 2)
	      Js_hint = 0;
	    for (i = 0; i < Js_maxDepth; ++i)
	    {
	      Js_variants[i] = 0;
	      Js_eliminate0[i] = 0;
	      Js_eliminate1[i] = 0;
	      Js_eliminate2[i] = 0;
	      Js_eliminate3[i] = 0;
	    }
	    alpha = score[0] - Js_N9;
	    beta = score[0] + Js_N9;
	    rpt[0] = 0;
	    Js_treePoint[1] = 0;
	    Js_root = Js_Tree[0];
	    AvailMov(side, 1);
	    for (i = Js_treePoint[1]; i < Js_treePoint[2]; ++i)
	    {
	      Peek(i, Js_treePoint[2] - 1);
	    }
	 
	    Js_cNodes = 0;
	    Js_cCompNodes = 0;
	
	    Js_scoreDither = 0;
	    Js_dxDither = 20;
	  }
	 
	  while ((!Js_flag[1]) && (Js_depth_Seek < Js_maxDepthSeek))
	  {
	    Js_depth_Seek += 1;

	    score[0] = Seek(side, 1, Js_depth_Seek, alpha, beta, Js_variants, rpt);
	    for (i = 1; i <= Js_depth_Seek; ++i)
	    {
	      Js_eliminate0[i] = Js_variants[i];
	    }

	    if ((!Js_flag[1]) && (score[0] < alpha))
	    {
	      score[0] = Seek(side, 1, Js_depth_Seek , -9000, score[0], Js_variants, rpt);
	    }
	    if ((!Js_flag[1]) && (score[0] > beta) && ((Js_root[3] & Js__idem) == 0))
	    {
	      score[0] = Seek(side, 1, Js_depth_Seek, score[0], 9000, Js_variants, rpt);
	    }
	 
	    score[0] = Js_root[4];
		
	    for (i = Js_treePoint[1] + 1; i < Js_treePoint[2]; ++i)
	    {
	      Peek(i, Js_treePoint[2] - 1);
	    }
	 

	 
	    for (i = 1; i <= Js_depth_Seek; ++i)
	    {
	      Js_eliminate0[i] = Js_variants[i];
	    }
	 
	    if ((Js_root[3] & Js__idem) != 0) {
	      Js_flag[1] = true;
	    }
	    if (Js_Tree[1][4] < -9000) {
	      Js_flag[1] = true;
	    }

	    if (!(Js_flag[1]))
	    {
	      Js_scoreTP[0] = score[0];
	      if (Js_scoreDither == 0)
	        Js_scoreDither = score[0];
	      else
	        Js_scoreDither = ((Js_scoreDither + score[0]) / 2);
	    }
	    Js_dxDither = (20 + Mathf.Abs(Js_scoreDither / 12));
	    beta = score[0] + Js__beta;
	    if (Js_scoreDither < score[0])
	      alpha = Js_scoreDither - Js__alpha - Js_dxDither;
	    else {
	      alpha = score[0] - Js__alpha - Js_dxDither;
	    }
	 
	  }
	 
 
	  score[0] = Js_root[4];
	 
	  if (iop == 2) return;
	 
	  Js_hint = Js_variants[2];

	  if ((score[0] == -9999) || (score[0] == 9998))
	  {
	    Js_flag[0] = true;
	    Js_fMate_kc = true;
	  }
	  if ((score[0] > -9999) && (rpt[0] <= 2))
	  {
	    if (score[0] < Js_realBestScore)
	    {
	      var m_f = Js_realBestMove >> 8;
	      var m_t = Js_realBestMove & 0xFF;
	      for( i = 0; i < 2000; i++ )
	      {
	        if ((m_f != Js_Tree[i][1]) || (m_t != Js_Tree[i][2]) || (Js_realBestScore != Js_Tree[i][4]))
	        {
	          continue;
	        }
	 
	        Js_root = Js_Tree[i];
	 
	        break;
	      }
	    }

	    Js_myPiece = Js_rgszPiece[Js_board[Js_root[1]]];
	 
	    ValidateMov(side, Js_root, tempb, tempc, tempsf, tempst, Js_gainScore);
	    if (InChecking(Js_computer))
	    {
	      UnValidateMov(side, Js_root, tempb, tempc, tempsf, tempst);
	      Js_fAbandon = true;
	    }
	    else
	    {
	      Lalgb(Js_root[1], Js_root[2], Js_root[3]);
	      PlayMov();
	    }
	 
	  }
	  else if (Js_bDraw == 0)
	  {
	    Lalgb(0, 0, 0);
	    if (!(Js_flag[0]))
	    {
	      Js_fAbandon = true;

	    }
	    else
	    {
	      Js_fUserWin_kc = true;
	    }
	 
	  }
	 
	  if (Js_flag[0])
	  {
	    Js_hint = 0;
	  }
	  if ((Js_board[Js_root[2]] == Js_pawn) || ((Js_root[3] & Js_capture) != 0) || ((Js_root[3] & Js_castle_msk) != 0))
	  {
	    Js_fiftyMoves = Js_nGameMoves;
	  }
	  Js_movesList[Js_nGameMoves][4] = score[0];
	 
	  if (Js_nGameMoves > 500)
	  {
	    Js_flag[0] = true;
	  }
	  Js_player = xside;
	  Js_depth_Seek = 0;
	}
	 
	function MultiMov(ply:int, sq:int, side:int, xside:int):void
	{
	  var piece = Js_board[sq];
	 
	  var i = Js_pieceTyp[side][piece] * 64 * 64 + sq * 64;
	  var ipos = i;
	  var idir = i;
	  var u = 0;
	  if (piece == Js_pawn)
	  {
	    u = Js_nextCross[(ipos + sq)];
	    if (Js_color[u] == Js_hollow)
	    {
	      AttachMov(ply, sq, u, 0, xside);
	 
	      u = Js_nextCross[(ipos + u)];
	      if (Js_color[u] == Js_hollow) {
	        AttachMov(ply, sq, u, 0, xside);
	      }
	    }
	    u = Js_nextArrow[(idir + sq)];
	    if (Js_color[u] == xside)
	      AttachMov(ply, sq, u, Js_capture, xside);
	    else if (u == Js_indenSqr) {
	      AttachMov(ply, sq, u, Js_capture | Js_enpassant_msk, xside);
	    }
	    u = Js_nextArrow[(idir + u)];
	    if (Js_color[u] == xside)
	      AttachMov(ply, sq, u, Js_capture, xside);
	    else if (u == Js_indenSqr) {
	      AttachMov(ply, sq, u, Js_capture | Js_enpassant_msk, xside);
	    }
	  }
	  else
	  {
	    
	    for( u = Js_nextCross[(ipos + sq)] ; ; )
		{
		 if (Js_color[u] == Js_hollow)
	      {
	        AttachMov(ply, sq, u, 0, xside);
	 
	        u = Js_nextCross[(ipos + u)];
	      }
	      else
	      {
	        if (Js_color[u] == xside) {
	          AttachMov(ply, sq, u, Js_capture, xside);
	        }
	        u = Js_nextArrow[(idir + u)];
	      }
		  if( u==sq ) break;
	    }
	  }
	}
	 	 
	function XRayKg(sq:int, s:Array):void
	{
	  var cnt = 0;
	  var u = 0;
	  var ipos = 0;
	  var idir = 0;
	  if ((Js_withBishop[Js_c2] != 0) || (Js_withQueen[Js_c2] != 0))
	  {
	    ipos = Js_bishop * 64 * 64 + sq * 64;
	    idir = ipos;
	 
	    for( u = Js_nextCross[(ipos + sq)] ; ; )
		{
		 if (((Js_agress2[u] & Js_xltBQ) != 0) && 
	        (Js_color[u] != Js_c2)) {
	        if ((Js_agress1[u] == 0) || ((Js_agress2[u] & 0xFF) > 1))
	          ++cnt;
	        else {
	          s[0] -= 3;
	        }
	      }
	      if (Js_color[u] == Js_hollow)
	        u = Js_nextCross[(ipos + u)];
	      else
	        u = Js_nextArrow[(idir + u)];
			
		  if( u==sq ) break;			
	    }
	  }
	 
	  if ((Js_withRook[Js_c2] != 0) || (Js_withQueen[Js_c2] != 0))
	  {
	    ipos = Js_rook * 64 * 64 + sq * 64;
	    idir = ipos;
	 
	    for( u = Js_nextCross[(ipos + sq)] ; ; )
		{
		  if (((Js_agress2[u] & Js_xltRQ) != 0) && 
	        (Js_color[u] != Js_c2)) {
	        if ((Js_agress1[u] == 0) || ((Js_agress2[u] & 0xFF) > 1))
	          ++cnt;
	        else {
	          s[0] -= 3;
	        }
	      }
	      if (Js_color[u] == Js_hollow)
	        u = Js_nextCross[(ipos + u)];
	      else
	        u = Js_nextArrow[(idir + u)];
			
		  if( u==sq ) break;				
	    }
	  }
	 
	  if (Js_withKnight[Js_c2] != 0)
	  {
	    idir = Js_knight * 64 * 64 + sq * 64;
	 
	    for( u = Js_nextArrow[(idir + sq)] ; ; )
		{
		  if (((Js_agress2[u] & Js_xltNN) != 0) && 
	        (Js_color[u] != Js_c2)) {
	        if ((Js_agress1[u] == 0) || ((Js_agress2[u] & 0xFF) > 1))
	          ++cnt;
	        else
	          s[0] -= 3;
	      }
	      u = Js_nextArrow[(idir + u)];
		  if( u==sq ) break;			  
	    }
	  }
	  s[0] += Js_safe_King * Js_menaceKing[cnt] / 16;
	 
	  cnt = 0;
	  var ok = false;
	  idir = Js_king * 64 * 64 + sq * 64;
	 
	  for( u = Js_nextCross[(idir + sq)] ; ; )
	  {
		if (Js_board[u] == Js_pawn)
	    {
	      ok = true; }
	    if (Js_agress2[u] > Js_agress1[u])
	    {
	      ++cnt;
	      if (((Js_agress2[u] & Js_xltQ) != 0) && 
	        (Js_agress2[u] > Js_xltQ + 1) && (Js_agress1[u] < Js_xltQ)) {
	        s[0] -= 4 * Js_safe_King;
	      }
	    }
	    u = Js_nextCross[(idir + u)];
		if( u==sq ) break;			
	  }
	 
	  if (!(ok))
	    s[0] -= Js_safe_King;
	  if (cnt > 1)
	    s[0] -= Js_safe_King;
	}
	  
	function DoCastle( side:int, kf:int, kt:int, iop:int ):int
	{
	  var xside = Js_otherTroop[side];
	  var rf = 0;
	  var rt = 0;
	  if (kt > kf)
	  {
	    rf = kf + 3;
	    rt = kt - 1;
	  }
	  else
	  {
	    rf = kf - 4;
	    rt = kt + 1;
	  }
	  if (iop == 0)
	  {
	    if ((kf != Js_kingPawn[side]) || (Js_board[kf] != Js_king) || (Js_board[rf] != Js_rook) || (Js_nMvtOnBoard[kf] != 0) || (Js_nMvtOnBoard[rf] != 0) || (Js_color[kt] != Js_hollow) || (Js_color[rt] != Js_hollow) || (Js_color[(kt - 1)] != Js_hollow) || (ISqAgrs(kf, xside) != 0) || (ISqAgrs(kt, xside) != 0) || (ISqAgrs(rt, xside) != 0))
	    {
	      return 0;
	    }
	  }
	  else {
	    if (iop == 1)
	    {
	      Js_roquer[side] = 1;
	      Js_nMvtOnBoard[kf] += 1;
	      Js_nMvtOnBoard[rf] += 1;
	    }
	    else
	    {
	      Js_roquer[side] = 0;
	      Js_nMvtOnBoard[kf] += -1;
	      Js_nMvtOnBoard[rf] += -1;
	      var t0 = kt;
	      kt = kf;
	      kf = t0;
	      t0 = rt;
	      rt = rf;
	      rf = t0;
	    }
	    Js_board[kt] = Js_king;
	    Js_color[kt] = side;
	    Js_pieceIndex[kt] = 0;
	    Js_board[kf] = Js_empty;
	    Js_color[kf] = Js_hollow;
	    Js_board[rt] = Js_rook;
	    Js_color[rt] = side;
	    Js_pieceIndex[rt] = Js_pieceIndex[rf];
	    Js_board[rf] = Js_empty;
	    Js_color[rf] = Js_hollow;
	    Js_pieceMap[side][Js_pieceIndex[kt]] = kt;
	    Js_pieceMap[side][Js_pieceIndex[rt]] = rt;
	  }
	 
	  return 1;
	}
	 
	function DoCalc(side:int, ply:int, alpha:int, beta:int, gainScore:int, slk:Array, InChk:Array):int
	{
  
	  var s = new Array(); _INT(s);
	 		
	  var xside = Js_otherTroop[side];
	  s[0] = (-Js_scorePP[(ply - 1)] + Js_matrl[side] - Js_matrl[xside] - gainScore);
	  Js_pinned[Js_black] = 0;
	  Js_pinned[Js_white] = 0;
	  if (((Js_matrl[Js_white] == Js_kingVal) && (((Js_pmatrl[Js_black] == 0) || (Js_ematrl[Js_black] == 0)))) || (
	    (Js_matrl[Js_black] == Js_kingVal) && (((Js_pmatrl[Js_white] == 0) || (Js_ematrl[Js_white] == 0)))))
	    slk[0] = 1;
	  else
	    slk[0] = 0;
	
	  var evflag =false;
	  
	  if (slk[0] == 0) 
	  {
	    evflag = (ply == 1) || (ply < Js_depth_Seek);
		if( !evflag )
			{
			if(((ply == Js_depth_Seek + 1) || (ply == Js_depth_Seek + 2)))
				{
				if(((s[0] > alpha - Js_dxAlphaBeta) && (s[0] < beta + Js_dxAlphaBeta)) || (
				(ply > Js_depth_Seek + 2) && (s[0] >= alpha - 25) && (s[0] <= beta + 25)))
					{
					evflag = true;
					}
				}
			}
	  }

	  if (evflag)
	  {
	    Js_cCompNodes += 1;
	    Agression(side, Js_agress[side]);
	 
	    if (Anyagress(side, Js_pieceMap[xside][0]) == 1) return (10001 - ply);
	    Agression(xside, Js_agress[xside]);
	 
	    InChk[0] = Anyagress(xside, Js_pieceMap[side][0]);
	    PositPts(side, s);
	  }
	  else
	  {
	    if (ISqAgrs(Js_pieceMap[xside][0], side) != 0)
	      return (10001 - ply);
	    InChk[0] = ISqAgrs(Js_pieceMap[side][0], xside);
	 
	    if (slk[0] != 0)
	    {
	      CalcKg(side, s);
	    }
	  }
	  Js_scorePP[ply] = (s[0] - Js_matrl[side] + Js_matrl[xside]);
	  if (InChk[0] != 0)
	  {
	    if (Js_destSquare == -1) Js_destSquare = Js_root[2];
	    Js_flagCheck[(ply - 1)] = Js_pieceIndex[Js_destSquare];
	  }
	  else {
	    Js_flagCheck[(ply - 1)] = 0; }
	  
	  return s[0];
	}
	 
 
	function Lalgb( f:int, t:int, flag:int):void
	{
	  var i = 0;
	  if (f != t)
	  {
	    Js_asciiMove[0][0] = fromCharCode(97 + IColmn(f));		//(char)
	    Js_asciiMove[0][1] = fromCharCode(49 + IRaw(f));		//(char)
	    Js_asciiMove[0][2] = fromCharCode(97 + IColmn(t));		//(char)
	    Js_asciiMove[0][3] = fromCharCode(49 + IRaw(t));		//(char)
	    Js_asciiMove[0][4] = "";
	    Js_asciiMove[3][0] = "";
	    Js_asciiMove[1][0] = Js_upperNot[Js_board[f]];

	    if (Js_asciiMove[1][0] == "P")
	    {
	      var m3p;
	      if (Js_asciiMove[0][0] == Js_asciiMove[0][2])
	      {
	        Js_asciiMove[1][0] = Js_asciiMove[0][2];
	        Js_asciiMove[2][0] = Js_asciiMove[1][0];
			Js_asciiMove[1][1] = Js_asciiMove[0][3];
	        Js_asciiMove[2][1] = Js_asciiMove[1][1];
	        m3p = 2;
	      }
	      else
	      {
			Js_asciiMove[1][0] = Js_asciiMove[0][0];
	        Js_asciiMove[2][0] = Js_asciiMove[1][0];
			Js_asciiMove[1][1] = Js_asciiMove[0][2];
	        Js_asciiMove[2][1] = Js_asciiMove[1][1];
	        Js_asciiMove[2][2] = Js_asciiMove[0][3];
	        m3p = 3;
	      }
	      Js_asciiMove[1][2] = System.Convert.ToChar(0);
	      Js_asciiMove[2][m3p]  = "";
	      if ((flag & Js_promote) != 0)
	      {
			Js_asciiMove[1][2] = Js_lowerNot[(flag & Js_pawn_msk)];
			Js_asciiMove[2][m3p] = Js_asciiMove[1][2];
	        Js_asciiMove[0][4] = Js_asciiMove[1][2];
			Js_asciiMove[0][5] = "";
			Js_asciiMove[2][(m3p + 1)] = "";
	        Js_asciiMove[1][3] = "";
	      }
	 
	    }
	    else
	    {
	      Js_asciiMove[2][0] = Js_asciiMove[1][0];
	      Js_asciiMove[2][1] = Js_asciiMove[0][1];
	      Js_asciiMove[1][1] = Js_asciiMove[0][2];
	      Js_asciiMove[2][2] = Js_asciiMove[1][1];
	      Js_asciiMove[1][2] = Js_asciiMove[0][3];
	      Js_asciiMove[2][3] = Js_asciiMove[1][2];
	      Js_asciiMove[1][3] = "";
	      Js_asciiMove[2][4] = "";

	      for( i=0; i<6; i++ ) Js_asciiMove[3][i] = Js_asciiMove[2][i];
	 
	      Js_asciiMove[3][1] = Js_asciiMove[0][0];
	      if ((flag & Js_castle_msk) != 0)
	      {
	        if (t > f)
	        {
	          Js_asciiMove[1][0] = fromCharCode(111);
	          Js_asciiMove[1][1] = fromCharCode(45);
	          Js_asciiMove[1][2] = fromCharCode(111);
	          Js_asciiMove[1][3] = "";
	 
	          Js_asciiMove[2][0] = fromCharCode(111);
	          Js_asciiMove[2][1] = fromCharCode(45);
	          Js_asciiMove[2][2] = fromCharCode(111);
	          Js_asciiMove[2][3] = "";
	        }
	        else
	        {
	          Js_asciiMove[1][0] = fromCharCode(111);
	          Js_asciiMove[1][1] = fromCharCode(45);
	          Js_asciiMove[1][2] = fromCharCode(111);
	          Js_asciiMove[1][3] = fromCharCode(45);
	          Js_asciiMove[1][4] = fromCharCode(111);
	          Js_asciiMove[1][5] = "";
	 
	          Js_asciiMove[2][0] = fromCharCode(111);
	          Js_asciiMove[2][1] = fromCharCode(45);
	          Js_asciiMove[2][2] = fromCharCode(111);
	          Js_asciiMove[2][3] = fromCharCode(45);
	          Js_asciiMove[2][4] = fromCharCode(111);
	          Js_asciiMove[2][5] = "";
	        }
	      }
	    }
	  }
	  else
	  {
	    for( i = 0; i < 4; i++ ) Js_asciiMove[i][0] = "";
	  }
	}
	 
	function UpdatePiecMap(side:int, sq:int, iop:int):void
	{
	  if (iop == 1)
	  {
	    Js_piecesCount[side] += -1;
	    for (var i = Js_pieceIndex[sq]; i <= Js_piecesCount[side]; ++i)
	    {
	      Js_pieceMap[side][i] = Js_pieceMap[side][(i + 1)];
	      Js_pieceIndex[Js_pieceMap[side][i]] = i;
	    }
	  }
	  else
	  {
	    Js_piecesCount[side] += 1;
	    Js_pieceMap[side][Js_piecesCount[side]] = sq;
	    Js_pieceIndex[sq] = Js_piecesCount[side];
	  }
	}
	 

	function UpdateDisplay():void
	{
				   
	  var BB = new Array();	// 8x8
	  var iCol = 0;
	  var iLine = 0;

	  for( var i= 0; i<8; i++ ) BB[i] = new Array();

	  for( i = 0; i < 64; i++ )
	  {
	    iCol = i % 8;
	    iLine = (i-iCol) / 8;
	    BB[iLine][iCol] = (Js_color[i]==Js_black ? Js_lowerNot[ Js_board[i] ] : Js_upperNot[ Js_board[i] ] );
	  }
	
	  var PP="<div><table>";
	  
	  for(iLine = 7; iLine >= 0; iLine--) {
	    PP+="<tr>";
	    for( iCol = 0; iCol < 8; iCol++ ) {
	        PP+="<td>."+BB[iLine][iCol]+".</td>";
	    }
	    PP+="</tr>";
	  }
	  PP+="</table></div>";
	  //document.getElementById("jst_posit").innerHTML=PP;
	
	 
	}
	  
	function AvailCaptur(side:int, ply:int):void
	{
	  var xside = Js_otherTroop[side];
	  Js_treePoint[(ply + 1)] = Js_treePoint[ply];
	  var node = Js_Tree[Js_treePoint[ply]];		//_BTREE

	  var inext = Js_treePoint[ply] + 1;
	  var r7 = Js_raw7[side];
	 
	  var ipl = side;
	  for (var i = 0; i <= Js_piecesCount[side]; ++i)
	  {
	    var sq = Js_pieceMap[side][i];
	    var piece = Js_board[sq];
	    var ipos = 0;
	    var idir = 0;
	    var u = 0;
	    if (Js_heavy[piece] != false)
	    {
	      ipos = piece * 64 * 64 + sq * 64;
	      idir = ipos;
	 
	      for( u = Js_nextCross[(ipos + sq)] ; ; )
		  {
	       if (Js_color[u] == Js_hollow)
	        {
	          u = Js_nextCross[(ipos + u)];
	        }
	        else {
	          if (Js_color[u] == xside)
	          {
	            node[1] = sq;
	            node[2] = u;
	            node[0] = 0;
	            node[3] = Js_capture;
	            node[4] = (Js_valueMap[Js_board[u]] + Js_scoreOnBoard[Js_board[u]] - piece);
	            node = Js_Tree[(inext++)];
	            Js_treePoint[(ply + 1)] += 1;
	          }
	 
	          u = Js_nextArrow[(idir + u)];
	        }
			if(u==sq) break;
		  }
	    }
	    else
	    {
	      idir = Js_pieceTyp[side][piece] * 64 * 64 + sq * 64;
	      if ((piece == Js_pawn) && (IRaw(sq) == r7))
	      {
	        u = Js_nextArrow[(idir + sq)];
	        if (Js_color[u] == xside)
	        {
	          node[1] = sq;
	          node[2] = u;
	          node[0] = 0;
	          node[3] = (Js_capture | Js_promote | Js_queen);
	          node[4] = Js_queenVal;
	          node = Js_Tree[(inext++)];
	          Js_treePoint[(ply + 1)] += 1;
	        }
	 
	        u = Js_nextArrow[(idir + u)];
	        if (Js_color[u] == xside)
	        {
	          node[1] = sq;
	          node[2] = u;
	          node[0] = 0;
	          node[3] = (Js_capture | Js_promote | Js_queen);
	          node[4] = Js_queenVal;
	          node = Js_Tree[(inext++)];
	          Js_treePoint[(ply + 1)] += 1;
	        }
	 
	        ipos = Js_pieceTyp[side][piece] * 64 * 64 + sq * 64;
	 
	        u = Js_nextCross[(ipos + sq)];
	        if (Js_color[u] == Js_hollow)
	        {
	          node[1] = sq;
	          node[2] = u;
	          node[0] = 0;
	          node[3] = (Js_promote | Js_queen);
	          node[4] = Js_queenVal;
	          node = Js_Tree[(inext++)];
	          Js_treePoint[(ply + 1)] += 1;
	        }
	 
	      }
	      else
	      {
	        for( u = Js_nextArrow[(idir + sq)] ; ; )
	        {
			 if (Js_color[u] == xside)
	          {
	            node[1] = sq;
	            node[2] = u;
	            node[0] = 0;
	            node[3] = Js_capture;
	            node[4] = (Js_valueMap[Js_board[u]] + Js_scoreOnBoard[Js_board[u]] - piece);
	            node = Js_Tree[(inext++)];
	            Js_treePoint[(ply + 1)] += 1;
	          }
	 
	          u = Js_nextArrow[(idir + u)];
			  if( u==sq ) break;
	        }
	      }
	    }
	  }
	}
	 
	function InitStatus():void
	{
	  Js_indenSqr = -1;
	  for( var i= 0; i < 8; i++ )
	  {
	    Js_pawnMap[Js_white][i] = 0;
	    Js_pawnMap[Js_black][i] = 0;
	  }

	  Js_pmatrl[Js_black] = 0;
	  Js_pmatrl[Js_white] = 0;
	  Js_matrl[Js_black] = 0;
	  Js_matrl[Js_white] = 0;
	  Js_piecesCount[Js_black] = 0;
	  Js_piecesCount[Js_white] = 0;
	 
	  for( var sq= 0; sq < 64; sq++)
	  {
	    if (Js_color[sq] == Js_hollow)
	      continue;
	    Js_matrl[Js_color[sq]] += Js_valueMap[Js_board[sq]];
	    if (Js_board[sq] == Js_pawn)
	    {
	      Js_pmatrl[Js_color[sq]] += Js_pawnVal;
	      Js_pawnMap[Js_color[sq]][IColmn(sq)] += 1;
	    }
	    if (Js_board[sq] == Js_king)
	      Js_pieceIndex[sq] = 0;
	    else
	      {
	      Js_piecesCount[Js_color[sq]] += 1;
	      Js_pieceIndex[sq] = Js_piecesCount[Js_color[sq]];
	      }
	    Js_pieceMap[Js_color[sq]][Js_pieceIndex[sq]] = sq;
	 
	  }
	}
	 
	function MessageOut(msg:String, fNL:boolean):void
	{
	//GetComponent("TextMesh").text += msg + "," ;
	//Debug.Log ( msg+((fNL) ? "" : "") );
	//+newline option
	}
	 
	function Pagress(c:int, u:int):boolean
	{
	  return (Js_agress[c][u] > Js_xltP);
	}
	 
	function CheckMatrl():boolean
	{
	  var flag = true;
	  
	  var nP=0;
	  var nK=0;
	  var nB=0;
	  var nR=0;
	  var nQ=0;
	
	  
	  var nK1=0;
	  var nK2=0;
	  var nB1=0;
	  var nB2=0;
				   
	  for( var i= 0; i < 64; i++ )
	  {
	    if (Js_board[i] == Js_pawn) {
	      ++nP;
	    } else if (Js_board[i] == Js_queen) {
	      ++nQ;
	    } else if (Js_board[i] == Js_rook) {
	      ++nR;
	    } else if (Js_board[i] == Js_bishop)
	    {
	      if (Js_color[i] == Js_white)
	        ++nB1;
	      else
	        ++nB2;
	    } else {
	      if (Js_board[i] != Js_knight)
	        continue;
	      if (Js_color[i] == Js_white)
	        ++nK1;
	      else
	        ++nK2;
	    }
	  }
	 
	  if (nP != 0) return true;
	  if ((nQ != 0) || (nR != 0)) return true;
	 
	  nK = nK1 + nK2;
	  nB = nB1 + nB2;
	 
	  if ((nK == 0) && (nB == 0)) return false;
	  if ((nK == 1) && (nB == 0)) return false;
	  return ((nK != 0) || (nB != 1));
	}
	 
	function AttachMov(ply:int, f:int, t:int, flag:int, xside:int):void
	{
	  
	  var node = Js_Tree[Js_treePoint[(ply + 1)]];	//_BTREE

	  var inext = Js_treePoint[(ply + 1)] + 1;
	 
	  var mv = f << 8 | t;
	  var s = 0;
	  if (mv == Js_scoreWin0)
	    s = 2000;
	  else if (mv == Js_scoreWin1)
	    s = 60;
	  else if (mv == Js_scoreWin2)
	    s = 50;
	  else if (mv == Js_scoreWin3)
	    s = 40;
	  else if (mv == Js_scoreWin4)
	    s = 30;
	  var z = f << 6 | t;
	  if (xside == Js_white)
	    z |= 4096;

	  s += Js_storage[z];

	  if (Js_color[t] != Js_hollow)
	  {
	    if (t == Js_destSquare)
	      s += 500;
	    s += Js_valueMap[Js_board[t]] - Js_board[f];
	  }
	  if (Js_board[f] == Js_pawn)
	  {
	    if ((IRaw(t) == 0) || (IRaw(t) == 7))
	    {
	      flag |= Js_promote;
	      s += 800;
	 
	      node[1] = f;
	      node[2] = t;
	      node[0] = 0;
	      node[3] = (flag | Js_queen);
	      node[4] = (s - 20000);
	      node = Js_Tree[(inext++)];
	      Js_treePoint[(ply + 1)] += 1;
	 
	      s -= 200;
	 
	      node[1] = f;
	      node[2] = t;
	      node[0] = 0;
	      node[3] = (flag | Js_knight);
	      node[4] = (s - 20000);
	      node = Js_Tree[(inext++)];
	      Js_treePoint[(ply + 1)] += 1;
	 
	      s -= 50;
	 
	      node[1] = f;
	      node[2] = t;
	      node[0] = 0;
	      node[3] = (flag | Js_rook);
	      node[4] = (s - 20000);
	      node = Js_Tree[(inext++)];
	      Js_treePoint[(ply + 1)] += 1;
	 
	      flag |= Js_bishop;
	      s -= 50;
	    }
	    else if ((IRaw(t) == 1) || (IRaw(t) == 6))
	    {
	      flag |= Js_menace_pawn;
	      s += 600;
	    }
	  }
	 
	  node[1] = f;
	  node[2] = t;
	  node[0] = 0;
	  node[3] = flag;
	  node[4] = (s - 20000);
	  node = Js_Tree[(inext++)];
	  Js_treePoint[(ply + 1)] += 1;
	}
	 
	 
	function PawnPts(sq:int, side:int):int
	{
	  var a1 = Js_agress1[sq] & 0x4FFF;
	  var a2 = Js_agress2[sq] & 0x4FFF;
	  var rank = IRaw(sq);
	  var fyle = IColmn(sq);
	  var s = 0;
	  var r = 0;
	  var in_square = false;
	  var e = 0;
	  var j = 0;
	  if (Js_c1 == Js_white)
	  {
	    s = Js_wPawnMvt[sq];
	    if (((sq == 11) && (Js_color[19] != Js_hollow)) || (
	      (sq == 12) && (Js_color[20] != Js_hollow)))
	      s += Js_junk_pawn;
	    if ((((fyle == 0) || (Js_pawc1[(fyle - 1)] == 0))) && ((
	      (fyle == 7) || (Js_pawc1[(fyle + 1)] == 0))))
	      s += Js_isol_pawn[fyle];
	    else if (Js_pawc1[fyle] > 1)
	      s += Js_doubled_pawn;
	    if ((a1 < Js_xltP) && (Js_agress1[(sq + 8)] < Js_xltP))
	    {
	      s += Js_takeBack[(a2 & 0xFF)];
	      if (Js_pawc2[fyle] == 0)
	        s += Js_bad_pawn;
	      if (Js_color[(sq + 8)] != Js_hollow) {
	        s += Js_stopped_pawn;
	      }
	    }
	    if (Js_pawc2[fyle] == 0)
	    {
	      if (side == Js_black)
	        r = rank - 1;
	      else
	        r = rank;
	      in_square = (IRaw(Js_pieceMap[Js_black][0]) >= r) && (IArrow(sq, Js_pieceMap[Js_black][0]) < 8 - r);
	 
	      if ((a2 == 0) || (side == Js_white))
	        e = 0;
	      else
	        e = 1;
	      for (j = sq + 8; j < 64; j += 8) {
	        if (Js_agress2[j] >= Js_xltP)
	        {
	          e = 2;
	          break;
	        }
	        if ((Js_agress2[j] > 0) || (Js_color[j] != Js_hollow))
	          e = 1;
	      }
	      if (e == 2)
	        s += Js_working * Js_pss_pawn3[rank] / 10;
	      else if ((in_square) || (e == 1))
	        s += Js_working * Js_pss_pawn2[rank] / 10;
	      else if (Js_ematrl[Js_black] > 0)
	        s += Js_working * Js_pss_pawn1[rank] / 10;
	      else
	        s += Js_pss_pawn0[rank];
	    }
	  }
	  else if (Js_c1 == Js_black)
	  {
	    s = Js_bPawnMvt[sq];
	    if (((sq == 51) && (Js_color[43] != Js_hollow)) || (
	      (sq == 52) && (Js_color[44] != Js_hollow))) {
	      s += Js_junk_pawn;
	    }
	    if ((((fyle == 0) || (Js_pawc1[(fyle - 1)] == 0))) && ((
	      (fyle == 7) || (Js_pawc1[(fyle + 1)] == 0))))
	      s += Js_isol_pawn[fyle];
	    else if (Js_pawc1[fyle] > 1) {
	      s += Js_doubled_pawn;
	    }
	    if ((a1 < Js_xltP) && (Js_agress1[(sq - 8)] < Js_xltP))
	    {
	      s += Js_takeBack[(a2 & 0xFF)];
	      if (Js_pawc2[fyle] == 0)
	        s += Js_bad_pawn;
	      if (Js_color[(sq - 8)] != Js_hollow)
	        s += Js_stopped_pawn;
	    }
	    if (Js_pawc2[fyle] == 0)
	    {
	      if (side == Js_white)
	        r = rank + 1;
	      else
	        r = rank;
	      in_square = (IRaw(Js_pieceMap[Js_white][0]) <= r) && (IArrow(sq, Js_pieceMap[Js_white][0]) < r + 1);
	 
	      if ((a2 == 0) || (side == Js_black))
	        e = 0;
	      else
	        e = 1;
	      for (j = sq - 8; j >= 0; j -= 8) {
	        if (Js_agress2[j] >= Js_xltP)
	        {
	          e = 2;
	          break;
	        }
	        if ((Js_agress2[j] <= 0) && (Js_color[j] == Js_hollow))
	          continue;
	        e = 1;
	      }
	 
	      if (e == 2)
	        s += Js_working * Js_pss_pawn3[(7 - rank)] / 10;
	      else if ((in_square) || (e == 1))
	        s += Js_working * Js_pss_pawn2[(7 - rank)] / 10;
	      else if (Js_ematrl[Js_white] > 0)
	        s += Js_working * Js_pss_pawn1[(7 - rank)] / 10;
	      else
	        s += Js_pss_pawn0[(7 - rank)];
	    }
	  }
	  if (a2 > 0)
	  {
	    if ((a1 == 0) || (a2 > Js_xltP + 1))
	    {
	      s += Js_pinned_p;
	      Js_pinned[Js_c1] += 1;
	      if (FJunk(sq)) Js_pinned[Js_c1] += 1;
	    }
	    else if (a2 > a1) {
	      s += Js_agress_across; }
	  }
	  return s;
	}
	 
	function RookPts(sq:int, side:int):int
	{
	  var s = new Array(); _INT(s);
	  var mob = new Array(); _INT(mob);
	 
	  s[0] = Js_rookPlus;
	  XRayBR(sq, s, mob);
	  s[0] += Js_mobRook[mob[0]];
	  var fyle = IColmn(sq);
	  if (Js_pawc1[fyle] == 0)
	    s[0] += Js_semiOpen_rook;
	  if (Js_pawc2[fyle] == 0)
	    s[0] += Js_semiOpen_rookOther;
	  if ((Js_pmatrl[Js_c2] > 100) && (IRaw(sq) == Js_raw7[Js_c1]))
	    s[0] += 10;
	  if (Js_working > 2)
	    s[0] += 14 - Js_crossData[(sq * 64 + Js_pieceMap[Js_c2][0])];
	  var a2 = Js_agress2[sq] & 0x4FFF;
	  if (a2 > 0)
	  {
	    var a1 = Js_agress1[sq] & 0x4FFF;
	    if ((a1 == 0) || (a2 > Js_xltR + 1))
	    {
	      s[0] += Js_pinned_p;
	      Js_pinned[Js_c1] += 1;
	      if (FJunk(sq)) Js_pinned[Js_c1] += 1;
	    }
	    else if ((a2 >= Js_xltR) || (a1 < Js_xltP)) {
	      s[0] += Js_agress_across; }
	  }
	  return s[0];
	}
	 
	function KingPts(sq:int, side:int):int
	{
	  var s = new Array(); _INT(s);
	 
	  s[0] = Js_kingMvt[Js_c1][sq];
	  if ((Js_safe_King > 0) && ((
	    (Js_fDevl[Js_c2] != 0) || (Js_working > 0))))
	  {
	    XRayKg(sq, s);
	  }
	  if (Js_roquer[Js_c1] != 0)
	    s[0] += Js_castle_K;
	  else if (Js_nMvtOnBoard[Js_kingPawn[Js_c1]] != 0) {
	    s[0] += Js_moveAcross_K;
	  }
	  var fyle = IColmn(sq);
	  if (Js_pawc1[fyle] == 0)
	    s[0] += Js_semiOpen_king;
	  if (Js_pawc2[fyle] == 0) {
	    s[0] += Js_semiOpen_kingOther;
	  }
	  switch (fyle)
	  {
	  case 5:
	    if (Js_pawc1[7] == 0)
	    {
	      s[0] += Js_semiOpen_king; }
	    if (Js_pawc2[7] == 0)
	      s[0] += Js_semiOpen_kingOther;
	  case 0:
	  case 4:
	  case 6:
	    if (Js_pawc1[(fyle + 1)] == 0)
	    {
	      s[0] += Js_semiOpen_king; }
	    if (Js_pawc2[(fyle + 1)] == 0)
	      s[0] += Js_semiOpen_kingOther;
	    break;
	  case 2:
	    if (Js_pawc1[0] == 0)
	    {
	      s[0] += Js_semiOpen_king; }
	    if (Js_pawc2[0] == 0)
	      s[0] += Js_semiOpen_kingOther;
	  case 1:
	  case 3:
	  case 7:
	    if (Js_pawc1[(fyle - 1)] == 0)
	    {
	      s[0] += Js_semiOpen_king; }
	    if (Js_pawc2[(fyle - 1)] == 0)
	      s[0] += Js_semiOpen_kingOther;
	    break;
	  }
	 
	  var a2 = Js_agress2[sq] & 0x4FFF;
	  if (a2 > 0)
	  {
	    var a1 = Js_agress1[sq] & 0x4FFF;
	    if ((a1 == 0) || (a2 > Js_xltK + 1))
	    {
	      s[0] += Js_pinned_p;
	      Js_pinned[Js_c1] += 1;
	    }
	    else {
	      s[0] += Js_agress_across; }
	  }
	  return s[0];
	}
	 
	function AvailMov(side:int, ply:int):void
	{
	  var xside = Js_otherTroop[side];
	  Js_treePoint[(ply + 1)] = Js_treePoint[ply];
	  if (Js_ptValue == 0)
	    Js_scoreWin0 = Js_eliminate0[ply];
	  else
	    Js_scoreWin0 = Js_ptValue;
	  Js_scoreWin1 = Js_eliminate1[ply];
	  Js_scoreWin2 = Js_eliminate2[ply];
	  Js_scoreWin3 = Js_eliminate3[ply];
	  if (ply > 2)
	    Js_scoreWin4 = Js_eliminate1[(ply - 2)];
	  else
	    Js_scoreWin4 = 0;
	  for (var i = Js_piecesCount[side]; i >= 0; --i)
	  {
	    var square = Js_pieceMap[side][i];
	    MultiMov(ply, square, side, xside);
	  }
	  if (Js_roquer[side] != 0)
	    return;
	  var f = Js_pieceMap[side][0];
	  if (DoCastle(side, f, f + 2, 0) != 0)
	  {
	    AttachMov(ply, f, f + 2, Js_castle_msk, xside);
	  }
	  if (DoCastle(side, f, f - 2, 0) == 0)
	    return;
	  AttachMov(ply, f, f - 2, Js_castle_msk, xside);
	}
	 
	function BishopPts(sq:int, side:int):int
	{
	  var s = new Array(); _INT(s);
	  var mob = new Array(); _INT(mob);
	 
	  s[0] = Js_bishopMvt[Js_c1][sq];
	  XRayBR(sq, s, mob);
	  s[0] += Js_mobBishop[mob[0]];
	  var a2 = Js_agress2[sq] & 0x4FFF;
	  if (a2 > 0)
	  {
	    var a1 = Js_agress1[sq] & 0x4FFF;
	    if ((a1 == 0) || (a2 > Js_xltBN + 1))
	    {
	      s[0] += Js_pinned_p;
	      Js_pinned[Js_c1] += 1;
	      if (FJunk(sq)) Js_pinned[Js_c1] += 1;
	    }
	    else if ((a2 >= Js_xltBN) || (a1 < Js_xltP)) {
	      s[0] += Js_agress_across; }
	  }
	  return s[0];
	}
	 
	function ValidateMov(side:int, node:Array, tempb:Array, tempc:Array, tempsf:Array, tempst:Array, gainScore:Array):void
	{
	  var xside= Js_otherTroop[side];
	  Js_nGameMoves += 1;
	  var f = node[1];
	  var t = node[2];
	  Js_indenSqr = -1;
	  Js_origSquare = f;
	  Js_destSquare = t;
	  gainScore[0] = 0;
	  Js_movesList[Js_nGameMoves][0] = (f << 8 | t);
	  if ((node[3] & Js_castle_msk) != 0)
	  {
	    Js_movesList[Js_nGameMoves][1] = Js_empty;
	    Js_movesList[Js_nGameMoves][2] = side;
	    DoCastle(side, f, t, 1);
	  }
	  else
	  {

	    tempc[0] = Js_color[t];
	    tempb[0] = Js_board[t];
	    tempsf[0] = Js_scoreOnBoard[f];
	    tempst[0] = Js_scoreOnBoard[t];
	    Js_movesList[Js_nGameMoves][1] = tempb[0];
	    Js_movesList[Js_nGameMoves][2] = tempc[0];
	    if (tempc[0] != Js_hollow)
	    {
	      UpdatePiecMap(tempc[0], t, 1);
	      if (tempb[0] == Js_pawn)
	        Js_pawnMap[tempc[0]][IColmn(t)] += -1;
	      if (Js_board[f] == Js_pawn)
	      {
	        Js_pawnMap[side][IColmn(f)] += -1;
	        Js_pawnMap[side][IColmn(t)] += 1;
	        var cf = IColmn(f);
	        var ct = IColmn(t);
	        if (Js_pawnMap[side][ct] > 1 + Js_pawnMap[side][cf])
	          gainScore[0] -= 15;
	        else if (Js_pawnMap[side][ct] < 1 + Js_pawnMap[side][cf])
	          gainScore[0] += 15;
	        else if ((ct == 0) || (ct == 7) || (Js_pawnMap[side][(ct + ct - cf)] == 0))
	          gainScore[0] -= 15;
	      }
	      Js_matrl[xside] -= Js_valueMap[tempb[0]];
	      if (tempb[0] == Js_pawn) {
	        Js_pmatrl[xside] -= Js_pawnVal;
	      }
	 
	      gainScore[0] += tempst[0];
	      Js_nMvtOnBoard[t] += 1;
	    }
	    Js_color[t] = Js_color[f];
	    Js_board[t] = Js_board[f];
	    Js_scoreOnBoard[t] = Js_scoreOnBoard[f];
	    Js_pieceIndex[t] = Js_pieceIndex[f];
	    Js_pieceMap[side][Js_pieceIndex[t]] = t;
	    Js_color[f] = Js_hollow;
	    Js_board[f] = Js_empty;
	    if (Js_board[t] == Js_pawn)
	      if (t - f == 16)
	        Js_indenSqr = (f + 8);
	      else if (f - t == 16)
	        Js_indenSqr = (f - 8);
	    if ((node[3] & Js_promote) != 0)
	    {
	      if (Js_proPiece != 0)
	        Js_board[t] = Js_proPiece;
	      else
	        Js_board[t] = (node[3] & Js_pawn_msk);
	      if (Js_board[t] == Js_queen)
	        Js_withQueen[side] += 1;
	      else if (Js_board[t] == Js_rook)
	        Js_withRook[side] += 1;
	      else if (Js_board[t] == Js_bishop)
	        Js_withBishop[side] += 1;
	      else if (Js_board[t] == Js_knight)
	        Js_withKnight[side] += 1;
	      Js_pawnMap[side][IColmn(t)] += -1;
	      Js_matrl[side] += Js_valueMap[Js_board[t]] - Js_pawnVal;
	      Js_pmatrl[side] -= Js_pawnVal;
	 
	      gainScore[0] -= tempsf[0];
	    }
	    if ((node[3] & Js_enpassant_msk) != 0) {
	      PrisePassant(xside, f, t, 1);
	    }
	 
	    Js_nMvtOnBoard[f] += 1;
	  }
	}
	 
	function Peek(p1:int, p2:int):void
	{
	  var s0 = Js_Tree[p1][4];
	  var p0 = p1;
	  for (var p = p1 + 1; p <= p2; ++p)
	  {
	    var s = Js_Tree[p][4];
	    if (s <= s0)
	      continue;
	    s0 = s;
	    p0 = p;
	  }
	 
	  if (p0 == p1)
	  {
	    return;
	  }
	 
	  MoveTree(Js_tmpTree, Js_Tree[p1]);
	  MoveTree(Js_Tree[p1], Js_Tree[p0]);
	  MoveTree(Js_Tree[p0], Js_tmpTree);
	}
	 
	function Seek(side:int, ply:int, depth1:int, alpha:int, beta:int, bstline:Array, rpt:Array):int
	{
				// Timeout for node-count
	  if (Js_cNodes > Js_TONodes) {
	      Js_flag[1] = true;
	  }
	  
	  if (ply>1 && Js_flag[1])
	    {
	      return (-Js_scoreTP[(ply - 1)]);
	    }
	
	  var tempb = new Array(); _INT(tempb);
	  var tempc = new Array(); _INT(tempc);
	  var tempsf = new Array(); _INT(tempsf);
	  var tempst = new Array(); _INT(tempst);
	  var rcnt = new Array(); _INT(rcnt);

	  var slk = new Array(); _INT(slk);
	  var InChk = new Array(); _INT(InChk);
	  
	  var nxtline = new Array();		// new int[Js_maxDepth];
	  for( var q=0; q<bstline.length; q++ ) nxtline[q]=bstline[q];
	  
	  var node = new Array(); _BTREE(node);
	 
	  Js_cNodes += 1;
	  var xside = Js_otherTroop[side];

	  if (ply <= Js_depth_Seek + 3)
		{
		rpt[0] = IRepeat(rpt[0]);
		}
	  else
		{
		rpt[0] = 0;
		}
	 
	  if ((rpt[0] == 1) && (ply > 1))
	  {
	    if (Js_nMovesMade <= 11) {
	      return 100;
	    }
	    return 0;
	  }
	  
	  var score3 = DoCalc(side, ply, alpha, beta, Js_gainScore[0], slk, InChk);
	  if (score3 > 9000)
	  {
	    bstline[ply] = 0;
	 
	    return score3;
	  }
	 
	  if (depth1 > 0)
	  {
	    if (InChk[0] != 0)
	    {
	      depth1 = (depth1 < 2) ? 2 : depth1;
	    }
	    else if ((Js_menacePawn[(ply - 1)] != 0) || (
	      (Js_flag[2]) && (score3 > alpha) && (score3 < beta) && (ply > 2) && (Js_flagEat[(ply - 1)] != 0) && (Js_flagEat[(ply - 2)] != 0)))
	    {
	      ++depth1;
	    }
	 
	  }
	  else if ((score3 >= alpha) && ((
	    (InChk[0] != 0) || (Js_menacePawn[(ply - 1)] != 0) || (
	    (Js_pinned[side] > 1) && (ply == Js_depth_Seek + 1)))))
	  {
	    ++depth1;
	  }
	  else if ((score3 <= beta) && 
	    (ply < Js_depth_Seek + 4) && (ply > 4) && (Js_flagCheck[(ply - 2)] != 0) && (Js_flagCheck[(ply - 4)] != 0) && (Js_flagCheck[(ply - 2)] != Js_flagCheck[(ply - 4)]))
	  {
	    ++depth1;
	  }
	  var d = 0;
	  if (Js_depth_Seek == 1)
	    d = 7;
	  else
	    d = 11;
	  if ((ply > Js_depth_Seek + d) || ((depth1 < 1) && (score3 > beta)))
	  {
	    return score3;
	  }
	 
	  if (ply > 1) {
	    if (depth1 > 0)
	      AvailMov(side, ply);
	    else
	      AvailCaptur(side, ply);
	  }
	  if (Js_treePoint[ply] == Js_treePoint[(ply + 1)])
	  {
	    return score3;
	  }
	  var cf = 0;
	  if ((depth1 < 1) && (ply > Js_depth_Seek + 1) && (Js_flagCheck[(ply - 2)] == 0) && (slk[0] == 0))
	  {
	    cf = 1;
	  }
	  else cf = 0;
	  var best = 0;
	  if (depth1 > 0)
	    best = -12000;
	  else {
	    best = score3;
	  }
	  if (best > alpha)
	    alpha = best;
	  var pbst = Js_treePoint[ply];
	  var pnt = pbst;
	  var j = 0;
	  var mv = 0;
	  while ((pnt < Js_treePoint[(ply + 1)]) && (best <= beta))
	  {
	    if (ply > 1) Peek(pnt, Js_treePoint[(ply + 1)] - 1);
	 

	    node = Js_Tree[pnt];		//_BTREE

	    mv = node[1] << 8 | node[2];
	    nxtline[(ply + 1)] = 0;
	 
	    if ((cf != 0) && (score3 + node[4] < alpha))
	    {
	      break;
	    }
	 
	    if ((node[3] & Js__idem) == 0)
	    {
	      ValidateMov(side, node, tempb, tempc, tempsf, tempst, Js_gainScore);
	      Js_flagEat[ply] = (node[3] & Js_capture);
	      Js_menacePawn[ply] = (node[3] & Js_menace_pawn);
	      Js_scoreTP[ply] = node[4];
	      Js_ptValue = node[0];
	 
	      node[4] = (-Seek(xside, ply + 1, (depth1 > 0) ? depth1 - 1 : 0, -beta, -alpha, nxtline, rcnt));
	 
	      if (Mathf.Abs(node[4]) > 9000)
	        node[3] |= Js__idem;
	      else if (rcnt[0] == 1) {
	        node[4] /= 2;
	      }
	 
	      if ((rcnt[0] >= 2) || (Js_nGameMoves - Js_fiftyMoves > 99) || (
	        (node[4] == 9999 - ply) && (Js_flagCheck[ply] == 0)))
	      {
	        node[3] |= Js__idem;
	        if (side == Js_computer)
	          node[4] = Js_specialScore;
	        else
	          node[4] = (-Js_specialScore);
	      }
	      node[0] = nxtline[(ply + 1)];

	      UnValidateMov(side, node, tempb, tempc, tempsf, tempst);

	    }
	 
	    if ((node[4] > best) && (!(Js_flag[1])))
	    {
	      if ((depth1 > 0) && 
	        (node[4] > alpha) && ((node[3] & Js__idem) == 0)) {
	        node[4] += depth1;
	      }
	      best = node[4];
	      pbst = pnt;
	      if (best > alpha) alpha = best;
		  
	      for (j = ply + 1; nxtline[(++j)] > 0; )
	      {
	        bstline[j] = nxtline[j]; 
	      }
	      bstline[j] = 0;
	      bstline[ply] = mv;
	      if (ply == 1)
	      {
	        if (best > Js_root[4])
	        {
	          MoveTree(Js_tmpTree, Js_Tree[pnt]);
	          for (j = pnt - 1; j >= 0; --j)
	          {
	            MoveTree(Js_Tree[(j + 1)], Js_Tree[j]);
	          }
	          MoveTree(Js_Tree[0], Js_tmpTree);
	          pbst = 0;
	        }
	 
	        if (Js_depth_Seek > 2) ShowThink(best, bstline);

	      }
	    }
	    if (Js_flag[1])
	    {
	      return (-Js_scoreTP[(ply - 1)]);
	    }
	    ++pnt;
	  }
	 

	  node = Js_Tree[pbst];		//_BTREE

	  mv = node[1] << 8 | node[2];
	 
	  if (depth1 > 0)
	  {
	    j = node[1] << 6 | node[2];
	    if (side == Js_black)
	      j |= 4096;

	    if (Js_storage[j] < 150)
	      Js_storage[j] = (Js_storage[j] + depth1 * 2);	//(short)

	    if (node[2] != (Js_movesList[Js_nGameMoves][0] & 0xFF)) {
	      if (best <= beta) {
	        Js_eliminate3[ply] = mv;
	      } else if (mv != Js_eliminate1[ply])
	      {
	        Js_eliminate2[ply] = Js_eliminate1[ply];
	        Js_eliminate1[ply] = mv;
	      }
	    }
	    if (best > 9000)
	      Js_eliminate0[ply] = mv;
	    else {
	      Js_eliminate0[ply] = 0;
	    }
	  }
	  
	  // this timeout doesn't work
	  if (Time.time - Js_startTime > Js_searchTimeout) {
	      Js_flag[1] = true;
	  }

	return best;
	}
	
	// This sets active side
	function SwitchSides( oposit:boolean ):void
	{
	 var whitemove = (Js_nGameMoves % 2 == 0);
	 var whitecomp = (Js_computer == Js_white);
	 if( oposit == ( whitemove == whitecomp) )
	 {

	 Js_player = Js_otherTroop[Js_player];
	 Js_computer = Js_otherTroop[Js_computer];
	 Js_enemy = Js_otherTroop[Js_enemy];

	 Js_JESTER_TOPLAY = Js_otherTroop[Js_JESTER_TOPLAY];

	 }
	 Js_fUserWin_kc=false;
	}


	function GetFen():String
	{
	  var fen = "";
	  var i = 64-8;
	  var pt = 0;
	  for( ;i>=0; )
	    {

	    var piece = (Js_color[i]==Js_white ? Js_upperNot[Js_board[i]] : Js_lowerNot[Js_board[i]]);
	    if(piece==" ") pt+=1;
	    else
		{
		 if(pt>0) { fen += pt.ToString(); pt = 0; }
		 fen += piece;
		}
	    i++;
	    if(i % 8 == 0) i -= 16;
	    if( (i>=0) && (i % 8 == 0))
		{
		 if(pt>0) { fen += pt.ToString(); pt = 0; }
		 fen += "/";
		}
	    }
 	  if(pt>0) { fen += pt.ToString(); pt = 0; }	

	  fen += " " + ( (Js_nGameMoves % 2 == 0) ? "w" : "b" ) + " ";


	  var wKm = ( (Js_roquer[ Js_white ]>0) || (Js_nMvtOnBoard[Js_kingPawn[Js_white]]>0) );
	  var wLRm = ( Js_nMvtOnBoard[Js_queenRook[Js_white]]>0 );
	  var wRRm = ( Js_nMvtOnBoard[Js_kingRook[Js_white]]>0 );

	  var bKm = ( (Js_roquer[ Js_black ]>0) || (Js_nMvtOnBoard[Js_kingPawn[Js_black]]>0) );
	  var bLRm = ( Js_nMvtOnBoard[Js_queenRook[Js_black]]>0 );
	  var bRRm = ( Js_nMvtOnBoard[Js_kingRook[Js_black]]>0 );

	  if( (wKm || wLRm || wRRm) && (bKm || bLRm || bRRm) )
		{
		 fen += "-";
		}
	  else
		{
		if( (!wKm) && (!wRRm) ) fen += "K";
		if( (!wKm) && (!wLRm) ) fen += "Q";
		if( (!bKm) && (!bRRm) ) fen += "k";
		if( (!bKm) && (!bLRm) ) fen += "q";
		}
	  fen += " ";

	  if ((Js_root[3] & Js_enpassant_msk) != 0)
		{
		fen += Js_szAlgMvt[ Js_root[2] - (Js_color[Js_root[2]]==Js_white ? 8 : -8 ) ] + " ";
	    	}
	  else fen += "- ";

	  var mv50 = Js_nGameMoves - Js_fiftyMoves;
	  fen += (mv50>0 ? mv50.ToString() : "0" ) + " ";

	  fen += (Js_nMovesMade + ((Js_nGameMoves % 2 == 0) ? 1 : 0)).ToString();

	  return fen;

	}

		// for Js_enemy move only
		// use SwitchSides before if oposit movement required
		// ignores checkmate status flag

	function EnterMove( from_sq:String, to_sq:String, promo:String ):void
	{
	  var mvt = 0;
	  var fsq_mvt = 0;
	  var tsq_mvt = 0;

	  SwitchSides( true );

	  for( var i= 0; i < 64; i++ )
	  {
	    if(Js_szAlgMvt[i]==from_sq) fsq_mvt = i;
	    if(Js_szAlgMvt[i]==to_sq) tsq_mvt = i;
	  }

	  Js_proPiece = 0;
	  for( i = 2; i < 6; i++ )
	  {
	     if( Js_upperNot[i]==promo ) Js_proPiece = i;
	  }

	  Js_root[1] = 0;
	  Js_root[2] = 0;
	  Js_root[3] = 0;
	 
	  var rgch = new Array();		//new char[8];
	 
	  Js_myPiece = Js_rgszPiece[Js_board[fsq_mvt]];
	 
	  if (Js_board[fsq_mvt] == Js_pawn)
	  {
	    var iflag = 0;
	    if ( (tsq_mvt < 8) || (tsq_mvt > 55) )
	    {
	      iflag = Js_promote | Js_proPiece;
	    }
	    Lalgb(fsq_mvt, tsq_mvt, iflag);
	  }
	 
	  i=0;
	  rgch[i++] = from_sq.Substring(0,1);	//(char)
	  rgch[i++] = from_sq.Substring(1,1);
	  rgch[i++] = to_sq.Substring(0,1);	//(char)
	  rgch[i++] = to_sq.Substring(1,1);
	  if( promo.length>0 )
		{
		rgch[i++] = "=";
		rgch[i++] = promo;
		}
	  rgch[i++] = fromCharCode(0);
	 
	  Js_flag[1] = true;
	 
	  var iMvt = CheckMov(rgch, 0);
	 
	  if (iMvt != 0)
	  {

	    WatchPosit();
	    UpdateDisplay();
	    IfCheck();
	    if (!(CheckMatrl())) Js_bDraw = 1;
	    ShowStat();

	    ShowMov(rgch);
	 
	    Js_depth_Seek = 0;
	  }
							
	}

	// ignores flags...
	// use after InitGame

	function SetFen(fen:String):void
	{
	
	  var fen2 = "";
	  var ch = "";
	  
	  for( var i= 0; i<fen.length; i++ )
	    {
	    ch = fen.Substring(i,1);
	    var pt = parseInt(ch);
	    if(pt>0)
		{
	    	while((pt--)>0) fen2 += " ";
		}
	    else
		{
		if(ch == " ") break;
		if(!(ch=="/")) fen2 += ch;
		}
	    }

	  var i2 = 0;
	  for( i= 64-8; i>=0; )
	    {
	    Js_board[i] = Js_empty;
	    Js_color[i] = Js_hollow;
	    var piece = fen2.Substring(i2++,1);
	    for( var j= 1; j <= 6; j++ )
	    {
		 if( (Js_upperNot[j]==piece) || (Js_lowerNot[j]==piece) )
			{
			Js_board[i] = j;
			Js_color[i] = ( (Js_upperNot[j]==piece) ? Js_white : Js_black );
			}
	     }

	    Js_nMvtOnBoard[i] = 1;

	    i++;
	    if(i % 8 == 0) i -= 16;
	    }

	  Js_roquer[ Js_white ] = 1;
	  Js_roquer[ Js_black ] = 1;

	  Js_root[1] = 0;
	  Js_root[2] = 0;
	  Js_root[3] = 0;

	  var side = "";
	  var enp = "";
	  var mcnt = "";
	  var mv50s = "";

	  var st = 0;

	  for( i = 0; i<fen.length; i++ )
	    {
	    ch = fen.Substring(i,1);
	    if(ch == " ") st++;
	    else if(st == 1)
		{
		side = ch;
		}
	    else if(st == 2)
		{		
		if(ch=="k" || ch=="q")
			{
			Js_roquer[ Js_black ] = 0;
			Js_nMvtOnBoard[Js_kingPawn[Js_black]] = 0;

			if(ch=="q") Js_nMvtOnBoard[Js_queenRook[Js_black]] = 0;
			if(ch=="k") Js_nMvtOnBoard[Js_kingRook[Js_black]] = 0;
			}
		if(ch=="K" || ch=="Q")
			{
			Js_roquer[ Js_white ] = 0;
			Js_nMvtOnBoard[Js_kingPawn[Js_white]] = 0;

			if(ch=="Q") Js_nMvtOnBoard[Js_queenRook[Js_white]] = 0;
			if(ch=="K") Js_nMvtOnBoard[Js_kingRook[Js_white]] = 0;
			}
		}
	    else if(st == 3)
		{
		enp += ch;
		}
	    else if(st == 4)
		{
		mv50s += ch;
		}
	    else if(st == 5)
		{
		mcnt += ch;
		}		
	    }

	  if(enp.length>0)
	  {
	   for( i = 0; i < 64; i++ )
	    {
	    if(Js_szAlgMvt[i]==enp)
		{
		Js_root[1] = ((i<32) ? i-8: i+8 );
		Js_root[2] = ((i<32) ? i+8: i-8 );
		Js_root[3] |= Js_enpassant_msk;
		}
	    }
	  }

	  Js_nGameMoves = (parseInt(mcnt) * 2) - (side=="w" ? 2 : 1);
	  Js_nMovesMade = parseInt(mcnt) - ((Js_nGameMoves % 2==0) ? 1 : 0 );
	  Js_fiftyMoves = Js_nGameMoves - parseInt( mv50s );

	  Js_flip = (Js_nGameMoves % 2 > 0);

	  MessageOut("(FEN)", true);
	  UpdateDisplay();
	  InitStatus();

	  ResetFlags();

	  Js_flag[0] = false;
	  Js_flag[2] = true;

	  IfCheck();
	  if (!(CheckMatrl())) Js_bDraw = 1;
	  ShowStat();
	  
	  opnmv = "**";
	}

	function ResetFlags():void
	{
	  Js_fInGame = true;
	  Js_fCheck_kc = false;
	  Js_fMate_kc = false;
	  Js_fAbandon = false;
	  Js_bDraw = 0;
	  Js_fStalemate = false;
	  Js_fUserWin_kc = false;
	}

	function Jst_Play():void
	{
	  SwitchSides( false );

	  Js_fEat = false;
	  ResetFlags();

	  Js_realBestScore = -20000;
	  Js_realBestDepth = 0;
	  Js_realBestMove = 0;
	 
	  LookBookMove();

	  UpdateDisplay();
	 
	}


	function UndoMov():void
	{
	if (Js_nGameMoves > 0)
	  {
	  SwitchSides( false );

	  UndoMv();

	  UpdateDisplay();

	  ResetFlags();

	  ShowStat();
	  MessageOut("(undo)", true);

	  Js_flip = false;
	  if(Js_nGameMoves % 2 == 0)
		{
		 Js_nMovesMade -= 1;
		}
	  else
		{
		Js_flip = true;
		}  
	  }
	}

// universal 200Kb code of most played chess openings
// parameter moves:e2e4
// returns next variants, strength, ECO code
// Author: grozny0 [at] gmail.com, free code for any project
// chessforeva.blogspot.com, chessforeva.appspot.com

var c0_opn=new Array();
c0_opn[1]="A00.a2a31d7d53d2d43g8f69-2g1f36g8f69-3e7e51c2c49g8f69-3g7g62g1f34f8g79-2g2g35f8g79-3g8f62g1f39d7d53-1g7g66.b1c31c7c53d2d41c5d49-2e2e43b8c67f2f49g7g69g1f39f8g79-5d7d61-1e7e61-2f2f41b8c69-2g1f36b8c65d2d48c5d49f3d49g7g64-1g8f65-4g2g31-2d7d51-1d7d61-1e7e61-1g7g61-1g8f61-3c7c61e2e49d7d59-3d7d54d2d41c8f51-1e7e62-1g8f66c1g59-3e2e48c7c61-1d5d43c3e29c7c52e2g39-2e7e57e2g39c8e69g1f39-6d5e43c3e49b8d73-1c8f53e4g39f5g69-3e7e53-3e7e61d2d49-2g8f61-2g1f31g8f69-3e7e51e2e41g8f69-2g1f38b8c69d2d49e5d49f3d49g8f69c1g59-6d7d61-3e7e61e2e49d7d59-3g7g61d2d42f8g79-2e2e45f8g79-2h2h41h7h59-3g8f61d2d41d7d59-2e2e47d7d51-1d7d63d2d49-2e7e54-2g1f31d7d59.A01.b2b31b7b61c1b29c8b79e2e39-4c7c51c1b29b8c68e2e39-2d7d51-3d7d52c1b29b8c61-1c7c52e2e39b8c69f1b55-1g1f34-4c7c61-1c8f51-1c8g42g1f33b8d79-2g2g33-1h2h32g4h59-3e7e61-1g8f62e2e37-1g1f32-3e2e31e7e52-1g8f67c1b29-3g1f31c8g49-3d7d61c1b29b8d73-1e7e56-3e7e54c1b29b8c67c2c41g8f69e2e39d7d59c4d59f6d59a2a39f8d69-8e2e37d7d52f1b59f8d69f2f46d8h49g2g39h4e79g1f39-5g1f33-4d7d61c2c45-1g1f34-2g7g61-1g8f64c2c41-1f1b56d7d65g1e29c8d79-3f8d64-2g1f31e5e49-4g1f31-1g2g31-2d7d62c2c41-1d2d41-1e2e34g8f69c2c49-3g2g33g7g64-1g8f65f1g29-6f7f51c1b29g8f69-3g7g61c1b29g8f69-3g8f61c1b29b7b61-1c7c51-1d7d51e2e39-2d7d61-1e7e61e2e39-2g7g64b2f61e7f69-2e2e42d7d69g2g39f8g79f1g29-5f2f41-1g1f32f8g79-2g2g31f8g79.A00.b2b41c7c61c1b26a7a56a2a39-2d8b63-2c2c41d7d59-2e2e32d7d59-3d7d52c1b29c8f51-1c8g41-1d8d61-1e7e61-1g8f63e2e39-4d7d61c1b29e7e59-3e7e54a2a31d7d59-2c1b29b8c61-1d7d63c2c44-1e2e35g8f69-3f7f61e2e49f8b49f1c49-4f8b44b2e59g8f69c2c44e8g89-2e2e32-1g1f33-6e7e61c1b29g8f69b4b59-4g8f61c1b29d7d51-1d7d61-1e7e64b4b59-2g7g62.c2c31d7d55d2d49g8f69-3e7e54d2d49e5d49.A10.c2c41A40.b7b61b1c35c7c51-1c8b77d2d42e7e69-2e2e46e7e69g1e22-1g1f34f8b49f1d39g8e79-4g2g32-3g1f31e7e69-3e7e62e2e49c8b79-4b2b31c8b79-2d2d42c8b74b1c39e7e69a2a39-4e7e65a2a39c8b79b1c39-5e2e41c8b79b1c39e7e69-4g1f31c7c51-1c8b79g2g39b7f39e2f39c7c59d2d49c5d49d1d49b8c69-10g2g31c8b79-3A10.b8c61b1c37d7d61-1e7e57g2g39g7g69f1g29f8g79-5g8f62-2d2d41e7e59-2g1f31e7e59-2g2g31";
c0_opn[2]="e7e59f1g29-4A30.c7c51A34.b1c34b7b61e2e44c8b79-2g1f35c8b79-3A35.b8c65g1f32e7e51g2g39g7g69f1g29f8g79-5g7g64d2d41c5d49f3d49f8g79-4e2e33f8g79d2d49-3g2g34f8g79f1g29-4g8f63g2g39g7g69f1g29f8g79e1g19e8g89d2d49-9A36.g2g37g7g69f1g29f8g79a2a31d7d69a1b19-3d2d31d7d65-1e7e64-2e2e32e7e53g1e29g8e79e1g19e8g89-5e7e66g1e29g8e79e1g19e8g89d2d49c5d49e2d49-9e2e41d7d69g1e29-3A37.g1f33d7d61-1e7e52-1e7e62-1A38.g8f64e1g19e8g89d2d34d7d69-2A39.d2d45-8A36.g8f61f1g29e7e69-5A34.e7e61-1g7g61g1f31f8g79d2d49c5d49f3d49b8c69-6g2g38f8g79f1g29b8c69a2a32-1d2d31-1e2e33e7e69g1e29g8e79e1g19e8g89d2d49c5d49e2d49-9g1f33-6g8f61e2e41b8c69-2g1f33b8c63-1d7d53c4d59f6d59-3e7e62-2g2g35b8c61f1g29-2d7d54c4d59f6d59f1g29d5c79g1f39b8c69e1g19e7e59d2d39f8e79-11e7e62g1f39-2g7g61f1g29f8g79-6A30.b2b31b8c65-1g8f64-2g1f33b7b61g2g39c8b79f1g29-4b8c63b1c34e7e52e2e33-1g2g36g7g69f1g29f8g79e1g19-6g7g64e2e37f8g79d2d49-3g2g32f8g79f1g29-4g8f62g2g39-3d2d44c5d49f3d49e7e61-1g7g63e2e49f8g79c1e39g8f69b1c39f6g49d1g49c6d49g4d19-10g8f64b1c39e7e69g2g39-7g2g31g7g69f1g29f8g79b1c33-1e1g16-6d7d61-1e7e61-1g7g61b1c31f8g79-2d2d46c5d45f3d49b8c64e2e49g8f69b1c39d7d69-5f8g75e2e49b8c69c1e39g8f69b1c39-8f8g74e2e49-3e2e41-1g2g31f8g79f1g29b8c69e1g19-6g8f64b1c36b7b61g2g39c8b79f1g29-4b8c63d2d45c5d49f3d49e7e66g2g39-2g7g63-4e2e31-1g2g33d7d53-1g7g66f1g29f8g79-5d7d52c4d59f6d59d2d44-1g2g35b8c69f1g29-6e7e62g2g39b7b69f1g29c8b79e1g19f8e79-7g7g61d2d49-3A31.d2d41c5d49A32.f3d49A33.e7e69-4A30.g2g32b7b64f1g29c8b79e1g19e7e65b1c39-2g7g64-5b8c61-1g7g63f1g29f8g79-6g2g31b8c63f1g29g7g69b1c39f8g79a2a34d7d69-2d2d31-1e2e32-1g1f31-6e7e61-1g7g64f1g29f8g79b1c38b8c69a2a34d7d69a1b19-3d2d31-1e2e32e7e69g1e29g8e79e1g19e8g89d2d49c5d49e2d49-9g1f32-3e2e31-1g1f31-4g8f61f1g29d7d56c4d59f6d59b1c39d5c79g1f39b8c69e1g19-8e7e61g1f39-2g7g61-5A11.c7c61b1c31d7d59c4d54c6d59d2d49b8c62-1g8f67c1f43-1g1f36b8c69c1f49-7d2d43g8f69e2e33-1g1f36-3e2e31g8f69g1f39-4g8f61-2b2b31d7d59c1b29g8f69-4d2d41d7d59b1c32g8f69e2e36e7e69g1f39-3g1f33-3c4d52c6d59b1c39b8c62-1g8f67g1f39b8c69c1f49-7e2e31g8f69b1c39-3g1f33g8f69b1c36d5c44a2a49";
c0_opn[3]="c8f59-3e7e65e2e39b8d79-4e2e33-4g8f61-2e2e42d7d58c4d51c6d59e4d59g8f69b1c35f6d59g1f39-3f1b54b8d79b1c39-7e4d58c6d59c4d53g8f69b1c38f6d59g1f39b8c64-1e7e65d2d49-5f1b51b8d79b1c39-5d2d46g8f69b1c39b8c63c1g54-1g1f35c8g49c4d59f6d59d1b39g4f39g2f39-8e7e65g1f39f8b45c4d55f6d59-2f1d34d5c49d3c49e8g89e1g19b7b69-7f8e74c4d59f6d59f1d39b8c69e1g19e8g89-9g7g61-5g8f61b1c39c6d59d2d49-6d7d61-1e7e51g1f39d7d69d2d49b8d79-5e7e61-1g7g61-2A12.g1f33d7d58b2b32c8f51-1c8g43c1b29-2g8f65c1b27c8f54-1c8g45-2g2g32-3c4d51c6d59d2d49-3d2d41e7e61-1g8f68b1c37e7e69-2e2e32-3e2e34g8f69b1c36a7a63b2b39-2e7e65b2b35b8d79-2d2d44b8d79-3g7g61d2d49f8g79-4b2b31c8g49-2d1c21-1d2d41-3g2g31g8f69f1g29-4g8f61b1c33d7d59e2e39-3b2b32d7d59-2d2d41d7d59-2g2g32d7d59-4A11.g2g31d7d59c4d51c6d59-2f1g28g8f69g1f39c8f59c4d59c6d59-7g8f61-3A10.d7d51c4d59d8d56-1g8f63-3d7d61b1c35c7c61-1e7e55g2g39f7f55-1g7g64-3g7g62g2g39f8g79f1g29-4g8f61-2d2d42e7e55-1g7g63-1g8f61-2g2g31e7e55f1g29-2g7g64f1g29f8g79-5A20.e7e52A21.b1c37A25.b8c63e2e31g8f69-2A27.g1f33d7d61d2d49-2f7f52d2d31-1d2d48e5e49c1g53-1f3g56-4g7g62d2d47e5d49f3d49f8g79d4c69b7c69g2g39g8e79f1g29e8g89e1g19d7d69-12g2g32f8g79f1g29-4A28.g8f63d2d41e5d49f3d49-3e2e33-1A29.g2g35f8b49-4A25.g2g36d7d61f1g29c8e66d2d39d8d79-3g7g63-3f7f51f1g29g8f69d2d35f8b49c1d29-3e2e34-4g7g66f1g29f8g79a1b11a7a59a2a39-3d2d33d7d67a1b13a7a59a2a39-3e2e32-1e2e43-1g1f31-2f7f51-1g8e71-2e2e33d7d66g1e29c8e64-1g8e73-1h7h52-3f7f51-1g8e71g1e29-3e2e41d7d69g1e29-3g1f31d7d69e1g19-6g8f61f1g29f8b43-1f8c56e2e39-6A21.c7c51-1c7c61-1d7d61d2d41e5d49d1d49b8c69d4d29-5g1f32f7f59d2d49e5e49f3g59f8e79g5h39-7g2g36b8c61f1g29-2c8e61-1f7f53f1g29g8f69d2d36f8e79-2e2e33-4g7g64f1g29f8g79d2d36f7f59-2e2e33-6f7f51d2d43-1g2g36g8f69f1g29-4f8b41c3d54b4a51-1b4c53g1f39-2b4e74d2d49d7d69-4d1c21g8f69-2g1f31b4c39-2g2g33b4c37b2c35d7d69f1g29-3d2c34d7d69f1g29-4g8f62f1g29e8g89-5f8c51-1g7g61g2g39f8g79f1g29-4A22.g8f64d2d31-1e2e31f8b49g1e29e8g89a2a39-5e2e41f8c59-2g1f35b8c69a2a31d7d55c4d59f6d59d1c29-4g7g64g2g39f8g79f1g29e8g89e1g19-7d2d31d7d54c4d59f6d59-3f8b45c1d29e8g89-4d2d41e5d49f3d49f8b49";
c0_opn[4]="c1g59h7h69g5h49b4c39b2c39-9e2e32d7d51c4d59f6d59-3f8b47c3d51-1d1c28b4c35c2c39d8e79a2a39d7d59-5e8g84c3d59f8e89c2f59d7d69d5f69-8f8e71d2d49-3e2e41f8b44d2d39d7d69-3f8c55f3e59c6e59d2d49c5b49d4e59f6e49-8g2g34c6d41f1g29d4f39g2f39f8b49-5d7d54c4d59f6d59f1g29d5b69e1g19f8e79a2a34e8g89b2b49c8e69-4d2d35e8g89a2a39c8e69-11f8b43c3d53b4c59-2f1g26e8g89e1g19e5e45f3g59b4c39b2c39f8e89-5f8e84-5f8c51f1g29d7d69e1g19-4g7g61f1g29f8g79-5d7d61d2d44-1g2g35-2e5e41-2g2g34b8c61f1g29f8b43-1f8c56e2e39-4A23.c7c61d2d43e5d49d1d49d7d59-4f1g22d7d59c4d59c6d59-4g1f34e5e49f3d49d7d59c4d59d8b69-7d7d53c4d59f6d59f1g29c8e61-1d5b69d2d31f8e79g1f39b8c69e1g19-5g1f38b8c69d2d31f8e79e1g19e8g89-4e1g18f8e79a1b11-1a2a32e8g89b2b49-3d2d35e8g89a2a34-1c1e35-12A22.d7d61f1g29-2f8b42f1g29e8g89e2e45b4c39b2c35-1d2c34d7d69-4g1f34f8e89e1g19e5e49-7f8c51f1g29-2f8e71f1g29-2A24.g7g61f1g29f8g79-6A20.b2b31b8c69-2d2d31b8c64-1g8f65-2e2e31b8c61-1g8f68b1c39-3e2e41g8f69-2g1f31b8c65-1d7d61-1e5e43f3d49-3g2g32b8c63b1c31-1f1g29d7d61b1c39c8e69d2d39-4f7f51b1c39g8f69d2d34f8b49c1d29e8g89-4e2e35-4f8c51-1g7g65b1c39f8g79a1b12a7a59a2a39-3d2d32d7d69-2e2e32d7d69g1e29-3e2e42d7d69g1e29-6g8f61b1c39f8c59-5c7c51-1c7c61d2d47e5d44d1d49d7d59-3f8b45c1d29b4d29d1d29d7d69b1c39g8f69-8f1g22-2d7d51-1d7d61f1g29f7f55b1c39g8f69-3g7g65b1c39f8g79-5f7f51d2d42-1f1g27g8f69b1c39-4f8c51-1g7g61f1g29f8g79b1c39b8c63-1d7d63-1g8e72-5g8f64f1g29b8c62b1c38f8b46c3d59b4c59e2e39-4f8c53a2a39-3g1f31-2c7c62d2d48e5d46d1d49b8a62-1d7d57c4d54c6d59g1f39b8c69d4a49-5g1f35f8e79-5f8b43c1d29b4d29d1d29d7d69b1c39e8g89e2e39-9g1f31e5e49f3d49d7d59c4d59-6d7d54c4d59f6d59b1c35d5b69g1f39b8c69e1g19f8e79a2a34e8g89b2b49-3d2d35e8g89a2a39-9g1f34b8c69e1g19d5b66d2d39f8e79a2a34-1b1d25e8g89a2a39a7a59b2b39-8f8e73d2d49e5d44f3d49c6d49d1d49-4e5e45f3e59f7f59e5c69b7c69-13f8c51b1c39e8g89-7A13.e7e61b1c33b7b61d2d45-1e2e44-2c7c51g1f39-2d7d57c4d51e6d59d2d49c7c66c1f43-1g1f36c8f59-3g8f63-4d2d47c7c51c4d59e6d59g1f39b8c69g2g39g8f69f1g29f8e79e1g19e8g89-11c7c63c4d52e6d59g1f39-3e2e34g8f69g1f39b8d79d1c24f8d69-2f1d35d5c49d3c49b7b59c4d39-9e2e41d5e49";
c0_opn[5]="c3e49f8b49c1d29d8d49d2b49d4e49f1e29-9g1f32g8f69-3f8b41-1f8e71c4d53e6d59c1f49c7c69e2e39-5g1f36g8f69c1f43e8g89e2e39-3c1g56e8g83-1h7h66g5h49e8g89e2e39b7b69-9g8f63c1g53b8d72-1f8e77e2e39e8g89g1f39-5c4d53e6d59c1g59c7c64e2e39-2f8e75e2e39e8g89f1d39-7g1f32f8e79-4e2e31g8f69g1f39f8e79-5f7f51g2g39g8f69f1g29-4f8b41-1g8f61d2d41-1e2e45d7d59e4e59d5d49e5f69d4c39b2c39d8f69-8g1f31-1g2g31-3b2b31d7d59-2d2d41d7d57b1c36c7c51-1c7c62e2e39-2f8e71g1f39g8f69-3g8f64c1g55f8e79e2e39-3c4d54e6d59c1g59-5g1f33c7c63-1g8f66b1c39-4f7f51-1g8f62b1c35f8b49-2g1f34d7d59-4e2e31d7d55-1g8f64-2e2e41c7c52b1c39b8c69-3d7d57e4d59e6d59d2d49g8f69b1c39-7g1f33b7b61g2g39c8b79f1g29-4c7c51-1d7d56b2b32c7c51g2g39b8c69-3f8e71c1b29e7f69-3g8f67c1b24f8e79g2g39e8g89f1g29-5g2g35f8e79f1g29e8g89e1g19b7b69-8d2d43c7c51c4d59e6d59-3c7c63d1c25g8f69-2e2e34-2g8f65b1c35c7c63-1f8e76c1g59-3c1g51-1g2g33d5c44-1f8e75f1g29e8g89-6e2e31g8f69b2b39f8e79-4g2g33c7c51-1c7c61b2b39-2d5c41d1a49b8d79-3g8f66f1g29d5c41d1a49-2A14.f8e78e1g19e8g89b2b34c7c59-2d2d45d5c49d1c29a7a69-11A13.f7f51g2g39g8f69f1g29f8e79-5g8f62b1c32d7d59d2d49f8e79-4b2b31d7d59-2d2d41d7d59-2g2g35b7b62f1g29c8b79e1g19f8e79-5d7d57b2b33f8e79f1g29e8g89-4f1g26f8e79e1g19e8g89b2b39-9g2g31c7c51-1c7c61-1d7d57f1g28c7c51-1c7c61d1c24-1g1f35-2d5c41d1a49b8d79a4c49-4g8f67d2d41-1g1f39c7c51-1c7c61-1d5c42d1a49b8d75a4c49-2c7c64a4c49b7b59c4c29c8b79-7f8e75d2d41e8g89-2e1g18e8g89b2b33b7b65c1b29c8b79-3c7c54-2d1c21-1d2d44d5c49d1c29a7a69-10g1f31g8f69f1g29f8e79e1g19e8g89-7f7f51f1g29g8f69-3g8f61f1g29d7d59g1f39f8e79e1g19e8g89d2d49-10A10.f7f51b1c33e7e51-1g8f69d2d41g7g69-2g1f31g7g69-2g2g37d7d61f1g29-2e7e51f1g29-2e7e61f1g29f8e79-3g7g66f1g29f8g79d2d34d7d65-1e8g84-2e2e32-1g1f32-7b2b31d7d62-1e7e53-1g8f64-2d2d41e7e61-1g7g61-1g8f67b1c34g7g69-2g2g35g7g69f1g29f8g79-6e2e41f5e49-2g1f31e7e61-1g8f69g2g39d7d61d2d49-2e7e62f1g29f8e79-3g7g65f1g29f8g79e1g19e8g89-8g2g32e7e51-1g7g61f1g29-2g8f69f1g29d7d61b1c39-2e7e51-1e7e61g1f39f8e79-3g7g66b1c39f8g79d2d37d7d66e2e49-2e8g83e2e49-3e2e32-8g7g51d2d49f8g79-3g7g61b1c34c7c51g1f32f8g79-2g2g37f8g79f1g29";
c0_opn[6]="b8c69e2e34-1g1f35-6d7d61-1f8g78d2d42c7c51d4d59-2d7d63e2e47b8c63-1g8f66-2g1f32-2g8f64e2e49d7d69f1e23e8g89-2f2f33e8g89c1e39-3g1f32e8g89f1e29-7e2e41d7d69-2g1f31c7c53g2g39b8c69f1g29-4d7d66d2d44-1g2g35g8f69f1g29-5g2g36c7c52f1g29b8c69a2a32-1d2d31-1e2e32-1g1f32-4d7d62f1g29e7e56d2d36-1e2e43-2g8f63-3e7e53f1g29b8c62d2d39-2d7d65d2d35b8c69-2e2e34-2g8e71-3f7f51-1g8f62f1g29e8g89d2d32d7d69-2e2e44c7c54-1d7d65g1e29-3g1f33d7d69e1g19-8g8f61-2d2d41c7c51-1f7f51-1f8g76b1c34c7c52-1d7d65e2e49g8f69-3g8f62e2e49d7d69-4e2e43d7d69b1c39g8f69-4g1f31-2g8f63b1c38d7d52-1f8g77e2e49d7d69g1f39e8g89-6g1f31f8g79-4e2e41c7c51g1f39-2e7e51-1f8g77d2d49d7d69b1c39g8f69f1e23e8g89-2f2f32-1g1f34e8g89f1e29-9g1f31f8g79b1c32-1d2d45d7d63-1g8f66b1c34-1g2g35e8g89f1g29-5g2g32-2g8f61-2g2g32f8g79f1g29c7c51b1c39b8c69a2a36-1e2e33-4d7d62b1c38e7e56d2d35-1e2e44-2g8f63-2g1f31-2e7e53b1c39b8c62-1d7d65d2d35-1e2e32-1e2e42-2g8e71-3g8f62b1c37e8g89d2d34-1e2e45-3g1f32e8g89e1g19-6g8f61-3A15.g8f63A16.b1c36b7b61-1b8c61-1c7c51e2e41b8c69g2g39-3g1f34b7b61e2e49-2b8c62d2d45c5d49f3d49g7g69e2e49d7d69-6g2g34g7g69f1g29f8g79e1g19-6d7d51c4d59f6d59d2d42-1e2e43-1g2g33b8c69f1g29d5c79-7e7e63d2d41c5d49f3d49-3e2e32-1g2g35b7b69f1g29c8b79e1g19f8e79-7g7g61d2d49-3g2g34b8c62f1g29e7e62-1g7g67g1f39-4d7d52c4d59f6d59f1g29d5c79d2d33e7e59-2g1f36b8c69e1g19e7e59d2d39f8e79-11e7e62f1g22-1g1f37b7b69f1g29c8b79e1g19f8e79f1e19-8g7g62f1g29f8g79e2e33e8g89g1e29-3e2e42-1g1f33-6c7c61d2d42d7d59-2e2e46d7d54e4d59c6d59-3e7e55g1f39d7d69d2d49-5g1f31d7d59-3d7d51c4d59f6d59d2d41g7g69-2e2e41d5c39-2g1f32d5c31-1g7g68d1a46c8d79-2e2e43-3A17.g2g36c7c51f1g29d5c79-3d5c31b2c39-2e7e51f1g29-2g7g67f1g29d5b64d2d35f8g79c1e39e8g89-4g1f34f8g79e1g19e8g89-5d5c35b2c39f8g79a1b17b8d79g1f39e8g89e1g19-5g1f32-9A16.d2d41g7g69-3d7d61d2d44b8d79-2g2g35g7g69f1g29f8g79-5e7e51e2e31-1g1f35b8c69a2a31g7g69-2d2d31f8b49c1d29-3d2d41e5d49f3d49f8b49c1g59h7h69g5h49-7e2e32f8b49d1c29b4c34-1e8g85c3d59-5e2e41-1g2g34c6d41f1g29d4f39g2f39-4d7d53c4d59f6d59f1g29d5b69e1g19f8e79-7f8b44c3d53b4c59-2f1g26e8g89e1g19e5e49-5f8c51-3d7d61d2d49-3g2g33";
c0_opn[7]="b8c61f1g29-2c7c61-1d7d52c4d59f6d59f1g29d5b69g1f39b8c69e1g19f8e79d2d39-10f8b44f1g29e8g89e2e44b4c39-2g1f35f8e89e1g19-6g7g61-3A17.e7e62d2d41d7d53c1g53f8e79-2c4d53e6d59c1g59-3g1f33-2f8b46d1c23-1e2e36c7c54-1e8g85f1d39-5A18.e2e43A19.c7c53e4e58f6g89d2d43c5d49d1d49b8c69d4e49d7d69g1f39-7g1f36b8c69d2d49c5d49f3d49c6e59d4b59a7a69b5d69f8d69d1d69f7f69c1e39g8e79e3b69e7f59-18g1f31b8c69-3A18.d7d55c4d51e6d59e4e59d5d49e5f69d4c39-6e4e58d5d47e5f69d4c39b2c39d8f69d2d44c7c54g1f39-2e6e55g1f39-3g1f35c7c53-1e6e56f1d39-8f6d71-1f6e41-3d7d61d2d49-3A17.g1f33A18.b7b61e2e44c8b79-2g2g35c8b79f1g29-4A17.c7c51g2g39b7b69f1g29c8b79e1g19f8e79-7d7d55c4d51e6d59d2d49-3d2d48c7c51c4d59f6d59-3c7c62e2e39b8d79-3f8b42c4d59e6d59c1g59-4f8e73c1g59e8g89e2e39-5e2e31-2f8b41d1c26e8g89-2g2g33-3g2g31d7d59c4d55e6d59-2f1g24-4A16.g7g63d2d41d7d51-1f8g79e2e48d7d68f1e21-1f2f34e8g89c1e39-3g1f34e8g89f1e29e7e59-5e8g81-2g1f31e8g89-4e2e43c7c51-1d7d69d2d48f8g79f1d31e8g89g1e29-3f1e22e8g89c1g54c7c59-2g1f35e7e59e1g19-5f2f32e8g89c1e37b8c64-1e7e55-2c1g52-3f2f41e8g89g1f39-3g1e21-1g1f32e8g89f1e29b8d71-1e7e58e1g19b8c69d4d59c6e79-8h2h31e8g89c1g59-5g2g31f8g79f1g29e8g89g1e29e7e59e1g19-8e7e51-2g1f31f8g79d2d41-1e2e42d7d69d2d49e8g89f1e29-5g2g36e8g89f1g29d7d69e1g19-7g2g34d7d51c4d59f6d59f1g29d5b69-5f8g79f1g29c7c61-1d7d61d2d31-1e2e43-1g1f34e8g89e1g19-4e8g88d2d31d7d69-2d2d41d7d69g1f39b8c64e1g19a7a69-3b8d75e1g19e7e59-6e2e31c7c62-1d7d67g1e29e7e59e1g19-5e2e42c7c51g1e29b8c69-3d7d68g1e29c7c55e1g19b8c69d2d39-4e7e54e1g19-5g1f33c7c51-1d7d69d2d41b8d79-2e1g18b8c62-1c7c61-1e7e55d2d39b8c69a1b19-13A15.b2b31e7e63-1g7g66-2d2d41c7c51d4d59-2c7c61-1d7d61-1e7e64b1c34d7d53-1f8b46-2g1f34b7b66g2g39-2d7d53-2g2g31d7d59f1g29-4g7g63b1c39d7d52-1f8g77e2e49d7d69g1f39e8g89f1e29-9g1f31b7b61g2g39c8b79f1g29e7e69e1g19f8e79-7c7c51b1c34b8c64-1d7d52c4d59f6d59-3e7e63g2g39b7b69f1g29c8b79e1g19-7d2d41-1g2g34b7b65f1g29c8b79e1g19e7e69b1c39-6d7d52-1g7g62f1g29-4c7c61b1c32d7d59e2e39-3b2b31d7d59c1b29-3d2d42d7d59-2g2g32d7d59b2b39-4d7d51-1d7d61g2g39-2e7e63b1c31d7d59d2d49-3b2b31-1d2d41b7b64-1d7d55b1c39";
c0_opn[8]="-3g2g35b7b63f1g29c8b79e1g19c7c52-1f8e77b1c35-1b2b34-6d7d56b2b32f8e79-2f1g27d5c43d1a49-2f8e76e1g19e8g89b2b35-1d2d44-8g7g63b1c33d7d53c4d59f6d59d1a49c8d79-5f8g76d2d41-1e2e45d7d69d2d49e8g89f1e29e7e59e1g19-7g2g32e8g89f1g29-5b2b31f8g79c1b29e8g89g2g39-5b2b41-1d2d41f8g79-2g2g34f8g79f1g29d7d61-1e8g88b1c31-1e1g19d7d51-1d7d68b1c36e7e59d2d39-3d2d43b8d79-10g2g31c7c51f1g29b8c63b1c39-2d7d54c4d59f6d59b1c39d5c79g1f39b8c69e1g19e7e59-9g7g62-3c7c61b2b31-1f1g24d7d59c4d52c6d59-2g1f37c8f54-1d5c45-4g1f34d7d59b2b39c8f54f1g29-2c8g45f1g29e7e69-7d7d51c4d59f6d59f1g29-4d7d61-1e7e51f1g29b8c63b1c39-2c7c62d2d49-2d7d53c4d59f6d59b1c35d5b69-2g1f34b8c69-7e7e61f1g28d7d59g1f39d5c42d1a49-2f8e77e1g19e8g89b2b34-1d1c22-1d2d43-7g1f31d7d59b2b39-4g7g64f1g29d7d51c4d59f6d59b1c39d5b69-5f8g78b1c38c7c51-1d7d61e2e49-2e8g87d2d32d7d69-2d2d41d7d69g1f39-3e2e31-1e2e43d7d69g1e29c7c54e1g19b8c69d2d39-4e7e55e1g19-5g1f31d7d69e1g19e7e59-6g1f31e8g89e1g19d7d69.A00.d2d31c7c51g2g39g7g69-3d7d55g1f35b8c64-1g8f65-2g2g34e7e55-1g7g64-3e7e52g1f36b8c69-2g2g33d7d59-3g7g61g2g39f8g79.A40.d2d43b7b51a2a41b5b49-2e2e48a7a61-1c8b78b1d22a7a69-2f1d34e7e69-2f2f32-3g1f31c8b79-3b7b61c1f41c8b79-2c2c43c8b76b1c39e7e69a2a39-4e7e63-2e2e44c8b78b1c33e7e69-2f1d36e7e69g1f39-4e7e61-2g1f31c8b78g2g39-2e7e61-3b8c61c2c41e7e59d4d59c6e79b1c35e7g69-2e2e44-5d4d51c6e59e2e49e7e69-4e2e41d7d51-1d7d61-1e7e56-2g1f35d7d55c1f43c8g49-2c2c46c8g49c4d59g4f39-5d7d64c2c43-1e2e46g8f69b1c39-4e7e61-2g2g31e7e59-3A43.c7c51c2c31b7b61-1c5d41c3d49d7d59-3d7d51-1e7e62g1f39g8f69-3g7g61-1g8f62g1f39e7e69-4d4c51b8a62-1d8a51-1e7e66b1c39-3d4d57b7b51-1d7d61c2c45g7g69b1c39f8g79-4e2e44g7g64-1g8f65b1c39g7g69-5A44.e7e53b1c31d7d69e2e49-3c2c42d7d69b1c35f8e75-1g7g64e2e49-3e2e44f8e75-1g7g65-4e2e46d7d69b1c36a7a62a2a49f8e79-3f8e75f1b52-1g1f37c8g49-3g7g61-2c2c41f8e79-2f1b51b8d79a2a49-3f1d31-1g1f31-4A43.e7e61b1c31-1c2c46e6d59c4d59d7d69b1c39g7g66e2e49-2g8e73-6e2e41e6d59e4d59d7d69-5f7f51b1c33g8f69-2c2c43-1g2g33-2g7g61c2c44f8g79-2e2e45f8g79g1f39d7d69-5g8f62b1c33d7d64e2e49g7g69-3g7g65e2e49d7d69g1f39f8g79-6A56.c2c46b7b54";
c0_opn[9]="c4b59a7a69b5a69c8a65b1c39-2g7g64-5e7e63b1c39e6d59c4d59d7d69e2e49g7g69f2f49f8g79-9g7g61b1c39f8g79e2e49d7d69-6A43.g1f31-3e2e31c5d41e3d49-2d7d51-1e7e61g1f39g8f69-3g7g61-1g8f64g1f39e7e63-1g7g66-4e2e41c5d49g1f39-3g1f31c5d46f3d49d7d59-3e7e61-1g8f61-3A41.c7c61c2c46d7d57b1c33g8f69g1f39-3c4d51c6d59-2g1f35g8f69b1c39-4d7d61-1g7g61-1g8f61-2e2e41d7d57-1d7d62-2g1f31d7d58-1g8f61-3A84.d7d52D00.b1c31c7c61e2e49-2c8f51c1g54-1f2f35-2e7e61e2e49-2f7f51-1g8f66D01.c1g59b8d74f2f33-1g1f36-2c7c61-1c8f52f2f39-2e7e62e2e49d5e49c3e49f8e79g5f69-9D00.c1f41b8c61-1c7c51e2e39b8c69-3c7c61e2e39-2c8f51-1e7e61e2e39-2g8f65e2e38c7c54c2c39b8c69-3c8f52-1e7e63-2g1f31-3c1g51b8c61-1b8d71-1c7c51d4c59-2c7c62c2c31-1e2e34d8b66d1c19-2h7h63g5h49d8b69-4g1f33d8b65-1h7h64g5h49-4c8f51-1d8d61-1f7f61g5f44-1g5h45g8h69-3g7g61-1g8f61e2e32-1g5f67e7f68e2e39f8d69-3g7f61-3h7h62g5h49c7c51-1c7c68c2c31c8f59-2e2e34d8b69b2b34e7e59-2d1c15e7e59g1f39-5g1f34d8b69b2b34c8f59e2e39e7e69-4d1c15c8f59-8A84.c2c31c7c61-1e7e62-1g8f66c1g59-3D01.c2c47D06.b8c61b1c33D07.d5c46d4d53c6e59f2f49-3e2e31-1g1f35g8f69e2e34-1e2e45c8g49c1e39e7e69f1c49f8b49-9D06.e7e51c4d59c6d49e2e39d4f59g1f39f8d69-7g8f62g1f39d5c49-4D07.c4d53d8d59e2e38e7e59b1c39f8b49c1d29b4c39b2c34d5d63f1d39-2g8f66f2f39e5e49-4d2c35e5d49g1e29c8g43f2f39-2g8e71e2d49-2g8f65e2d49e8g89d4b59d5g59-14g1f31e7e59b1c39f8b49c1d29b4c39d2c39e5e49-10D06.e2e31e7e59c4d54d8d59b1c39f8b49c1d29b4c39b2c39-7d4e55d5d49-4g1f32c8g49b1c33e7e69c4d59e6d59c1f49-5c4d54g4f39d5c63f3c69b1c39e7e69e2e49f8b49f2f39-7g2f36d8d59e2e39e7e59b1c39f8b49c1d29b4c39b2c39-11e2e32e7e59-3e7e51-3c7c51c4d59g8f69-3D10.c7c64b1c32d5c41a2a42e7e59-2e2e32b7b59a2a49b5b49c3a29-5e2e45b7b59a2a49b5b49c3a29g8f69e4e59f6d59f1c49e7e69g1f39f8e79-13e7e51c4d53c6d59-2d4e54d5d49c3e49d8a59c1d29a5e59e4g39g8f69g1f39e5d69-10e2e32-2e7e61e2e35f7f52-1g8f67g1f39b8d79d1c25f8d69-2f1d34d5c49d3c49b7b59c4d39-9e2e41-1g1f33d5c44a2a49f8b49-3g8f65c1g59-4g8f68c1g51b8d71-1d5c43a2a49-2e7e64e2e39f8e79-4c4d51c6d59c1f46b8c69e2e39a7a66f1d39c8g49g1e29e7e69-5c8f52g1f39e7e69-3e7e61-4g1f33b8c69c1f49a7a62";
c0_opn[10]="-1c8f57e2e39e7e69f1d39f5d39d1d39f8d69f4d69d8d69e1g19e8g89a1c19a8c89c3e29-19e2e34a7a62a2a41e7e69g1f39-3d1c24b7b53b2b39c8g49g1e29b8d79h2h39g4h59e2f49h5g69f4g69h7g69-11c8g41-1e7e62g1f39-2g7g63f1d39f8g79g1f39e8g89e1g19c8g49f3e59g4e69-10f1d31-1g1f33b7b59b2b37c8g49f1e29e7e69e1g19b8d79h2h39g4h59c1b29-9c4d52c6d59-5c8f51c4d59c6d59d1b39-4c8g41-1e7e65g1f39a7a61-1b8d79d1c24b7b61-1f8d69b2b31e8g89f1e29-3f1d34e8g89e1g19d5c49d3c49a7a69-6f1e21e8g89e1g19-3g2g41-3f1d35d5c48d3c49b7b59c4d38a7a63e3e49c6c59d4d54c5c49-2e4e55c5d49c3b59-6b5b41c3e49-2c8b75e1g14a7a66e3e49c6c59d4d59d8c79-5b5b43c3e49-3e3e45b5b49c3a49c6c59e4e59f6d59e1g19c5d49-10c4e21c8b79e1g19-6f8d61e1g19e8g89e3e49-6f8d61-1f8e71f1d39-4g7g61g1f39f8g79f1d34e8g89e1g19c8g49h2h39g4f39d1f39e7e69-8f1e25e8g89e1g19c8g49c4d59-9g1f34a7a61a2a42e7e69c1g59-3c4c53b8d79c1f49f6h59e2e39-5c4d52c6d59c1f45b8c69e2e39-3c1g54-3e2e31b7b59b2b39c8g49-5c8f51-1d5c43a2a48c8f59e2e35e7e69f1c49f8b49e1g19b8d74d1e29f5g69e3e49-4e8g85d1e26f5g69-2f3h43-7f3e53b8d75e5c49d7b63-1d8c76g2g39e7e59d4e59d7e59c1f49f6d79f1g29-10e7e64f2f39f8b49e2e49f5e49f3e49f6e49c1d29d8d49c3e49d4e49d1e29b4d29e1d29-15f3h41e7e69h4f59e6f59e2e39-6c8g41f3e59g4h59-4e2e31b7b59a2a49-3e2e41b7b59e4e59f6d59-5e7e64c1g54b8d72c4d53-1e2e36d8a59-3d5c43e2e49b7b59e4e59h7h69g5h49g7g59f3g59h6g59h4g59b8d79e5f66c8b79g2g39-3g2g33-12f8e71e2e39-2h7h63g5f65d8f69e2e39b8d79f1d39-5g5h44d5c49e2e49g7g59h4g39b7b59-8c4d51e6d59c1g55-1d1c24-3e2e34b8d79d1c24f8d69b2b32-1f1d34e8g89e1g19-3g2g42-3f1d35d5c49d3c49b7b59c4d39a7a64e3e49c6c59-3c8b75e1g19-10g7g61-4c1f41-1c4d51c6d59b1c36b8c63c1f42g8f69e2e39-3g1f37g8f69c1f49a7a61e2e39-2c8f57e2e39e7e69f1d39f5d39d1d39f8d69f4d69d8d69e1g19e8g89f1c12-1g1h17a7a69f1c19-14e7e61e2e39-6g8f66c1f43a7a61e2e39-2b8c68e2e38a7a65f1d39c8g49g1e29e7e69e1g19-6c8f52g1f39e7e69-3e7e61f1d39-3g1f31-3g1f36b8c69c1f49a7a61e2e39c8g49f1e29e7e69-5c8f57e2e39e7e69f1b51f6d79-2f1d38f5d39d1d39f8d69f4d69d8d69e1g19a8c81c3b59d6e79f3e59-4e8g88a1c12-1c3b51d6d79a2a39-3d3b53d6b49b5b49-3f1c12-12e7e61e2e39f8d69-8c1f41b8c69b1c33g8f69e2e39-3e2e36";
c0_opn[11]="g8f69b1c39-5g1f32b8c62b1c39g8f69c1f49a7a63-1c8f56e2e39e7e69f1d39f5d39d1d39f8d69f4d69d8d69e1g19e8g89-15g8f67b1c39b8c69c1f49a7a62e2e39c8g49f1e29-4c8f55e2e39e7e69f1d39f5d39d1d39f8d69f4d69d8d69e1g19e8g89d3b56d6b49b5e29-3f1c13f8c89-13e7e61e2e39-9e2e31c8f51b1c35e7e69-2c4d54c6d59d1b39d8c79-5e7e61b1c35-1g1f34-2g8f68b1c36a7a62d1c24-1g1f35b7b59-3c8f51-1e7e65g1f39b8d79d1c25f8d69f1d39-3f1d34d5c49d3c49b7b59c4d39-8g7g61g1f39f8g79-4f1d31-1g1f32a7a61-1c8f53b1c39e7e69f3h49-4c8g41-1e7e63b1d25-1f1d34-5D11.g1f35c8f51b1c39-2d5c41e2e39b7b52a2a49e7e69-3c8e67a2a44g8f69-2b1c35b7b59a2a49b5b49-7e7e61b1c33d5c44a2a49f8b49e2e39b7b59c1d29-6f7f51-1g8f64c1g59-3b1d21g8f69-2d1c21d5c43c2c49-2g8f66c1g59-3e2e32f7f53-1g8f66b1c36b8d79-2f1d33b8d79e1g19-5g2g31-2g8f69D15.b1c36a7a61a2a41c8f51-1e7e68c1g59b8d79c4d54e6d59e2e39-3e2e35d8a59-6c1g51f6e49-2c4c53b8d76c1f48f6h59e2e36g7g67f1d39f8g79e1g19e8g89-5h5f42e3f49-3f4d23h5f69d2f49f6h59-6h2h31-2c8f51c1f49b8d79-3g7g61c1f49-3c4d51c6d59c1f47b8c69e2e39c8g49f1e29-5c1g52f6e49-4e2e32b7b59b2b38c8g49f1e29e7e69e1g19b8d79-6c4d51c6d59-4f3e51b8d79c1f49-3g2g31-2c8f51c4d59-2d5c43D16.a2a49b8a61e2e34c8g49f1c49e7e69-4e2e45c8g49f1c49g4f39g2f39-6D17.c8f58D18.e2e35D19.e7e69f1c49b8d71e1g19f8b49-3f8b49e1g19b8d74d1b31a7a59c3a29b4e79-4d1e25e8g82e3e49f5g69c4d39-4f5g41-1f5g65e3e49e8g89c4d39-5f3h43e8g85-1f5g64-3e8g85d1e26b8d74e3e49f5g69c4d39g6h59-5f5g64f3e59b8d79e5g69h7g69f1d19d8a59c1d29-8f6e41-2f3h43b8d77h4f59e6f59d1c29-4f5g42f2f39-9D17.f3e53b8a61-1b8d75e5c49d7b63c4e59a7a59f2f39f6d79e5d79b6d79e2e49f5g69-9d8c76g2g39e7e59d4e59d7e59c1f49f6d79f1g29f7f65e1g19d7c59-3g7g54c4e39g5f49e3f59-14e7e64f2f39c6c51-1f8b48e2e49f5e49f3e49f6e49c1d27d8d49c3e49d4e49d1e29b4d29e1d29-7d1f32d8d49f3f79e8d89c1g59e4g59f7g79-15f3h41e7e66h4f59e6f59e2e39f8b49f1c49e8g89e1g19b8d79-9f5c83e2e39e7e59f1c49e5d49e3d49-8D16.c8g41f3e59g4h59f2f36f6d79e5c49e7e59-4g2g33-5D15.e2e31b7b59a2a49b5b49c3a29e7e69f1c49-7e2e41b7b59e4e59f6d59a2a49e7e69a4b59d5c39b2c39c6b59f3g59c8b79d1h59g7g69-14f3e51-2e7e63c1g54b8d72c4d53e6d59e2e39f8e79f1d39e8g89d1c29";
c0_opn[12]="-7e2e36d8a59c4d54f6d59d1d29f8b49a1c19-5f3d25f8b49d1c29-6d5c42e2e49b7b59e4e59h7h69g5h49g7g59f3g59h6g59h4g59b8d79e5f64c8b79g2g39c6c59d4d59-5g2g35c8b79f1g29d8b69e5f69-16f8e71e2e39b8d79d1c29-4h7h64g5f65d8f69e2e39b8d79f1d39d5c49d3c49g7g69e1g19f8g79a1c19-11g5h44d5c49e2e49g7g59h4g39b7b59f1e29c8b79h2h49g5g49f3e59-13c4d51c6d51-1e6d58c1g57f8e79d1c24-1e2e35-3d1c22-3d1b31-1e2e34a7a61-1b8d79d1c25b7b61-1f8d69b2b31e8g89f1e29-3f1d34d5c41d3c49-2e8g88e1g19d5c49d3c49a7a65f1d19-2b7b54c4e29-7f1e22e8g89e1g19d5c49e2c49-5g2g41-3f1d34d5c48d3c49b7b59c4d38a7a64e3e49c6c59d4d54c5c49-2e4e55c5d49c3b59-6b5b41-1c8b74e1g15a7a69-2e3e44b5b49c3a49c6c59e4e59f6d59-8c4e21c8b79e1g19-6f8d61e1g19e8g89e3e49-6f8d61-1f8e71-2g2g31b8d79f1g29-4g7g61c1f43f8g79e2e39e8g89-4c4d53c6d59c1f49-3e2e32-3D11.b1d21-1D13.c4d51D14.c6d59b1c39b8c69c1f49a7a62e2e39c8g49f1e29e7e69-5c8f56e2e39e7e69f1b51f6d79-2f1d38f5d39d1d39f8d69f4d69d8d69e1g19e8g89a1c12-1c3b54d6d79f1c19-3f1c13f8c89-13e7e61e2e39f8d69-8D11.d1b31d5c46b3c49c8f59g2g39e7e69f1g29b8d79-7e7e63-2d1c21c8g41-1d5c43c2c49c8f59b1c32e7e69g2g39-3g2g37e7e69f1g29b8d76e1g19f8e79b1c39e8g89-5f8e73e1g19-8e7e62c1g54-1g2g35-2g7g63c1f49b8a61e2e39-2c8f52c2b39d8b69-3d5c41c2c49-2f8g73e2e39e8g89b1c39-7e2e32a7a61b1c32b7b59b2b39c8g49-4b1d21c8f59-2d1c21-1f1d35c8g49b1d29e7e69-5D12.c8f53b1c37e7e69f1d31f5d39d1d39b8d79e1g19-5f3h48f5e44f2f39e4g69d1b39d8b64h4g69h7g69c1d29b8d79e1c19-6d8c75c1d29b8d79c4d59-8f5g41d1b39d8b69h2h39g4h59g2g49h5g69h4g69h7g69-9f5g63d1b34d8b65h4g69h7g69c1d29-4d8c74h4g69h7g69-4h4g65h7g69g2g39b8d79-8c4d51c6d59b1c33-1d1b36d8c79c1d29-5f1d31f5d39d1d39e7e69e1g19b8d79-7c8g41b1c32e7e69h2h39-3d1b32d8b69-2h2h34g4f35d1f39e7e69b1c39-4g4h54-3D11.e7e62b1c32b8d79d1c26f8d69f1d39-3f1d33d5c49d3c49b7b59-6b1d22b8d77f1d39f8d69e1g19e8g89e3e49d5e49d2e49f6e49d3e49-10c6c52-2f1d34b8d78e1g19d5c42d3c49-2f8d67b1c35e8g89e3e49-3b1d24e8g89e3e49-6d5c41d3c49-4g7g61b1c39f8g79f1d36e8g89e1g19c8g49h2h39g4f39d1f39-7f1e23e8g89e1g19-7g2g31c8f59-5D06.c8f51b1c35e7e69g1f39b8c63-1c7c66-4D31.c4d54f5b19a1b11d8d59-2d1a48c7c69a1b16";
c0_opn[13]="d8d59g1f39b8d79-4d5c63b8c69a1b19-8D20.d5c41b1c31a7a63a2a49-2e7e52-1g8f64e2e39e7e69-4e2e32a7a61f1c49-2c7c51f1c49c5d49e3d49d8c79-5e7e51f1c49e5d49e3d49f8d62-1g8f67b1c33-1g1f36f8e79e1g19e8g89-9e7e62f1c49a7a62g1f39c7c59e1g19-4c7c53g1f39a7a69e1g19g8f69-5g8f64g1f39c7c59e1g19a7a69-7g8f65f1c49e7e69b1c31-1g1f39a7a62e1g19c7c59-3c7c57d1e21a7a69d4c59f8c59-4e1g19a7a68a2a43b8c69d1e29-3c4b33b8c65b1c39-2c5d44e3d49-3c4d31-1d4c51d8d19f1d19f8c59-5b8c61-8e2e41b8c61c1e35g8f69b1c35e7e59d4d59-3f2f34e7e59d4d59-5g1f34c8g49d4d59c6e59c1f49e5g69-7c7c51d4d58e7e63-1g8f66b1c39b7b59c1f45-1e4e54b5b49e5f69b4c39-8g1f31c5d49-3e7e53g1f39e5d48f1c49b8c65e1g19c8e69c4b53f8c59-2c4e66f7e69d1b39d8d79b3b79a8b89b7a69g8f69b1d29f8d69-13f8b44b1d26b8c69e1g19g8f69e4e59f6d59d2b39d5b69-8c1d23b4d29b1d29-6f8b41-3g8f63b1c31e7e59-2e4e58f6d59f1c49b8c61-1d5b68c4b35b8c69g1e24c8f59b1c39e7e69a2a39-5g1f35c8g49f3g59g4d19b3f79e8d79f7e69d7e89e6f79-11c4d34b8c69c1e34c6b49d3e49f7f59e5f69e7f69-6g1e25c8g49f2f39g4e69b1c39-13D21.g1f35a7a61a2a41g8f69e2e39-3D22.e2e38c8g43f1c49e7e69h2h39g4h59-5e7e64f1c49c7c57e1g19g8f69c4b39-4g8f62-3g8f62f1c49e7e69e1g19c7c59-7D21.c7c51d4d54e7e69b1c39e6d59d1d59d8d59c3d59-7e2e35c5d49f1c49d8c79-5c7c61e2e39c8e69-3e7e61e2e39a7a61f1c49c7c59e1g19g8f69-5c7c54f1c49a7a69e1g19g8f69d4c59-6g8f64f1c49c7c59e1g19a7a69c4b39-8D23.g8f66D24.b1c31a7a65a2a43b8c69-2e2e46b7b59e4e59f6d59a2a49d5c36b2c39-2e7e63a4b59-8c7c51d4d59e7e69e2e49-4c7c61a2a49c8f59-3e7e62e2e49f8b49-4D23.d1a41c7c69a4c49-3D25.e2e37a7a61f1c49b7b53-1e7e66e1g19c7c59-5c7c51f1c49e7e69e1g19-4c8g41f1c49e7e69b1c32b8d79-2d1b31g4f39g2f39b8d79-4e1g12b8d79-2h2h33g4h59b1c39b8d79-7D26.e7e67f1c49a7a62a2a41c7c59e1g19b8c69-4e1g18b7b51-1c7c58c4b34-1d4c55d8d19f1d19f8c59-7c7c57d1e21a7a69d4c59f8c59e1g19-5e1g19D27.a7a69a2a42b8c69b1c31-1d1e28c5d47f1d19f8e79e3d49e8g89b1c39c6b45-1f6d54-7d8c72-4c4b32b7b52a2a49b5b49b1d29-4b8c64b1c36c5d49e3d49-3d1e23-2c5d42e3d49b8c69b1c39f8e79-6c4d31-1D28.d1e21b7b59D29.c4b39c8b79f1d19b8d79-6D27.d4c52d8d16f1d19f8c59b1d29-4f8c53d1d89e8d89-4e3e41-2D26.b8c61d1e29c5d49";
c0_opn[14]="f1d19f8e79e3d49e8g89-11D25.g7g61f1c49f8g79-7D08.e7e51d4e59d5d49a2a31b8c69-2g1f39b8c69a2a32c8g49-2b1d21-1D09.g2g36c8e65b1d29d8d79f1g29-4c8g44f1g29d8d79e1g19-9D08.e2e31e5d49-3D30.e7e63D31.b1c36a7a61-1D32.c7c51c4d58c5d42d1a45c8d79a4d49e6d59d4d59b8c69g1f39g8f69d5d19f8c59e2e39d8e79f1e29e8c89-14d1d44b8c69d4d19e6d59d1d57c8d79g1f39g8f69-4e2e32-6e6d57g1f39b8c69c1f41g8f69e2e39-3c1g51f8e79g5e79g8e79-4e2e31g8f69f1e29-3D33.g2g38c5c41f1g29f8b49e1g19g8e79-5g8f68f1g29D34.f8e79e1g19e8g89c1g56c5c42f3e59c8e69-3c5d47f3d49h7h69g5e39f8e89a1c19c8g44-1e7f85-8d4c53e7c59c1g59d5d49g5f69d8f69c3d59f6d89f3d29-19D32.e2e31g8f69g1f39a7a62-1b8c67a2a39-5g1f31b8c69c4d59e6d59-5D31.c7c62c1f41-1c4d51e6d59c1f43c8f54e2e39-2f8d65f4d69d8d69-4d1c22f8d69g1f39-3g1f34c8f54c1f49-2f8d62-1g8f62c1g59-5e2e34b8d71-1f7f51f1d33g8f69g1e29f8d69-4f2f42-1g1f32-1g2g41-2f8d61f1d35f7f59-2g1f34f7f59-3g8f67g1f39b8d79d1c25f8d69b2b32e8g89f1e29-3f1d33e8g89e1g19d5c49d3c49b7b59c4e29c8b79-8f1e21e8g89e1g19d5c49e2c49-5g2g41-3f1d34d5c48d3c49b7b59c4d38a7a64e3e49c6c59e4e59c5d49c3b59-6c8b75e1g15a7a69-2e3e44b5b49c3a49c6c59e4e59f6d59-8c4e21c8b79-5f8d61-6e2e41d5e47c3e49f8b49c1d28d8d49d2b49d4e49f1e27b8a69b4a59-3g1e22-5e4c31-4f8b42-2g1f33d5c44a2a46f8b49c1d21-1e2e37b7b59c1d29a7a59a4b59b4c39d2c39c6b59b2b39c8b79b3c49b5b49c3b29g8f69f1d39-15e2e41-3c1g51-1e2e31b7b59a2a49f8b49c1d29a7a59a4b59b4c39d2c39c6b59b2b39c8b79b3c49b5b49c3b29g8f69f1d39-17e2e41b7b59-3f7f51-1g8f64c1g55b8d71e2e39-2d5c43e2e49b7b59e4e59h7h69g5h49g7g59f3g59h6g59h4g59b8d79-11f8e71-1h7h63g5f64d8f69e2e39b8d79-4g5h45d5c49e2e49g7g59h4g39b7b59-8c4d51e6d59c1g59f8e79-4e2e32b8d79d1c24f8d69-2f1d35d5c49d3c49b7b59c4d39-10d5c41-1f7f51c1f42c7c69-2g1f34c7c65-1g8f64-2g2g32g8f69f1g29c7c69-5f8b41a2a31b4c39b2c39-3c4d51e6d59-2e2e32g8f69-2g1f34g8f69c1g59-4f8e71c1f41g8f69e2e39e8g89-4c4d52e6d59c1f49c7c65d1c22-1e2e37c8f59g2g49f5e69-5g8f64e2e39c8f53-1e8g86f1d39c7c59-6g1f31-3g1f37g8f69c1f42e8g89e2e39b8d72-1c7c57d4c59e7c59a2a35b8c69-2c4d54f6d59c3d59e6d59a2a39b8c69-12c1g56b8d71e2e39e8g89-3e8g84e2e39b7b61-1b8d73a1c19";
c0_opn[15]="-2h7h65g5h49b7b67f1d39-2f6e42h4e79d8e79-7h7h64g5f62e7f69e2e39e8g89a1c19-5g5h47e8g89e2e39b7b68a1c11c8b79-2c4d52f6d59h4e79d8e79c3d59e6d59-6f1d33c8b79e1g19b8d79d1e29-5f1e22c8b79h4f69e7f69c4d59e6d59b2b49-8f6e41h4e79d8e79-8c4d51e6d59c1g59c7c67d1c29g7g69e2e39c8f59-5e8g82e2e39-5d1c21-1e2e31e8g89-5D35.g8f64c1f41-1D50.c1g54D51.b8d72c4d52e6d59e2e39c7c66f1d39f8e79d1c29-4f8e73f1d39-5e2e35D52.c7c66c4d52e6d59f1d39-3g1f37d8a58f3d29f8b49d1c29e8g89f1e29-6f8e71-3D51.f8e73g1f39e8g89a1c19c7c69f1d39-7g1f32c7c66e2e39d8a59-3f8e73e2e39e8g89-5D50.c7c51-1c7c61e2e39b8d79c4d53-1g1f36d8a59f3d29-6f8b41e2e39-2f8e76c4d51e6d59e2e39c7c64-1e8g85f1d39-5D53.e2e37b8d71g1f39c7c62-1e8g87a1c19c7c69-5c7c61g1f39b8d79-3D54.e8g85a1c11-1c4d51e6d59f1d39-3d1c21-1D55.g1f38b7b61-1D60.b8d74D63.a1c17c7c69D64.f1d39D66.d5c49D67.d3c49f6d59g5e79D68.d8e79e1g19d5c39c1c39-11D61.d1c22-2D55.h7h64g5f62e7f69-2D56.g5h47D58.b7b67D59.c4d59f6d59h4e79d8e79-5D56.f6e42h4e79D57.d8e79-7D53.h7h61g5h49e8g89g1f39b7b69c4d59-7D50.g1f32b8d71e2e39e8g89-3c7c61e2e39-2e8g85e2e39b8d74a1c19-2h7h65g5h49b7b69-5h7h61g5h49e8g89e2e39-7D35.c4d52e6d59D36.c1g59b8d71e2e39c7c66f1d39f8e79d1c29e8g89-5f8e73f1d39-4c7c62d1c23b8a63-1f8e76e2e39b8d79f1d39-5e2e36b8d71-1c8f53d1f39f5g69g5f69d8f69f3f69g7f69-7f8e75d1c23-1f1d36b8d75-1e8g84-5f8e76d1c21c7c65e2e39-2e8g84e2e39-3e2e38b8d71f1d39e8g89-3c7c64d1c23b8d76f1d39e8g89-3e8g83f1d39b8d79-4f1d36b8d75d1c29-2e8g84d1c29b8d79-5e8g84d1c21-1f1d38b8d75d1c22-1g1e23-1g1f34c7c69-3c7c63d1c29b8d76g1f39f8e89-3h7h63-3h7h61g5h49-4h7h61g5h49-6D35.f6d51e2e49d5c39b2c39-5e2e31f8e79-2D37.g1f32b8d72c1f41-1c1g54c7c65e2e39d8a59-3f8e74e2e39-3c4d52e6d59c1f49-3e2e31-2D40.c7c51D41.c4d59-2D43.c7c62c1g53b8d79e2e39d8a59-4c4d51e6d59-2D44.e2e34D45.b8d79d1c24f8d69-2D46.f1d35-4D44.d5c41-1D38.f8b41-1D37.f8e74c1f43c7c62e2e39-2e8g87e2e39c7c59d4c59e7c59-6c1g54b8d71-1e8g85e2e39b8d74-1h7h65g5h49-4h7h62g5h49e8g89e2e39-5e2e31e8g89f1d39-7D30.c4d51e6d59b1c39c7c51-1c7c64c1f42-1d1c23-1g1f34-2g8f64c1g59f8e79e2e39-7e2e31g8f69b1c39-3g1f32c7c51c4d58e6d59b1c33b8c69g2g39g8f69";
c0_opn[16]="f1g29f8e79e1g19e8g89c1g56c5d49f3d49h7h69g5e39-5d4c53e7c59-10c1g51-1g2g36b8c67f1g29g8f69e1g19f8e79b1c38e8g89c1g56c5d49f3d49h7h69g5e39f8e89-6d4c53e7c59c1g59d5d49-6d4c51e7c59-7g8f62f1g29f8e79e1g19e8g89b1c39b8c69-10e2e31g8f69-3c7c62b1c31d5c44a2a49f8b49e2e39b7b59c1d29a7a59a4b59b4c39d2c39c6b59-11f7f51-1g8f64c1g55-1e2e34-3b1d21f7f54g2g39g8f69f1g29f8d69e1g19e8g89-7g8f65e2e34-1g2g35-3c1g51-1d1c23d5c41c2c49g8f69-3f7f51-1f8d61-1g8f66b1d21-1c1g54b8d75-1h7h64-2g2g34d5c49c2c49b7b59-6e2e32f7f52f1d39g8f69e1g19f8d69b2b39-6f8d61f1d39f7f59-3g8f66b1c35b8d79d1c26f8d69-2f1d33-3f1d34b8d79e1g19-5g2g31d5c49f1g29-4d5c41-1f7f51-1f8e71b1c35g8f69c1g59-3g2g34g8f69f1g29e8g89e1g19-6g8f65b1c35b8d71c1g56f8e79e2e39-3c4d53e6d59-3c7c51c4d59-2c7c62c1g53b8d73-1h7h66g5f69d8f69e2e39-5c4d51e6d59-2e2e35b8d79d1c25f8d69f1d39e8g89e1g19-5f1d34d5c49d3c49b7b59c4d39-8d5c41e2e39-2f8b41c1g59-2f8e75c1f43e8g89e2e39b8d72-1c7c57d4c59e7c59a2a33-1c4d56f6d59c3d59e6d59a2a39b8c69f1d39-13c1g55b8d71e2e39-2e8g85e2e39b8d75a1c19c7c69f1d39-4h7h64g5h49b7b69-5h7h63g5f63e7f69e2e39e8g89-4g5h46e8g89e2e39b7b69f1d39-7c4d51e6d59-2e2e31-3c1g51b8d72b1c35-1e2e34-2c7c61-1f8e76b1c34e8g89e2e39-3e2e35e8g89b1c39-5c4d51e6d59-2e2e31c7c59-2g2g33b8d71f1g29-2c7c51c4d59-2c7c61d1c22-1f1g27b8d79-3d5c42d1a42b8d79-2f1g27a7a63e1g19b8c69-3b8c64d1a49-2c7c52-3f8b41c1d29b4e79f1g29e8g89e1g19c7c69-7f8e74f1g29e8g89d1c21-1e1g19b7b61-1b8d71d1c29c7c69-3c7c62d1c29-2d5c45d1c29a7a69a2a45c8d79c2c49d7c69c1g59-5c2c44b7b59c4c29c8b79c1d29b7e49c2c19-17g2g31g8f69f1g29f8e79g1f39e8g89e1g19-8D06.g8f61b1c34c7c62-1e7e67c1g59f8e79-4c4d54d8d52b1c39d5d89-3f6d57e2e46d5b64-1d5f65b1c39-3g1f33-3g1f31-3D00.e2e31b8c61-1c7c51c2c39-2c7c61-1c8f51-1e7e61f1d39-2g8f66c2c41-1f1d37c7c53c2c39b8c69-3e7e64b1d26-1f2f43-2g7g62-2f2f41-1g1f31-3e2e41c7c61-1d5e46b1c39e7e52-1g8f67f2f39e4f39g1f39c8g49-7e7e62-2f2f41g8f69-2D02.g1f32a7a61-1b8c61c1f44c8f51-1c8g47b1d22e7e69-2e2e37e7e69c2c44-1f1e25f8d69-5g8f61-2c1g51-1c2c42c8g49b1c33-1c4d56g4f39-4e2e31c8g49f1e29-3g2g31c8g49f1g29d8d79-5b8d71-1c7c51c2c31e7e69c1f49-3c2c43";
c0_opn[17]="d5c43-1e7e66c4d59e6d59b1c35b8c69-2g2g34-5d4c51e7e69-2e2e32b8c63-1e7e62-1g8f63-2g2g31-2c7c61b1d21-1c1f41c8f52e2e39e7e69-3d8b62d1c19-2g8f64e2e39-3c1g51h7h69-2c2c31c8f54c1f49-2g8f66-2c2c44d5c41-1e7e64b1c32d5c46a2a49f8b49-3g8f63-2b1d21g8f69-2c4d51e6d59-2d1c22g8f69-2e2e32g8f69b1c39b8d79-5g8f64b1c36a7a62-1d5c43a2a49c8f59e2e39e7e69f1c49-6e7e64c1g55-1e2e34b8d79-4c4d51c6d59b1c39b8c69c1f49-5d1c21-1e2e32c8f55-1e7e64-4e2e31c8f52-1c8g42-1e7e61-1g8f64c2c46-1f1d33-3g2g31c8f52f1g29-2c8g41-1g8f65f1g29c8f59e1g19e7e69-7c8f51c1f42e7e69e2e39-3c2c46e7e69b1c37c7c69d1b39d8b69c4c59-5d1b32-3e2e31-2c8g41f3e59-2e7e61c1f41c7c53e2e39-2f8d62f4g39-2g8f63e2e39-3c1g51f8e79g5e79d8e79-4c2c31-1c2c44c7c51c4d57e6d59b1c36b8c69g2g39g8f69f1g29f8e79e1g19e8g89-8g2g33b8c69f1g29g8f69-6e2e32-2c7c63b1c32-1d1c23g8f69-2e2e33g8f69-3d5c41e2e39c7c59f1c49a7a69-5f8e71b1c39g8f69c1g59-4g8f62b1c38f8e79c1g59-3g2g31-3e2e31c7c54-1g8f65f1d39c7c59-4g2g31c7c53f1g29b8c69e1g19-4f7f51f1g29-2g8f64f1g29f8e79e1g19e8g89-7f7f51-1g7g61-1g8f66b1d21-1c1f41c7c52c2c33b8c64e2e39-2d8b65d1b39-3e2e36b8c67c2c39d8b69d1b39c5c49-5d8b62-3c7c61b1d21-1c2c33c8f59-2e2e34c8f59-3c8f51e2e39e7e69b1d22-1f1d34f5d39-2f1e22-4e7e63e2e39c7c53c2c39b8c69b1d29-4f8d63f4g39-2f8e73h2h39-4g7g61e2e39f8g79-4D03.c1g51b8d71e2e39e7e69-3c7c61-1c8f51-1e7e64b1d22f8e79e2e39-3e2e37b8d72-1c7c51c2c39-2f8e76b1d22-1f1d37e8g89-5f6e43g5f46c7c57e2e39d8b69d1c19b8c69c2c39c8f59-7c8f52-2g5h43c7c59-4D02.c2c31c7c62-1e7e64c1g59-2g7g62-2c2c45c7c64b1c35a7a61a2a42e7e69-2c4c52-1c4d52c6d59-2e2e32b7b59-3d5c44a2a48c8f59e2e36e7e69f1c49f8b49e1g19b8d74d1e29f5g69-3e8g85d1e29f5g69-8f3e52b8d74e5c49d8c79g2g39e7e59d4e59d7e59c1f49-8e7e65f2f39f8b49-4f3h41-3e2e31b7b59-2e2e41b7b59e4e59f6d59-5e7e63c1g54b8d72e2e39-2d5c43e2e49b7b59e4e59h7h69g5h49g7g59-7h7h64g5f69d8f69-4c4d51e6d59-2e2e34b8d79d1c24f8d69f1d39-3f1d35d5c49d3c49b7b59c4d39-9c4d51c6d59b1c39b8c69c1f49a7a62e2e39c8g49-3c8f55e2e39e7e69f1d39f5d39d1d39f8d69f4d69d8d69e1g19e8g89a1c19-12e7e61e2e39-7d1b31d5c49b3c49c8f59-4d1c21d5c43c2c49c8f59g2g39-4e7e62-1g7g63c1f49-3e2e32";
c0_opn[18]="a7a61-1c8f52b1c39e7e69f1d34-1f3h45-4c8g41-1e7e63b1c33b8d79-2b1d22b8d79f1d39-3f1d33b8d79e1g19-4g7g61b1c39f8g79-4g2g31-2D25.d5c41b1c32a7a69a2a44-1e2e45b7b59e4e59f6d59a2a49-7d1a41c7c69a4c49c8f59-4e2e36a7a61f1c49-2c8g41f1c49e7e69-3e7e67f1c49a7a62e1g19c7c59-3c7c57e1g19a7a69a2a43b8c69d1e29-3c4b33-1d4c53f8c59-9D02.e7e63b1c36b8d71c1g57c7c64-1f8e75e2e39-3c4d52e6d59-3c7c51c4d59-2c7c62c1g53b8d79-2c4d51e6d59-2e2e35b8d79d1c24f8d69-2f1d35d5c49d3c49b7b59c4d39-8d5c41e2e39-2f8b41-1f8e74c1f42e8g89e2e39c7c59d4c59-5c1g56b8d71e2e39e8g89-3e8g85e2e39b8d74a1c19-2h7h65g5h49b7b69-5h7h62g5h49e8g89e2e39b7b69-6c4d51e6d59c1g59-3e2e31e8g89-4c1g51b8d72-1f8e77b1c35e8g89-2e2e34-3c4d51e6d59-2e2e31-1g2g31c7c51-1c7c61-1d5c42f1g29-2f8e75f1g29e8g89e1g19b8d73-1d5c46d1c29a7a69-10D04.e2e31c7c51b2b33-1c2c34-1d4c52-2c7c61c2c43-1f1d36c8g49b1d29-4c8f51c2c47c7c66b1c36e7e69-2c4d53-2e7e63-2f1d32f5d39-3c8g41c2c47-1f1e22-2D05.e7e63b1d21-1c2c41-1f1d38b8d71-1c7c55b2b34b8c69-2c2c35b8c69b1d29-4f8d61-1f8e71-3D04.g7g61c2c44-1f1d35f8g79-4D02.g2g31c7c51-1c7c62f1g29c8f56e1g19e7e69c2c49-4c8g43-3c8f52f1g29e7e69e1g19f8e79-5e7e62f1g29c7c52-1f8e77e1g19e8g89c2c49d5c49-7g7g61f1g29f8g79e1g19e8g89c2c49c7c69-10A84.g2g31c7c61-1c8f51-1e7e61-1g8f66f1g29e7e69-5A41.d7d61b1c31g7g66-1g8f63-2c1g51b8d73-1c7c61-1g7g62-1h7h62-2A42.c2c42b8d71b1c39-2c7c61-1e7e55b1c31e5d49d1d49b8c66d4d29g8f69-3g8f63-4d4d51f7f59b1c36g8f69-2e2e43-3d4e52d6e59d1d89e8d89b1c37c7c62-1c8e67b2b33-1e2e32-1e2e43-3g1f32f7f69b1c39-7e2e31-1g1f34b8c61-1b8d71b1c39g8f69-3e5d41f3d49g7g69-3e5e46f3d22f7f59e2e39g8f69b1c39-5f3g57f7f59b1c36c7c64-1f8e75g5h39g8f69-4g2g33f8e79-7f7f51b1c34g8f69-2g1f35g8f69-3g7g62b1c38f8g79e2e48b8c63c1e39e7e59d4d59c6e79-5b8d71-1e7e51-1g8f63-2g1f31-3e2e41f8g79b1c39-4g8f61b1c39b8d73e2e49e7e59-3g7g66e2e49f8g79-6A41.e2e31g8f69-2e2e42b8d71-1c7c61-1e7e51g1f39-2g7g62b1c35f8g79c1e39a7a64-1c7c65-4c2c42f8g79b1c39-3g1f31f8g79-3g8f66b1c37b8d71f2f43-1g1f36e7e59f1c49f8e79e1g19e8g89-7c7c62f2f46d8a59f1d39e7e59g1f39c8g49-6g1f33c8g49-3e7e51d4e55d6e59d1d89e8d89c1g53-1f1c46c8e69c4e69";
c0_opn[19]="f7e69-8g1f34b8d79f1c49f8e79e1g19e8g89f1e19c7c69a2a49-10g7g64c1e32c7c65d1d29-2f8g74d1d29-3c1g51f8g79-2f2f42f8g79g1f39c7c54-1e8g85f1d39-5g1f33f8g79c1e32-1f1e27e8g89e1g19-5g2g31f8g79f1g29e8g89g1e29e7e59-8f1d31e7e59c2c39-3f2f31c7c52d4d59-2d6d52e4e59-2e7e53-1g7g61-4g1f33b8c61-1b8d71c2c45e7e59-2e2e44-2c7c61-1c8g43b1d21-1c2c45b8d75b1c34e7e59-2d1b33a8b89-2e2e42-2c7c61b1c39-2g4f32e2f39c7c65b1c39-2g7g64-4e2e31-1e2e42g8f69b1c37e7e69h2h39g4h59-4h2h32g4h59-4g2g31g4f39e2f39-4f7f51g2g39g8f69f1g29g7g69-5g7g63c1f41f8g79e2e39-3c2c46b8d71-1f7f51-1f8g78b1c38b8d72e2e49e7e59f1e29-4c8g41e2e39-2e7e51-1g8f64e2e49e8g89f1e29e7e59e1g19-7e2e41-3e2e41f8g76-1g8f63-2g2g32f8g79f1g29b8d73-1g8f66e1g19e8g89c2c49-8g8f62c1g51b8d79-2c2c47b8d72b1c39c7c63-1e7e56e2e49-4g7g67b1c39c8f51-1f8g78e2e49e8g89f1e29e7e59e1g19b8c69-10g2g31g7g69f1g29f8g79e1g19e8g89-8g2g31b8d71-1e7e51-1f7f51-1g7g65f1g29f8g79g1f39g8f69e1g19e8g89c2c49-8g8f61f1g29-4A40.e7e51d4e59b8c69g1f39d8e79-5e7e61b1c31d7d59-2b1d21d7d59-2c1f41c7c55-1f7f55-2c2c46b7b61a2a32c8b76b1c39f7f58d4d59g8f69g2g39b8a69-5g8f61-3f7f52b1c39g8f69-3g7g61b1c39f8g79-4b1c32c8b78a2a32f7f59-2e2e44f8b49f1d39f7f59-4g1f33f8b49-3f8b41-2e2e42c8b79b1c32f8b49f2f39-3f1d37b8c63g1e29c6b49-3f7f54e4f59f8b49e1f19g8f69-5f8b41c1d29-5g1f31c8b79a2a32-1b1c32f8b49-2g2g35f8b49c1d29b7f39e2f39b4d29d1d29-10A43.c7c51d4d59e6d59c4d59d7d69b1c39g7g68e2e46f8g79f1d39-3g1f33f8g79-3g8e71-7A40.c7c61-1d7d51b1c36c7c51c4d59e6d59g1f39b8c69g2g39g8f69f1g29f8e79e1g19e8g89c1g59-12c7c62e2e35g8f69g1f39b8d79-4g1f34-2f7f51-1f8e71g1f39g8f69c1g59h7h69g5h49e8g89-7g8f63c1g54b8d75e2e39-2f8e74-2c4d53e6d59c1g59f8e79e2e39-5g1f31-3c4d51e6d59b1c39-3g1f32c7c52c4d59e6d59g2g39-4c7c63d1c29-2g8f64b1c35f8e79-2g2g34-4d7d61-1A84.f7f52b1c32g8f69c1g51-1d1c21-1e2e31-1g1f34f8b49d1b39-3g2g32d7d59-4g1f32g8f69b1c32f8b49-2g2g37c7c61f1g29d7d59e1g19f8d69-5d7d55f1g29c7c69e1g19f8d69b2b39-6f8e72f1g29e8g89e1g19-7g2g35g8f69f1g29c7c62b1d21d7d59-2d1c21d7d59-2g1f34d7d59e1g19f8d69b2b35d8e79-2c1f44d6f49g3f49e8g89-8g1h32d7d59-3d7d52g1f34c7c69e1g19f8d69b2b39d8e79";
c0_opn[20]="-6g1h35c7c69d1c24-1e1g15f8d69-5f8b41b1d25e8g89g1f39-3c1d24-2f8e73b1c31e8g89-2g1f38d7d62e1g19e8g89b1c39-4e8g87e1g19d7d69b1c39-10A40.f8b41b1c31c7c54-1f7f55-2b1d21-1c1d26a7a55b1c32-1g1f36d7d67g2g39b8c69f1g29e6e59-5g8f62-2g2g31-2b4d21d1d29-2d8e73g1f36g8f69-2g2g33-4g7g61-1g8f62b1c35c7c51d4d59e6d59c4d59d7d69-5d7d51c1g52-1c4d54e6d59c1g59c7c69-4g1f32-2f8b48c1g51-1d1c23c7c53d4c59b8a65-1e8g84a2a39b4c59g1f39-6d7d51c4d59-2e8g85a2a39b4c39c2c39b7b69c1g59c8b79-8e2e34b7b62f1d34c8b79-2g1e25-2c7c52f1d39-2e8g84f1d37d7d59g1f39c7c59e1g19-5g1e22-3f2f31d7d59a2a39-3g1f31b7b65-1c7c55-4g1f34b7b64a2a32c8a63-1c8b76b1c39d7d59-4b1c32c8b73-1f8b46-2g2g34c8a65b2b39-2c8b74f1g29f8e79e1g19e8g89b1c39f6e49-9c7c51d4d59e6d59c4d59d7d69-5d7d52b1c38c7c63-1f8e76c1f43-1c1g56-3g2g31-2f8b42b1d23b7b69a2a39b4d29-4c1d26c7c54d2b49c5b49-3d8e75g2g39-5g2g31c7c52-1d7d55f1g26-1g1f33-2f8b42c1d29-5e2e31g8f69-2e2e41b7b61-1c7c51d4d59e6d59e4d59d7d69-5d7d58b1c33d5e41c3e49-2f8b44e4e59c7c59a2a39b4c39b2c39-6g8f64c1g57d5e49c3e49-3e4e52f6d79f2f49c7c59-6b1d22c7c52e4d54-1g1f35-2d5e42d2e49-2g8f64e4e59f6d79f1d39c7c59c2c39b8c69g1e29-9e4d51e6d59f1d35b8c69-2g1f34-3e4e51c7c59c2c39b8c67g1f39c8d74-1d8b65-3d8b62g1f39-7g1f32b7b51-1b7b61e2e46c8b79f1d39c7c59c2c39-5g2g33c8b79-3c7c51c2c32b8c63-1d7d53-1g8f63-2c2c41c5d49f3d49g8f69-4e2e33g8f69c2c42-1f1d37b7b69e1g19c8b79-6e2e41c5d49f3d49-3g2g31g8f69-3d7d51c1f41g8f69-2c1g51-1c2c45c7c64e2e39-2g8f65b1c39-3e2e31-1g2g31g8f69-3f7f52b1c31-1c1f41g8f69e2e39-3c1g51f8e79-2c2c41g8f69b1c36f8b49-2g2g33-3d4d51-1g2g35b7b61-1g8f69f1g29d7d55c2c42c7c69e1g19f8d69-4e1g17f8d69c2c49c7c69b2b39d8e79c1b29-8f8e74e1g19e8g89c2c49d7d69b1c39-10g8f63c1f41b7b69e2e39c8b79-4c1g52c7c54c2c33-1e2e36-2d7d51e2e39-2f8e72-1h7h62g5h49-3c2c31-1c2c43b7b64a2a32-1b1c33f8b49-2g2g34c8a64-1c8b75f1g29-4c7c51-1d7d52b1c39-2f8b42c1d29d8e79g2g39-5e2e31b7b66f1d39c8b79e1g19-4c7c53f1d39-3g2g31b7b53f1g29c8b79e1g19-4b7b62f1g29c8b79-3d7d53f1g29-5g2g31c7c53g1f39-2d7d51f1g29-2f7f52f1g29g8f69g1f39-4g8f62f1g29d7d59g1f39-6A80.f7f51b1c31d7d54c1f44c7c64e2e39g8f69f1d39-4g8f65";
c0_opn[21]="e2e39e7e69-4c1g54c7c63e2e39-2g7g64e2e39-2g8f62g5f69e7f69e2e39-5g1f31-2g7g61-1g8f65c1g59d7d56f2f31-1g5f68e7f69e2e39c7c63f1d39f8d69-3c8e66d1f32-1f1d37b8c66-1d8d73-7e7e62e2e49f5e49c3e49f8e79g5f69e7f69g1f39-8g7g61-4c1f41g8f69-2c1g51c7c61e2e39-2d7d51e2e39-2d7d61-1g7g64b1c33d7d53-1f8g76e2e49f5e49c3e49d7d59-6b1d23f8g79e2e49f5e49d2e49d7d59-6e2e32f8g79-2h2h41-2g8f61g5f69e7f69e2e39d7d59-5h7h62g5h49g7g59e2e35g8f69h4g39-3h4g35g8f69e2e39-7c2c31g8f69-2A84.c2c41d7d61-1e7e61b1c35g8f69-2g1f31-1g2g33g8f69f1g29-4A85.g7g61b1c36g8f69-2g2g33-2A84.g8f68b1c35d7d61g1f39g7g69-3e7e63g1f35-1g2g34-2A85.g7g65f2f31-1g1f32f8g79g2g39e8g89f1g29d7d69e1g19-7g2g35f8g79f1g29d7d62-1e8g87g1f37d7d69e1g19-3g1h32-5h2h41-3A84.g1f31e7e63g2g39-2g7g66g2g39f8g79f1g29e8g89e1g19d7d69b1c39-9A86.g2g33A90.e7e62f1g29d7d59-3A86.g7g67A87.f1g29f8g79b1c33e8g89g1f39d7d69e1g19-5A88.g1f34A89.e8g89e1g19d7d69b1c39d8e89d4d59-7A87.g1h31-7A80.d1d31d7d59-2e2e31g8f69-2e2e41A82.f5e49b1c39A83.g8f69c1g58b8c66d4d59c6e59d1d49e5f79g5f69e7f69c3e49-8c7c62f2f39-2g7g61-2f2f31d7d59-6A80.g1f31d7d61-1e7e61g2g39g8f69f1g29-4g7g61g2g39f8g79-3g8f68c1f41-1c1g51e7e69b1d29f8e79g5f69e7f69e2e49-7c2c41e7e62b1c39-2g7g67b1c34f8g79-2g2g35f8g79f1g29e8g89e1g19d7d69b1c39-9e2e31-1g2g36e7e62f1g29d7d54e1g19f8d69c2c49c7c69-5f8e75e1g19e8g89c2c49-6g7g67c2c41-1f1g29f8g79c2c41e8g89-2e1g18e8g89b2b32d7d69c1b29-3c2c47d7d69b1c39b8c63d4d59-2c7c62-1d8e83d4d59-13A81.g2g33d7d51-1d7d61-1e7e61f1g29g8f69-3g7g61f1g29f8g76c2c42-1g1f37g8f69e1g19e8g89-5g8f63c2c45f8g79-2g1f34f8g79e1g19-6g8f68c2c41-1f1g29d7d61g1f39g7g69e1g19f8g79c2c49e8g89-7e7e62c2c44c7c62-1d7d53g1h39c7c69-3f8b41-1f8e72g1f39e8g89e1g19-5g1f34d7d55e1g19f8d69c2c49c7c69b2b39d8e79-7f8e74e1g19e8g89c2c49d7d69b1c39-7g1h31f8e79-3g7g67b1d21-1b2b31f8g79c1b29e8g89g1f39-5c2c31f8g79b1d21-1d1b38b8c64-1c7c62-1d7d53-4c2c42f8g79b1c37d7d62g1f39e8g89e1g19-4e8g87g1f34d7d69e1g19d8e89-4g1h35d7d69d4d59-5g1f31e8g89e1g19d7d69b1c39-5g1h31-3g1f34f8g79c2c41e8g89-2e1g18e8g89b1d21-1b2b31d7d69c1b29d8e89-4b2b41d7d69c1b29-3c2c46d7d69b1c39b8c63d4d59c6a54";
c0_opn[22]="-1c6e55f3e59d6e59-5c7c62d4d59-2d8e84c3d52f6d59c4d59-3d4d57a7a55-1b8a64-10g1h31f8g79c2c31-1e1g11e8g89-2h3f46b8c66-1d7d63-6g1f31g7g69-4A80.g2g41d7d51-1f5g48-2h2h31d7d51-1d7d63-1g8f65g2g49-4A40.g7g61b1c31f8g79e2e49-3c1f41f8g79-2c1g51f8g79-2c2c31f8g79-2c2c44c7c51d4d59-2d7d61b1c39-2f7f51b1c39-2f8g79b1c35c7c52d4d58d7d62e2e49e7e64-1g8f65-3g7c37b2c39f7f59e2e44f5e49f2f39-3g1f32-1h2h43g8f69-6e2e31-1g1f31c5d49f3d49b8c69-5d7d66e2e47b8c63c1e36e7e59d4d57c6e79g2g49-3g1e22-3d4d53c6d49c1e39c7c59g1e29d8b69-7b8d72c1e32e7e59-2f1e22-1g1f35e7e59f1e29-4e7e51d4d52-1d4e53d6e59d1d89e8d89f2f49-5g1f34-2g8f62f1e23e8g89-2f2f33e8g89c1e39-3g1f33e8g89f1e29e7e59-6g1f32b8d72e2e49-2c8g42e2e39-2g8f64e2e49e8g89f1e29-5g2g31-2g8f61e2e49d7d69f1e23-1g1f36e8g89f1e29e7e59-8e2e42b8c61c1e39-2c7c51d4d59d7d69b1c39-4d7d67b1c39b8c62c1e35e7e59d4d59c6e79-4d4d54c6d49c1e39c7c59g1e29d8b69-7b8d71g1f39e7e59f1e29-4e7e52d4e54d6e59d1d89e8d89f2f49-5g1f35-2g8f63f2f34e8g89c1e39-3g1f35e8g89f1e29e7e59-6g1f31-3g1f31c7c52d4d59d7d69e2e49-4d7d65b1c35b8d73-1c8g43-1g8f62-2e2e41-1g2g33g8f69f1g29e8g89-5g8f61b1c39e8g89-4g2g31c7c54d4d59-2d7d65f1g29-4g8f61b1c39d7d52-1f8g77e2e49d7d69f2f35-1g1f34-7e2e31f8g79-2e2e42c7c51-1c7c61-1d7d61b1c36f8g76c1e39-2g8f63-2c2c43f8g79b1c39g8f69-5f8g78b1c34c7c51d4d59d7d69-3c7c62c1e32-1f1c42d7d69d1f39e7e69g1e29-5g1f35d7d55h2h39-2d7d64-3d7d66c1e35a7a64d1d29-2c7c62d1d29-2g8f62-2c1g51-1f2f42g8f69g1f39-3g1f31g8f69-4c2c31d7d69g1f39-3c2c42b8c61-1c7c51d4d59d7d69b1c39-4d7d67b1c39b8c62-1b8d71-1e7e52-1g8f63g1f39e8g89-6f2f41-1g1f32c7c51-1c7c61-1d7d67b1c32g8f69-2c2c31g8f69f1d39e8g89e1g19-5c2c41-1f1c42g8f69-2f1e22g8f69b1c39e8g89e1g19-8g8f61-2g1f31d7d61-1f7f51-1f8g79c1f41d7d69e2e39b8d79-4c1g51-1c2c31d7d65c1g59-2g8f64c1g59-3c2c43c7c52d4d59d7d69-3d7d65b1c38b8d73-1c8g43e2e39-2g8f62-2g2g31-2g8f61b1c39e8g89-4e2e41d7d69-2g2g32c7c53c2c34-1d4d55-2d7d63f1g29-2g8f63f1g29e8g89e1g19d7d69c2c49-8g8f61-2g2g31f8g79f1g29c7c53d4d59d7d69-3d7d64g1f39-2g8f62-5A45.g8f65b1c31c7c51d4d59d7d69e2e49g7g69-5d7d57c1f41-1c1g57b8d74d1d31-1e2e31-1f2f32c7c53-1c7c63";
c0_opn[23]="e2e49d5e49-3h7h63-2g1f34c7c62-1g7g65e2e39f8g79f1d39e8g89e1g19c7c59-7h7h62g5h49-4c7c51g5f69-2c7c61d1d39-2c8f51e2e32-1f2f34-1g5f63e7f69e2e39-4e7e61e2e49d5e47c3e49f8e79g5f69e7f69g1f39-6f8e72-3g7g61-2e2e41d5e47f2f39e4e33c1e39-2e4f36g1f39c8g49-5f6e42c3e49d5e49f1c49-5g1f31-2d7d61e2e49g7g69-3e7e61e2e49d7d55-1f8b44-3g7g61e2e49d7d69c1g59f8g79-6b1d21d7d57e2e39-2g7g62-2c1f41b7b61-1c7c51e2e39-2d7d51e2e39-2d7d61-1e7e62e2e39-2g7g63e2e39f8g79-4c1g51b7b61-1c7c51b1c31c5d49d1d49b8c69d4h49-5d4c51-1d4d53d8b66b1c39b6b29g5d29b2b69e2e49d7d69f2f49-8f6e43g5f49d8b69-4g5f65e7f61-1g7f69d4c51-1d4d58d8b69d1c19f6f58c2c42-1e2e33f8g79c2c39-3g2g33f8g79c2c39-4f8h61e2e39-8c7c61g5f69e7f69-3d7d51b1c31-1b1d21b8d79-2e2e32b8d72-1c7c52g5f69g7f69-3c7c62-1e7e61-1f6e42g5f49-3g1f31-1g5f65e7f67e2e39c7c62-1c8e62-1f8d65c2c45d5c49f1c49e8g89b1c39-5f1d32-1g2g32-4g7f62c2c43-1e2e36-4d7d61g5f69e7f69e2e39-4e7e62b1c31-1b1d21c7c53e2e39-2d7d51-1h7h65g5h49c7c59e2e39-5e2e31c7c54c2c39-2f8e71-1h7h63g5h49-3e2e46c7c51d4d55-1e4e54h7h69-3f8e71f1d39-2h7h67g5f69d8f69b1c35d7d65d1d29c7c63-1g7g56e1c19-4f8b44d1d29c7c55-1d7d64-4c2c32d7d52-1d7d67f1d39-3g1f31d7d69b1c39b8d79-8g1f31c7c53e2e39-2f8e72-1h7h64g5h49-4f6e43g5f47c7c56d4d51d8b69b1d23-1f4c16-3f2f38d8a57c2c39e4f69b1d25c5d49d2b39a5b67d1d49b6d42c3d49-2b8c67d4b69a7b69b3d45e7e59d4c69e5f49c6d49-5f4e34b6b59-7a5d81c3d49-2a5f51f4b89a8b89d1d49b7b69e2e49f5f49-10d4d54a5b66b2b33e7e69e2e49e6d59e4d59f8d69f4g59-7f4c16e7e69c3c49e6d59c4d59-6d7d61e2e49g7g69-3e7e61e2e49-6e4f62d4c54d8a59b1c39a5c59e2e49-5d4d55d7d64-1d8b65-5d7d53b1d22c8f57e2e39e7e69-3e4d22d1d29-3e2e34c7c53f1d39c5d49-3c8f52f2f39-2e7e63f1d39-3f2f32e4f69b1c35e7e69-2e2e44-4d7d61-2g5h41c7c54f2f39g7g59f3e49g5h49e2e39f8h69e1f29-8d7d52f2f39e4d69b1c39-4g7g52f2f39g5h49f3e49c7c59e2e39-7h2h41c7c56d4c55d8a59b1d29e4g59h4g59-5d4d54-2d7d53b1d29-4g7g61g5f69e7f69c2c42f8g79b1c39-3e2e36d7d51-1f8g78c2c43-1f1d32-1g2g33-3g2g31-4h7h61-2c2c31b7b61-1d7d52-1d7d61-1e7e61c1g59-2g7g64c1g59f8g79b1d29d7d54e2e39-2e8g85-6A50.c2c46a7a61b1c37c7c59d4d59b7b59-4g1f32-2b7b61b1c38c8b79";
c0_opn[24]="d1c23-1f2f33-1g1f32-3g1f31-2b8c61b1c32e7e59d4d59c6e79e2e49e7g69c1e39f8b49f2f39-9g1f37d7d61b1c39-2e7e68a2a33d7d53-1d7d66b1c39g7g69e2e49f8g79-6b1c34f8b49d1c29d7d69-4g2g32f8b49c1d29d8e79-7A56.c7c51d4c51e7e69-2d4d58a7a61a2a45-1b1c34-2A57.b7b55a2a41b5b43b1d29-2b5c46b1c39d7d69e2e49g7g69f1c49f8g79-8b1c31-1b1d21b5c47e2e49c4c35b2c39g7g69-3d7d64f1c49g7g69-5g7g62e2e49-3b2b31-1c1g51-1c4b57a7a69b1c31a6b57c3b52c8a69b5c39-3e2e47b5b49c3b59d7d69c1f47g7g59f4g59f6e49g5f49-5f1c42-6d8a51-1g7g61e2e49d7d69-4b5a64A58.c8a64A59.b1c39d7d65e2e43a6f19e1f19g7g69g1f34f8g79g2g39e8g89f1g29-5g2g35f8g79f1g29e8g89g1f39b8d79-10g1f33g7g69e2e43a6f19e1f19f8g79g2g39e8g89f1g29-7g2g36f8g79f1g29e8g89e1g19b8d79-8g2g32g7g69f1g29f8g79g1f39b8d74-1e8g85e1g19b8d79-9g7g64e2e43a6f19e1f19d7d69g1f35f8g79-2g2g34f8g79f1g29-7g1f34d7d66e2e49a6f19e1f19-4f8g73-2g2g32d7d69f1g29f8g79g1f39-7A58.g2g31d7d69f1g29g7g69-5A57.d7d61-1g7g65b1c39c8a69e2e44a6f19e1f19d7d69g1f35b8d74g2g35f8g79f1g29e8g89-4h2h34f8g79-3f8g75g2g36e8g89f1g29b8d79h1e19-5h2h34e8g89f1g19b8d79g1h29-7g2g35f8g79f1g29b8d72g1f39e8g89-3e8g87g1f39b8d79h1e17a8a69-2h2h32-11f2f41-1g1f32d7d66e2e44a6f19e1f19b8d74-1f8g75g2g39-5g2g35f8g79f1g29b8d79a1b19-6f8g73g2g39d7d69f1g29b8d79-6g2g32d7d67f1g29f8g79g1f37b8d77a1b16d7b65b2b39-2e8g84-2e1g13-2e8g82e1g19-3g1h32-4f8g72f1g29d7d69g1f39-7g2g31-3b5b62a6a51b1c39c8a69-3d7d62b1c39b8d74a2a43-1e2e46g7g69g1f39f8g79-5d8b62e2e49g7g69-3g7g62e2e49f8g79-5d8b62b1c39d7d66e2e46g7g69g1f39f8g79-4g1f33g7g69f3d29f8g79e2e49-6g7g63e2e46d7d69g1f39f8g79-4g1f33-4e7e63b1c39c8b71e2e49e6d59e4d59d7d69a2a49a6a59-7e6d51c3d59f6d59d1d59b8c69g1f39a8b89-7f6d57c3d59e6d59d1d59b8c69e2e41f8e79-2g1f38a8b89c1d21-1e2e45f8e79f1c49e8g89e1g19b8b69-6f3e52d8f69e5c69d7c69-13g7g61b1c39d7d63-1d8b63-1f8g73-4e2e31a6b53f1b59d8a59b1c39c8b79c1d24a5b69-2g1e25-6c8b71b1c39d8a59-3d7d61-1g7g64b1c39f8g79a2a44e8g89-2g1f35e8g89a2a49-7f2f31a6b53e2e49d8a59c1d29b5b49b1a39d7d69a3c49a5d89a2a39-10d7d61e2e49g7g69-3e7e63e2e49e6d59e4e59d8e79d1e29f6g89b1c39c8b79g1h39c5c49c1e39-12g7g61e2e49d7d69-5e7e61-2d1c21";
c0_opn[25]="b5c49e2e49-3f2f31-1g1f31b5b41-1b5c41b1c39d7d65e2e49-2g7g64e2e49d7d69-5c8b72a2a47d8a59c1d29b5b49d1c29-5b1d22-2d7d61c4b59a7a69-3e7e61-1g7g65a2a41-1c4b55a7a69b1c32-1b5b65d7d65b1c39b8d79-3d8b64b1c39-3d1c22-3d1c23b5c49e2e49d7d69f1c49-8A56.d7d61b1c39g7g69e2e48f8g79f1d32e8g89g1e24e7e69e1g19-3h2h35e7e69g1f39e6d59-6f1e21e8g89-2f2f31e8g89-2f2f41e8g89g1f39e7e69-4g1f32e8g89f1e26e7e69e1g19-3h2h33-3h2h31e8g89g1f39-5g1f31f8g79e2e49-3g2g31f8g79f1g29e8g89-7e7e51b1c39d7d69e2e49b8d71-1f8e77f1d33b8d74-1e8g85g1e24-1h2h35-3f1e21e8g89g1f39-3g1f31b8d74-1e8g85-2g2g32e8g89f1g29f6e89g1e29-5h2h31-2g7g62f1d34f8g79g1e29-3f1e22f8g79-2g2g32-3g2g31-4A60.e7e62b1c39A61.e6d59c3d51-1c4d59d7d69A65.e2e46A66.g7g69f1d31f8g79g1e26e8g89e1g19a7a69a2a49-5h2h33e8g89g1f39-5f1e21f8g79g1f39e8g89-4f2f31f8g79c1g59e8g89d1d29-5f2f43A67.f8g79e4e51-1f1b56b8d71e4e59d6e59f4e59f6h59e5e69-6f6d78a2a47d8h41g2g39-2e8g88g1f39b8a69e1g19a6b44f1e19a7a69b5f19-4a6c75b5d39-7b5d31e8g89g1f39-3b5e21-3A68.g1f32e8g89A69.f1e29c8g44e1g19-2f8e85-6A66.g1e21f8g79e2g39e8g89f1e29-5A70.g1f32a7a61a2a49-2A71.f8g78c1g51-1f1d31e8g89-2A72.f1e25A73.e8g89A74.e1g19A76.f8e89A77.f3d29-5A71.h2h31e8g89f1d39-5A66.h2h31f8g79g1f39e8g89f1d39a7a63a2a49-2b7b53-1f8e83e1g19-9A61.g1f32A62.g7g69c1f41a7a66a2a49f8g79-3f8g73d1a49c8d79a4b39-5c1g51f8g79-2e2e41f8g79f1e29e8g89e1g19-5f3d22b8d73e2e49f8g79f1e29e8g89e1g19-6f8g76d2c43e8g89-2e2e46e8g89f1e29f8e89e1g19-7g2g32f8g79A63.f1g29A64.e8g89e1g19a7a65a2a49b8d79-3f8e84-6A62.h2h31-3A61.g2g31g7g69f1g29f8g79g1f39e8g89e1g19a7a69a2a49-10f8d61e2e42-1g1f35d6c75-1e8g84-2g2g32-2g7g61e2e49d7d69-6A60.g1f31e6d59c4d59-4A56.f6e41-1g7g61b1c39d7d63e2e49f8g79f1d32e8g89-2f2f41e8g89-2g1f33e8g89f1e29-3h2h32e8g89-5f8g76e2e49d7d67f1d32e8g89g1e29-3f1e21e8g89-2f2f31e8g89-2g1f33e8g89f1e29e7e69-4h2h31e8g89-3e8g82g1f39d7d69-4g1f31-5e2e31c5d41e3d49d7d59b1c39-4e7e61b1c35-1g1f34-2g7g66b1c35f8g79g1f39e8g89f1e29c5d49e3d49d7d59e1g19-9g1f34f8g79b1c36e8g89f1e29c5d49e3d49d7d59-6f1e23e8g89e1g19-7g1f31c5d46f3d49b7b61b1c36c8b79f2f39-3f2f33c8b79e2e49-4b8c61b1c39g7g69";
c0_opn[26]="e2e49d7d69-5e7e54d4b56d7d59c4d59f8c59b5c34e8g89e2e39e5e49-4e2e35e8g89b5c39e5e49f1e29-9d4c21d7d59c4d59d8d59d1d59f6d59e2e49d5b49-8d4f31b8c69-3e7e61b1c36f8b49-2g2g33-2g7g61b1c39f8g79-5e7e61b1c39c5d49f3d49-4g7g62b1c38c5d43f3d49f8g79-3f8g76e2e49c5d49f3d49d7d69-6g2g31f8g79f1g29-6A50.c7c61b1c37d7d59c4d51c6d59c1f44b8c69e2e39-3g1f35b8c69c1f49-5e2e33a7a64d1c29-2e7e63g1f39b8d79-3g7g62g1f39f8g79-4g1f34a7a62-1d5c43a2a49c8f59e2e35e7e69f1c49-3f3e54-4e7e63c1g55-1e2e34b8d79-3g7g61-3d7d61-2g1f32d7d59b1c34-1e2e35-4d7d51b1c34-1c4d55f6d59e2e49-4A53.d7d61b1c37b8d74e2e46e7e59d4d53d7c55f2f39a7a59c1e39-4f8e74-2g1e21-1g1f35c7c62f1e29f8e79e1g19e8g89-5f8e74f1e29e8g89e1g19c7c69-5g7g62f1e29f8g79e1g19e8g89-8g1f33c7c62e2e49e7e59f1e29f8e79e1g19e8g89-7e7e55c1g54f8e79e2e39e8g89-4e2e43f8e79f1e29-3g2g32-2g7g61e2e49e7e59-5c7c61e2e49e7e59-3c8f51f2f34e7e59e2e49e5d49-4g1f32-1g2g33-2e7e52d4d51f8e79e2e49-3d4e52d6e59d1d89e8d89c1g54-1g1f35f6d79-6A54.g1f35b8c61-1A55.b8d76c1g52f8e79e2e39e8g89-4e2e44g7g69f1e29f8g79e1g19e8g89-6g2g32-2A54.e5e42f3g59-4A53.g7g61e2e49f8g79f1e22e8g89-2f2f33e8g89c1e39-3f2f41-1g1f33e8g89f1e29e7e59-8g1f32b8d74b1c38c7c62e2e49e7e59f1e29f8e79e1g19e8g89-7e7e57e2e47f8e79f1e29e8g89e1g19c7c69-6g2g32-3g2g31e7e59f1g29-4c7c61b1c39-2c8f51-1c8g41-1g7g63b1c37c8f52-1f8g77e2e49e8g89f1e29e7e59-6g2g32f8g79f1g29e8g89e1g19-7g2g31-2A51.e7e51d4d51f8c59b1c39-3d4e59f6e41a2a32-1b1d21-1g1f35b8c64-1f8b45b1d29b8c69a2a39-6A52.f6g48c1f44b8c66g1f39f8b49b1c31d8e79d1d59-3b1d28d8e79a2a34g4e59f3e59c6e59e2e39b4d29d1d29d7d69f1e29-9e2e35g4e59f3e59c6e59f1e29e8g89e1g19b4d29d1d29d7d69-15f8b43b1d29b8c65g1f39d8e79e2e39g4e59f3e59c6e59-7d7d64e5d69d8f69-5g7g51-2e2e31g4e59g1h39-3e2e41g4e59f2f49e5c66c1e39-2e5g63-4g1f34b8c63c1f46f8b49b1d29d8e79a2a39-5e2e33g4e59-3f8c56e2e39b8c69a2a31a7a59-2b1c31g4e59-2f1e26e8g85e1g19f8e84-1g4e55-3g4e54f3e59c6e59-10A51.e2e31e5d49e3d49-4E00.e7e64a2a31b7b62-1c7c52-1d7d54b1c39-3E20.b1c34b7b61e2e47c8b75-1f8b44-2g1f32-2c7c51d4d58d7d61-1e6d59c4d59d7d69e2e47g7g69f1d31f8g79-2f2f45f8g79f1b57f6d79a2a49e8g89g1f39b8a69";
c0_opn[27]="e1g19-7g1f32e8g89-4g1f32f8g79f1e29e8g89e1g19-5h2h31f8g79-4g1f32g7g69f3d29-4f8d61-4e2e31-1g1f31c5d49f3d49-4d7d51c1g54b8d72c4d52e6d59e2e39-3e2e36c7c66c4d55e6d59f1d39-3g1f34d8a59-3f8e73g1f39e8g89-4g1f31-2c7c61e2e39b8d79-3f8e76c4d51e6d59e2e39-3e2e37b8d71g1f39-2c7c61-1e8g85g1f39b8d73-1h7h66g5h49b7b69-5h7h62g5h49e8g89g1f39b7b69-6g1f31e8g89e2e39-5c4d53e6d59c1g59b8d71e2e39c7c64f1d39-2f8e75f1d39-4c7c63d1c23f8e79e2e39b8d79f1d39-5e2e36c8f53d1f39f5g69g5f69-4f8e76f1d39b8d79-5f8e75d1c21-1e2e39b8d71f1d39-2c7c64d1c23b8d79f1d39-3f1d36b8d79d1c29-4e8g84f1d39b8d76g1e29-2c7c63d1c29b8d79-9f6d51e2e49d5c39b2c39c7c59g1f39-7e2e31-1g1f32b8d71c1g59-2c7c51c4d59-2c7c62e2e39b8d79-3f8e75c1f44e8g89e2e39c7c59d4c59e7c59-6c1g55e8g86e2e39-2h7h63-5f8b48E24.a2a31b4c39b2c39b7b61f2f39-2E25.c7c56E26.e2e36b8c65f1d39-2e8g84f1d39-3E25.f2f33d7d59c4d59-4E24.d7d61-1E27.e8g81-4E20.c1d21b7b61-1c7c51-1d7d51-1e8g84e2e33-1g1f36-3E30.c1g51c7c53d4d59d7d64e2e39-2h7h65g5h49b4c34b2c39d7d69-3d7d65e2e39-6h7h66E31.g5h49b7b61-1c7c58d4d59b4c34b2c39d7d69e2e39e6e59-5d7d65e2e39b4c39b2c39e6e59-10E22.d1b31E23.c7c59d4c59b8c69g1f39f6e49-6E32.d1c23b7b61a2a35b4c39c2c39c8b79-4e2e44-2E33.b8c61g1f39d7d52-1d7d67a2a33b4c39c2c39-3c1d24-1c1g52-4E38.c7c53d4c59b4c52c1f41-1g1f39b8c62c1g59-2d8b65e2e39b6c79-3e8g81-3b8a62a2a39b4c38c2c39a6c59b2b45c5e49c3b24-1c3d45d7d59c4c59-5f2f34a7a53-1d7d53c4d59-2d7d63e2e49-6d8a51c1d29a6c59-5b8c61g1f39b4c59c1g59-4d8a51c1d29-2d8c71a2a34b4c59-2g1f35b4c59-3E39.e8g84a2a37b4c59g1f39b7b67c1f44c8b75a1d19-2f6h54-2c1g55c8b79e2e33-1e2e46h7h69g5h49c5e79a1d19-8b8c62c1g59c6d49f3d49c5d49e2e39d8a59e3d49a5g59c2d29g5d29e1d29-15g1f32b8a69a2a36b4c39c2c39a6c59-4e2e33a6c59c1d29b7b69-8E38.e2e31b8c64-1e8g85-2g1f31-2E34.d7d51E36.a2a32b4c39E37.c2c39f6e49c3c29c7c59d4c59b8c69-8E35.c4d56d8d55e2e34c7c59c1d29b4c39d2c39c5d49c3d49b8c69d4c39e8g89g1f39-11g1f35d5f59c2f59e6f59a2a39b4d69-7e6d54c1g59c7c52-1h7h67g5f66d8f69a2a39b4c39c2c39e8g89e2e39-7g5h43c7c59d4c59-7E34.e2e31e8g89-3E32.d7d61a2a33b4c39c2c39-3c1g52-1g1f33-2E33.e8g84a2a37b4c39c2c39b7b51c4b59";
c0_opn[28]="c7c69c1g59c6b59e2e39c8b79g1f39-8b7b67c1g58c7c51d4c59b6c59e2e39-4c8a62c3f32b8c69e2e39h7h69-4e2e35d7d69f1d36b8d79g1e29c7c59-4g1f33b8d79-4g1f31d7d69-3c8b76e2e33d7d68f2f37b8d79f1d37c7c59g1e29a8c89-4g1h32-3g1e22b8d79c3d39-4h7h61g5h49-3f2f35c7c51d4c59b6c59e2e39-4d7d51e2e39b8d79c4d59e6d59-5d7d61-1h7h66g5h49d7d59e2e39b8d79c4d59f6d59h4d89d5c39d8h49-11g1f31d7d69f3d29b8d79f2f39-6d7d61-1h7h61g5h49-3f2f31-1g1f31c8b79e2e35d7d69-2g2g34-4d7d61c1g57b8d79e2e39b7b69-4f2f32-2f6e41c3c29f7f59e2e32b7b69g1e29-3g1f31b7b69-2g1h34b7b62f2f39-2d7d67f2f39e4f69e2e39e6e59d4e59d6e59-8g2g31b7b69f1g29c8b79g1f39-8h7h61-4c1g51c7c56d4c59-2h7h63g5h49-3e2e41c7c52-1d7d55e4e59f6e49a2a33b4c39b2c39c7c59-4f1d36c7c59c4d59e6d59g1e29c5d49e2d49-10d7d62a2a39b4c39b2c39-5g1f31b7b63e2e49-2c7c56d4c59b8a69g2g39a6c59-8E40.e2e34b4c31b2c39c7c59-3E43.b7b61E45.c3e21-1E43.f1d33c8b79f2f31c7c59-2g1e21b7g29h1g19-3g1f36e8g85e1g19c7c56c3a49-2d7d53-3f6e44d1c23f7f59e1g19-3e1g16b4c34b2c39-2f7f55-6f2f31-1E44.g1e25c7c51a2a39b4a59a1b19b8a69-5c8a63a2a37b4c36e2c39d7d59b2b39e8g89f1e29b8c69-7b4e73e2f49d7d59-4e2g32-2c8b72a2a39b4c32e2c39-2b4e77d4d59e8g89e2g39-6f6e42c1d24e4d29d1d29-3d1c25c8b79a2a39b4c39e2c39e4c39c2c39e8g89-10E43.g1f31c8b79f1d39-4E40.b8c61-1E41.c7c53a2a31b4c39b2c39-3c3e21-1f1d35b8c65a2a31b4c39b2c39-3g1e24c5d47e3d49d7d59c4d56f6d59e1g19e8g89-4e1g13d5c49d3c49e8g89-7d7d52-2g1f35b4c38b2c39d7d69e1g15e6e59f3d29e8g89-4e3e44e6e59d4d56c6e79-2h2h33-6d7d51e1g19-4c5d41e3d49-2d7d51g1f39e8g89e1g19b8c69a2a39b4c39b2c39d5c49d3c49d8c79-11e8g82g1e23d7d59c4d59-3g1f36d7d59e1g19b8c65a2a39b4c39b2c39-4d5c44d3c49-7E42.g1e23b7b61a2a39b4a59a1b19b8a69-5c5d45e3d49d7d54a2a35b4e79e2f49-3c4c54f6e49c1d29e4d29d1d29-6e8g85a2a39b4e79d4d53e6d59c4d59-3e2f46d7d56c4d59f6d59c3d59e6d59f1d39b8c69e1g19-8d7d63-7d7d51a2a39b4c39e2c39c5d49e3d49d5c49f1c49b8c69c1e39e8g89e1g19b7b69-13e8g81a2a39-3E41.g1f31b8c64f1d39b4c39b2c39d7d69-5e8g85f1d39d7d59e1g19-6E40.d7d51a2a35b4c39b2c39-3g1f34e8g89f1d39-4E46.e8g84a2a31b4c39b2c39c7c59f1d39-5c3e21d7d59a2a39-3E47.f1d36b7b61-1c7c52a2a31b4c39b2c39";
c0_opn[29]="b8c69-4g1e22c5d43e3d49d7d59-3d7d56c4d59c5d49e3d49f6d59e1g19b8c69-8g1f36d7d59e1g19b8c63a2a39b4c39b2c39d5c49d3c49d8c79-7c5d42e3d49d5c49d3c49b7b69c1g59c8b79-7d5c43d3c49b8d79-7E48.d7d57E49.a2a31b4c38b2c39c7c53-1d5c46d3c49c7c59g1f39d8c79-7d5c41d3c49-3E48.c4d51e6d59g1e29f8e89e1g19-5g1e21c7c55c4d59-2d5c44d3c49e6e59-4g1f36b7b61e1g19c8b79c4d59e6d59-5b8c61e1g19a7a69-3c7c57e1g19b8c64a2a39b4c39b2c39d5c45d3c49d8c79c1b25-1c4a24-4d8c74c4d59e6d59-7c5d41e3d49d5c49d3c49b7b69c1g59c8b79-7d5c43d3c49b8d77a2a34c5d49-2d1e25-2c5d42e3d49-9E46.g1e22b7b61a2a39-2d7d58a2a39b4d61c4c59d6e79-3b4e78c4d57e6d57b2b43c7c69e2g39f8e89f1d39-5e2f41c7c69f1d39-3e2g31-1g2g33c7c69f1g29-4f6d52-2e2f41c7c69f1d39-3e2g31-3c4d51e6d59g2g39-4f8e81a2a39b4f89-4E50.g1f31b7b62f1d39-2c7c52-1E51.d7d55E52.f1d39E53.c7c59e1g19-7E20.f2f31b8c61-1c7c52a2a32b4c39b2c39-3d4d58b4c33b2c39-2b7b53e2e49-2d7d63e2e49-4d7d56a2a39b4c38b2c39c7c57c4d59e6d51e2e39-2f6d58d1d32-1d4c57d8a59e2e49d5e75c1e39e8g89d1b39-4d5f64c1e39e8g89-9c7c61-1e8g81c4d59e6d59e2e39-6b4e71e2e49d5e49f3e49e6e59d4d59-8e8g81-2g1f31b7b63c1g55c8b77e2e39h7h69g5h49g7g59h4g39f6e49d1c29-8h7h62g5h49c8b79-4d1b31c7c59-2e2e31c8b79f1d39-3g2g31c8b79f1g29-4c7c54e2e33b8c62-1e8g87f1d39d7d59e1g19-5g2g36b8c61f1g29-2c5d45f3d49e8g86f1g29d7d59c4d59f6d59d1b39-6f6e43d1d39-4e8g82f1g29c5d49f3d49d7d59c4d59f6d59-9d7d51-1e8g81c1g59-3g2g31c7c56g1f39c5d47f3d49e8g85f1g29d7d59c4d59f6d59-5f6e44d1d39-4e8g82f1g29-4d7d51-1e8g82f1g29d7d59g1f39-7E00.c1g51f8b45b1d29-2h7h64-2E10.g1f34a7a61b1c39c7c59-3E12.b7b65a2a32c7c51d4d59c8a69d1c29e6d59c4d59g7g69b1c39f8g79g2g39e8g89f1g29d7d69e1g19f8e89f1e19-16c8a63d1c28a6b78b1c39c7c59d4c51b6c59-2e2e48c5d49f3d49b8c63d4c69b7c69c1f45-1f1e24-4d7d62f1e29f8e79-3f8c54d4b39b8c69c1f42-1c1g57h7h69g5h49c6d49b3d49c5d49f1d39-16c7c51d4d59e6d59c4d59g7g69b1c39f8g79g2g39e8g89f1g29d7d69e1g19-13e2e31d7d59-3c8b75b1c39d7d57c1g52f8e79d1a45d8d79-2e2e32-1g5f62e7f69c4d59e6d59-6c4d56e6d53c1f42-1c1g52f8e79-2g2g35f8e79f1g29e8g89-5f6d56c1d21b8d79-2d1c24d5c36b2c39f8e79e2e49e8g89f1d39c7c59e1g19-8f8e73e2e49d5c39";
c0_opn[30]="b2c39-5e2e33f8e74f1b59c7c69b5d39-4g7g65f1b59c7c69-6d1c21f8e79-3f6e41c3e49b7e49-3f8e71d4d59e8g89e2e49-4g7g61-3d7d51b1c39-3b1c31c8b75a2a35d7d59c1g52f8e79d1a49-3c4d57e6d52-1f6d57d1c26d5c39b2c39-3e2e33-5c1g53f8b42-1f8e74d1c23-1e2e36-2E13.h7h63g5h49f8e79-4E12.e2e31-2f8b44c1g55c8b77e2e37h7h69g5h49b4c34b2c39d7d69-3g7g56h4g39f6e49d1c29b4c39b2c39d7d69f1d39-11f3d22h7h69g5h49-4h7h62g5h49c8b79e2e39-5d1b32a7a52-1c7c57a2a34b4a59c1g59-3c1g55c8b79-4d1c21c8b79a2a39b4c39c2c39-5e2e31c8b79f1d39-5c1f41c8b79e2e39f8e79-4c1g51c8b79e2e39-3E14.e2e31c8b79b1c31f8b49f1d39-3f1d38c7c52e1g19f8e79b1c39-4d7d54c4d51e6d59-2e1g18b8d73-1f8d66b1c39e8g89-5f8b41b1d29e8g89-3f8e72b1c33-1e1g16e8g89b1c39d7d59b2b39-9E15.g2g35c8a65b1d21a6b72f1g29c7c59e2e49c5d49e1g19-6c7c51e2e43-1f1g26a6b79-3d7d52f1g29f8e79e1g19e8g89f3e59-6f8b43d1c29a6b79f1g29b7e49c2b39b4d29c1d29e8g89e1g19d7d69-12b2b35a6b71f1g29f8b49c1d29a7a58e1g19e8g89b1c33d7d69-2d1c26d7d69-5c7c51-5b6b51c4b59a6b59f1g29b5c63e1g19-2d7d56e1g19b8d79-7d7d51c4d53e6d59f1g29-3f1g26d5c44f3e59f8b49e1f19-4f8b45c1d29-4f8b46c1d29b4d21d1d29-2b4e79b1c31c7c62-1d7d52c4d59e6d59-3e8g85e2e49d7d59c4d59a6f19e1f19e6d59e4e59f6e49f1g29-11f1g28a6b71e1g19e8g89-3c7c67d2c37d7d59b1d24b8d79e1g19e8g89f1e19a6b72e2e49-2c6c57e2e49d5e49d2e49-9f3e55f6d79e5d79b8d79b1d29e8g89e1g19a8c85e2e49-2d7f64e2e49-11e1g12d7d59d1c26b8d79f1d19-3f3e53f6d79-5d7d51c4d59e6d59-3e8g81e1g19-7d1a41a6b76f1g29c7c59d4c57b6c52e1g19f8e79b1c39e8g89-5f8c57e1g19e8g89b1c39c5e79c1f44-1f1d15-7e1g12c5d49f3d49b7g29g1g29-8c7c51f1g29a6b79d4c59-4f8e71f1g29e8g89-4d1b31b8c69b1d29-3d1c21a6b74-1c7c55-3c8b73E16.f1g29c7c51d4d59e6d59f3h49-4d7d51-1f8b41b1d21-1c1d28a7a51e1g19-2b4d24d1d29e8g89b1c39-4b4e73b1c39-4E17.f8e77b1c32e8g83e1g19f6e49-3f6e46c1d28e7f65-1e8g84-2d1c21e4c39c2c39-5e1g17e8g89E18.b1c38b8a61-1d7d51-1E19.f6e49c1d21f7f59d4d59-3c3e45b7e49f3e18e4g29e1g29d7d59d1a49c7c52c1e39c5d49e3d49-4d5c43a4c49c7c59c1e35-1d4c54-4d8d73a4d79b8d79c4d59-4d8e81a4e89f8e89-8f3h41e4g29h4g29d7d59d1a49-7d1c23e4c39c2c39c7c55f1d19d7d69-3f7f54b2b39e7f69c1b29-9E17.b2b31";
c0_opn[31]="-1d4d51e6d59f3h49c7c69c4d59f6d59h4f59-7f1e11-6E15.f8b41c1d29a7a52f1g29-2b4d23d1d29c8a69-3b4e73f1g29-6E10.b8c61-1c7c51b1c31c5d49f3d49b8c64-1f8b45-4d4d57b7b51c1g55-1d5e64f7e69c4b59d7d59-5d7d62b1c39e6d59c4d59g7g69e2e44a7a69a2a49c8g49f1e29g4f39e2f39-7f3d21-1g2g31f8g79f1g29e8g89e1g19-5h2h32a7a69a2a49-8e6d56c4d59d7d68b1c39g7g69c1f41a7a69-2e2e44a7a62-1f8g77f1e24e8g89e1g19-3h2h35e8g89f1d39-5f3d22f8g79e2e49e8g89f1e29-5g2g31f8g79f1g29e8g89e1g19-5h2h31f8g79e2e49e8g89-7f8d61-1g7g61b1c39d7d69-6e2e31b7b62b1c39-2c5d42e3d49d7d59-3d7d54b1c39b8c69-4g2g31c5d49f3d49-4d7d52b1c37b8d71c1g55c7c65e2e39d8a59-3f8e74e2e39e8g89-4c4d53e6d59c1f44c7c69-2c1g55-3e2e31-2c7c51c4d59f6d59e2e33b8c69-2e2e46d5c39b2c39c5d49c3d49f8b49c1d29b4d29d1d29e8g89f1c49-14c7c61c1g53b8d73e2e39-2d5c42e2e49b7b59-3h7h64g5h49-3c4d51e6d59c1g59f8e79-4e2e35b8d79d1c24f8d69f1d39e8g89e1g19d5c49d3c49-7f1d35d5c49d3c49b7b59c4d39a7a69-9d5c41d1a41-1e2e34a7a69a2a44c7c59f1c49b8c69e1g19f8e79-6f1c45b7b59c4d39-5e2e45f8b49c1g59c7c59e4e52-1f1c47c5d49f3d49b4c39b2c39d8a59c4b59b8d75g5f69a5c39e1f19g7f69-5c8d74g5f69g7f69-15f8b41c1g54b8d72-1h7h67g5f69d8f69e2e39e8g89a1c19-7c4d53e6d59c1g59b8d73-1h7h66g5f64d8f69-2g5h45-5d1a41b8c69-2e2e31e8g89f1d39-4f8e73c1f42e8g89e2e39b8d72-1c7c57d4c59e7c59a2a34b8c69d1c29d8a59-4c4d53f6d59c3d59e6d59a2a39b8c69f1d39c5b69e1g19-9d1c21-7c1g56b8d71e2e39-2e8g84e2e39b8d74a1c19c7c69f1d39-4h7h65g5f62e7f69-2g5h47b7b69-5h7h64g5f61e7f69e2e39e8g89-4g5h48e8g89e2e39b7b68a1c12c8b79-2f1d33c8b79e1g19-3f1e23c8b79h4f69e7f69c4d59e6d59b2b49-8f6e41h4e79d8e79-8c4d51e6d59c1g59c7c69d1c29-5d1c21-3c1g51b8d71-1f8e76b1c36e8g89e2e39-3e2e33-2h7h62-2c4d51e6d59b1c39c7c69c1g59f8e79-6e2e31c7c55-1f8e74-2g2g31c7c61f1g29-2d5c43d1a41-1f1g28a7a63e1g19-2b8c66d1a49f8b49c1d29-6f8b41c1d29b4e79f1g29e8g89e1g19c7c69-7f8e73f1g29e8g89e1g19b8d72-1c7c62-1d5c45d1c29a7a69a2a45c8d79c2c49d7c69-4c2c44b7b59c4c29c8b79-13E11.f8b41b1c31c7c59-2b1d23b7b64a2a36b4d29c1d24c8b79d2g59d7d66e2e39b8d79-3h7h63g5h49d7d69e2e39-7d1d25c8b79e2e39d7d63-1e8g86f1e29d7d69e1g19-9e2e31c8b79f1d39e8g89e1g19";
c0_opn[32]="-5g2g31c8b79f1g29e8g89e1g19-6c7c51-1d7d51a2a32b4e79-2d1a43b8c69a2a39-3e2e33e8g89a2a39b4e79-5d7d61-1e8g82a2a36b4d24c1d25-1d1d24-2b4e75e2e49d7d59e4e59-5e2e31-1g2g31-3c1d26a7a51b1c32b7b69-2g2g37b7b63f1g29c8b79e1g19e8g89-5d7d53d1c29-2d7d62f1g29b8d79e1g19e6e59-7b4d21b1d22-1d1d27d7d52-1e8g87b1c36d7d59e2e39-3g2g34-4b4e71b1c39d7d59-3c7c51d2b48c5b49e2e31-1g2g38b7b62f1g29c8b79-3e8g87f1g29d7d69e1g19-7g2g31-2d8e75a2a31b4d29b1d29d7d69-4b1c31b7b64-1e8g85-2d1c21-1g2g37b4d21-1b7b61f1g29c8b79e1g19b4d29d1d29-6b8c66b1c35b4c36d2c39f6e49a1c17d7d62-1e8g87f1g29d7d69d4d59c6d89-6d1c22e4c39c2c39-6d7d51-1e8g81f1g29-3f1g24b4d29b1d29d7d69e1g19a7a55e2e49e6e59d4d59c6b89f3e19-6e8g84e2e49e6e59d4d59c6b89-11e8g81f1g29b4d29b1d23d7d69-2d1d26d7d69b1c39-10E10.f8e71b1c39-3E00.g2g31c7c52d4d55e6d59c4d59b7b52f1g29d7d69-3d7d67b1c38g7g69f1g28f8g79g1f39e8g89e1g19a7a65a2a49b8d79-3f8e84-6g1f31f8g79-4f1g21g7g69-6g1f34c5d49f3d49b8c62f1g29-2d7d53f1g29e6e59d4f39d5d49e1g19b8c69e2e39-8d8c72-1f8b42-5E01.d7d55E02.f1g26c7c61g1f39b8d79-3E03.d5c43d1a43b8d75a4c49-2c8d74a4c49d7c69g1f39-5E04.g1f36a7a63e1g19b8c69-3E05.b8c64d1a46f8b49c1d29f6d59d2b49-5e1g13a8b89-3E04.c7c51e1g19b8c69-5E02.f8b41c1d29b4e79g1f39e8g89e1g19c7c69d1c29b7b69-9E06.f8e74E07.g1f39e8g89d1c21-1E08.e1g18b8d71E09.d1c29c7c69-3E08.c7c61-1d5c46d1c29a7a69a2a44c8d79c2c49d7c69c1g59c6d59-6c2c45b7b59c4c29c8b79c1d29b7e49c2c19-15E01.g1f33c7c61-1d5c43f1g29a7a63e1g19-2b8c66d1a49-4f8b41c1d29b4e79f1g29e8g89e1g19c7c69-7f8e74f1g29e8g89e1g19d5c49d1c29a7a69a2a45c8d79c2c49d7c69c1g59-5c2c44b7b59c4c29c8b79c1d29-14E00.f8b42b1d21c7c54-1d7d52f1g29e8g89-3e8g82-2c1d28a7a51f1g29-2b4d21d1d29-2b4e72f1g29d7d59g1f39e8g89e1g19c7c69d1c29b7b69-9c7c51d2b49c5b49f1g29e8g89-5d8e74f1g27b8c67e2e32-1g1f37b4d29b1d29d7d69e1g19a7a59-7e8g82g1f39-3g1f32b8c69-7D70.g7g63b1c38c7c51d4d59d7d69-3d7d52D82.c1f41D83.f8g79a1c11e8g89e2e39-3e2e38c7c54d4c59d8a59a1c17d5c47f1c49e8g89g1e24a5c59d1b39-3g1f35a5c59c4b39c5a59e1g19-8f6e42c4d59e4c39d1d29a5a29b2c39a2a59-8d1a42a5a49c3a49-6c7c61g1f39e8g89-3e8g84a1c12c7c59d4c59-3D84.c4d53";
c0_opn[33]="f6d59c3d59d8d59f4c79b8a66f1a69d5g29d1f39g2f39g1f39b7a69-7b8c63-6D83.d1b31-1g1f32c7c59-4g1f31e8g89-4D80.c1g51f6e48c3e41d5e49d1d29-3g5f42e4c39b2c39f8g79e2e39-5g5h45c7c52c4d59e4c39b2c39d8d59e2e39-6e4c37b2c39d5c44e2e39c8e69-3f8g75e2e39-6f8g71-2D85.c4d54f6d59c1d21d5b61d2g59f8g79e2e39e8g89-5f8g78e2e49d5b67d2e39e8g89f1b51-1f1e26b8c69g1f39c8g49d4d59g4f39g2f39-7h2h31-4d5c32d2c39e8g89-6c3a41f8g79e2e49d5b69c1e39e8g89-6e2e48d5b61-1d5c39D86.b2c39c7c51c1e32f8g79-2f1c44f8g79g1e29b8c64c1e39-2e8g85e1g19-5g1f32f8g79a1b19e8g89f1e29-6f8g79c1a31e8g89-2c1e31c7c58a1c11-1d1d28c5d41c3d49b8c69a1d19-4d8a56a1b14b7b69f1b59c8d79-4a1c12-1g1f32b8c69-3e8g81g1f39-3g1f31-2e8g81d1d29-3d1a41b8d79g1f39e8g89-4f1b51c7c68b5a49b7b51a4b39b5b49-3e8g88g1e29c6c59e1g19b8c69c1e39c6a59a1b19-10c8d71b5e29-3f1c44c7c56c1e31-1g1e29b8c65c1e39c5d41c3d49d8a59e3d29-4e8g88a1c11-1e1g19c5d41c3d49-2c8d71a1b19-2c8g45f2f39c6a59c4d35c5d49c3d49-3c4f74f8f79f3g49-6d8c72a1c19f8d89-7c5d41c3d49b8c69c1e39-4e8g83c1e31b8c69-2e1g18b8c69c1e39c5d41c3d49-2c8d71-1c8g44f2f39c6a59c4d39c5d49c3d49-6d8c73a1c19f8d89-9e8g83c1e31-1g1e29b7b61e1g19c8b79-3b8c62e1g19b7b69c1e39c8b79-5D87.c7c55c1e32b8c69e1g19-3e1g17D88.b8c69D89.c1e39c8g45f2f39c6a59c4d39c5d49c3d49-6d8c74a1c19f8d89-10D86.g1f33c7c58a1b16e8g89f1e29b7b62e1g19c8b79d1d39b7a66d3e39d8d79-3e7e63-5b8c62d4d59c6e59f3e59g7e59d1d29e7e69f2f49-8c5d44c3d49d8a59c1d27a5a29e1g19b7b62d1c19-2c8g47d2e32-1d2g57-5d1d22a5d29c1d29b7b69-10c1e32d8a57d1d29b8c66a1c19c5d49c3d49a5d29e1d29e8g89d4d59-8e8g83a1c19-4e8g82-2f1b51b8c65e1g19c5d49c3d49-4c8d74-2f1e21-1h2h31e8g89f1e29-4e8g81a1b12c7c59f1e29-3c1e31c7c59-2f1e25c7c59a1b14-1e1g15-9D85.g1f31f8g79-2g2g31f8g79f1g29d5b64g1f39-2d5c35b2c39c7c59e2e39-9D81.d1b31d5c49b3c49f8g79e2e49e8g89-6D80.e2e31f8g79d1b34e7e69-2g1f35e8g89f1e29-5D90.g1f33f8g79D92.c1f41c7c51d4c59d8a59-3c7c61e2e39e8g89-3D93.e8g88a1c16c7c52d4c59-2d5c47e2e36c8e69f3g59e6d59e3e49h7h69e4d59h6g59f4g59f6d59f1c49d5b69c4b39-13e2e43c8g49f1c49-5e2e33c7c59d4c59d8a59a1c19d5c49f1c49a5c59-10D91.c1g52c7c61e2e39-2d5c41e2e33-1e2e46c7c59";
c0_opn[34]="d4d59-4f6e48c4d57e4c31b2c39d8d59e2e39-4e4g59f3g59c7c61-1e7e68d1d26e6d56d2e39e8f89e3f49g7f69h2h49h7h69c3d53f6g59f4e59-3g5f36-8h7h63g5f39e6d59e2e39-5g5f33e6d59b2b42-1e2e37e8g89b2b49-9g5f41e4c39b2c39-3g5h41e4c39b2c39c7c54-1d5c45-6D90.c4d51f6d59c1d21e8g89a1c19-3d1b31d5c39b2c39-3e2e47d5c39b2c39c7c57a1b16e8g89f1e29b7b62e1g19c8b79-3b8c63d4d59c6e59f3e59g7e59d1d29-6c5d44c3d49d8a59c1d29a5a29e1g19-9c1e33d8a59d1d29b8c69a1c19c5d49c3d49a5d29e1d29e8g89-11e8g82f1e29c7c59-8d1a41-1D96.d1b33c7c61c1f45-1c4d54-2D97.d5c49b3c49e8g89c1f41b8a69-2e2e49a7a63c4b31b7b59-2e4e55b7b59c4b39f6d79e5e66f7e69c1e39d7f69a2a49-5h2h43-5f1e22b7b59c4b39c7c59d4c59c8b79e1g19-8b8a62f1e29c7c59d4d59e7e69e1g19e6d59e4d59c8f59c1e39d8b69b2b39-12b8c61f1e29c8g49c1e33-1d4d56c6a59-5c7c61c4b34-1f1e25-2D98.c8g41D99.c1e39f6d79a1d13-1c4b36d7b69a1d19-11D94.e2e31e8g89b2b42b7b69-2c1d21-1c4d51f6d59f1c49-3D95.d1b32-1D94.f1e22c7c59-7D70.d7d61e2e49f8g79g1f39e8g89f1e29-6E61.f8g76c1f41-1c1g51c7c51-1d7d63e2e39e8g89-3e8g84e2e35d7d69-2g1f34d7d69e2e39-4h7h61g5h49-3e2e31-1E70.e2e48d7d69c1e31e8g89-2c1g51e8g86d1d29-2h7h63g5e34-1g5h45-3f1d31b8c61g1e29-2e7e51d4d59e8g89g1e29-4e8g88g1e29b8c63e1g19e7e54d4d59c6d49e2d49e5d49-5f6h55c1e34e7e59d4d59-3d3c25e7e59d4d59c6e79-7b8d71-1c7c51d4d59e7e69e1g19e6d59c4d59-6e7e53d4d59b8d74-1c7c65-6E73.f1e22b8d71g1f39-2e8g89c1e31e7e59d4d59-3c1g54b8a63d1d24e7e59d4d59c7c65f2f39c6d59c4d59c8d79-5d8e84-4f2f42c7c69g1f39a6c79-4g1f32h7h69-2h2h41e7e59d4d59-4b8d71d1d29c7c63-1e7e56d4d59-4E74.c7c53d4c51d8a59g5d29a5c59g1f39-5E75.d4d58a7a61a2a49-2b7b51c4b59a7a69a2a49-4e7e62d1d29e6d59e4d59-4h7h64g5e33e7e69d1d29e6d59-4g5f46e7e69d5e69c8e69f4d69f8e89g1f39b8c69e1g19-12E73.c7c61d1d29-2h7h62g5e39b8d72d1d29c7c59d4d59-4c7c52d4c59d8a59-3e7e54d4d59b8d75-1c7c64-6f2f41c7c59g1f39-3g1f35b8a61e1g19e7e59c1e39f6g49e3g59-6b8d71e1g19e7e59-3c7c51d4d55-1e1g14-2c8g41c1e39f6d79-3e7e58c1e31e5d42f3d49f8e89f2f39-4f6g47e3g59f7f69g5h49b8c69d4d59c6e79f3d29-9d4d51a7a57c1g59h7h69g5h49b8a69f3d29d8e89-7b8d72c1g59h7h69g5h49-5d4e51d6e59d1d89f8d89c1g59d8e89c3d59f6d59";
c0_opn[35]="c4d59c7c69e2c49-11e1g16b8a61c1e34f6g49e3g59-3f1e15-2b8c67c1e31-1d4d59c6e79b2b44a7a53c1a39-2f6h56f1e19f7f59f3g59h5f69-6f3d21a7a59a2a39-3f3e14f6d77c1e33f7f59f2f39f5f49e3f29g6g59a2a49-7e1d34f7f59c1d29d7f69f2f39f5f49-6f2f31f7f59-3f6e82c1e39f7f59f2f39f5f49e3f29-10b8d71f1e19c7c69-3e5d41f3d49f8e89f2f39b8c69-8g2g41-3E80.f2f32a7a61c1e39-2b8c61c1e39-2b8d71c1e39-2c7c61c1e39a7a69f1d39-4e7e51d4d53-1g1e26e8g89-3E81.e8g88c1e37a7a61d1d26b8c63-1b8d74-1c7c62-2f1d32-1g1e21-2E82.b7b61d1d23c7c59-2f1d36a7a69g1e29c7c59-5E83.b8c62d1d23a7a69g1e29a8b89e2c15e7e59d4d59-3h2h44-5g1e26E84.a7a69d1d29a8b89a1c12-1e2c14e7e59d4d59c6d49c1b39-5h2h43h7h59e1c19b7b59-7E83.a8b81-3E81.b8d71d1d25c7c57d4d54-1g1e25a7a69-3e7e52-2f1d31-1g1e21-1g1h31-2c7c51d4c52d6c59d1d89f8d89e3c59b8c69c3d55f6d79-2c5a34-7d4d51e7e69d1d29e6d59c4d59-5g1e25b8c69d1d23-1d4d56c6e59e2g39e7e69f1e29e6d59c4d59a7a65a2a49-2h7h54e1g19-12c7c61d1d25-1f1d34-2E85.e7e53E87.d4d56b8d71-1E88.c7c65d1d24c6d59c4d59a7a69-4f1d35c6d59c4d59f6h59g1e29f7f59e4f59g6f59e1g19-10E87.f6h53d1d29d8h42e3f29-2f7f57e1c19b8d79-6E86.g1e23b8c62d4d59-2c7c67d1d29b8d79d4d54c6d59c4d59a7a69-4e1c15a7a69-8E81.c1g51a7a61d1d29c7c59d4d59-4b8c61g1e29a7a69d1d29a8b89-5b8d71d1d29-2c7c54d4d59a7a61-1e7e65d1d29e6d59c4d59a7a69a2a49-6h7h62g5e39e7e69d1d29e6d59c4d59-8c7c61d1d29-2h7h61g5e39e7e59d4d59-5f1d31-1g1e21a7a61c1e39-2b8c61c1e39-2b8d71-1c7c54c1e31-1d4d58e7e69e2g39e6d59c4d59a7a69a2a49-8e7e51c1g59c7c69d1d29-7E76.f2f41c7c51d4c51d8a59f1d39-3d4d58e8g89g1f39e7e69f1e29e6d59c4d59f8e89-9e8g88E77.f1e21c7c59d4d59-3E76.g1f39b8a62e4e52f6d79f1e29c7c59e5d69e7d69-6f1d34c8g43e1g19-2e7e56f4e59d6e59d4d59c7c69e1g19-7f1e23e7e59f4e59d6e59d4d59-6b8d71-1c7c56d4c52d8a59f1d39a5c59d1e29b8c65c1e39c5a59e1g19-4c8g44c1e39c5a59e1g19-9d4d57a7a61-1b7b51c4b59a7a69a2a49-4e7e67d5e61-1f1d31e6d59-2f1e28e6d59c4d59c8g44e1g19b8d79f1e16f8e89h2h39g4f39e2f39-5h2h33g4f39e2f39-6f8e85e4e57d6e59f4e59f6g49c1g59d8b69e1g19-7f3d22-3e4d51-6c8g41-4E70.g1e21e8g89e2g38c7c53d4d59e7e69f1e29e6d59-5e7e56d4d59a7a55f1e29b8a69-3c7c64f1e29-5f2f31-3E90.g1f33";
c0_opn[36]="c8g41-1e8g89c1e31e7e59-2c1g51-1E91.f1e29b8a61e1g19e7e59c1e34f6g49e3g59d8e89d4e59d6e59h2h39-7d4d52a6c59d1c29a7a59-4f1e13c7c69-5b8c61e1g19e7e59d4d59c6e79-5b8d71e1g19e7e59c1e34c7c69-2d4d52d7c59-2f1e13c7c69-5c7c51d4d55e7e69e1g19-3e1g14c5d49f3d49b8c69c1e39c8d79-7c7c61e1g19-2c8g41c1e37f6d79a1c15-1f3g14g4e29g1e29-5e1g12f6d79-3E92.e7e58c1e31b8a61e1g19f6g49e3g59d8e89d4e59-6b8c61d4d59c6e79f3d29-4b8d71e1g19-2c7c61-1e5d41f3d49f8e89f2f39c7c69-5f6g44e3g59f7f69g5c12-1g5h47b8c65d4d59c6e79f3d29g4h66f2f39-2h7h53-5g6g54h4g39g4h69-7h7h61-2d4d51a7a57c1g57b8a61f3d29-2h7h68g5h49b8a69e1g12-1f3d27d8e89e1g19f6h79-8e1g11b8a69-2h2h31b8a69c1g59-4b8a61-1E93.b8d71c1g59h7h69g5h49-5E92.d4e51d6e59d1d89f8d89c1e31c7c69e1g19b8d79f1d19d8e89h2h39d7f89a1c19-9c1g58b8d71-1c7c61f3e59d8e89-3d8e87c3d59f6d59c4d59c7c69e2c49a7a52-1b7b52c4b39-2c6d55c4d59-9c3d51f6d59c4d59c7c69e2c49-9E94.e1g16b8a61c1e34f6g49e3g59d8e89d4e59d6e59h2h39f7f64-1h7h65g5d29g4f69d2e39-11d4d51a6c59d1c29a7a59-4f1e14c7c67e2f19c8g49d4d59-4d8e82-3E97.b8c66c1e31f6g49e3g59f7f69-4d4d59c6e79b2b44a7a53b4a52a8a59-2c1a37a5b46a3b49b7b64a2a49-2f6d75a2a49-4b7b61b4a59-2f6d72b4a59a8a59a3b49a5a89a2a49-8c7c61-1f6d71-1f6e81c4c59f7f59-3f6h54c4c51-1d1c21-1f1e17a7a52b4a59-2f7f55f3g59h5f69e2f37c7c69c1e39-3f2f32-4h5f42e2f19a7a59b4a59-5g2g31-3c1d21-1c1g51-1f3d21a7a56a2a39c8d73b2b39-2f6d76a1b19f7f59b2b49g8h89d1c29-8c7c51-1f6d71b2b49-3E98.f3e13f6d77c1e35f7f59f2f39f5f49e3f29g6g59a1c13-1a2a46-7e1d33f7f59c1d29d7f66f2f39f5f49c4c59-4g8h83-4E99.f2f31f7f59-3E98.f6e82c1e37f7f59f2f39f5f49e3f29g6g59c4c59-7e1d32f7f59-6E97.d4e51-2E95.b8d71c1e33c7c69-2d1c22-1E96.f1e14c7c69e2f19-4E94.c7c61-1e5d41f3d49f8e89f2f39b8c66c1e39f6h59d1d29-4c7c63g1h19-6f6h51-4E90.h2h31b8a62c1g59d8e89-3c7c51d4d59-2e7e56d4d59a7a55c1g59b8a69-3b8a64c1g59-7E72.g2g31e8g89f1g29-3E71.h2h31e8g89c1e31e7e59d4d59-3c1g57b8a63f1d36e7e59d4d59c7c69g1e29-5g1f33-2b8d71g1f39e7e59d4d59-4c7c52d4d59b7b54c4b59a7a69-3e7e65f1d39e6d59-5c7c61g1f39-2d8e81-1h7h61g5e39e7e59d4d59-5g1f31e7e59d4d59-6E70.e8g81c1e31d7d69f2f39e7e59-4c1g51d7d69d1d29";
c0_opn[37]="-3e4e51f6e89-2f1d31d7d69g1e29-3f1e21c7c61-1d7d68c1g53-1g1f36e7e59e1g19b8c69d4d59c6e79-8f2f31d7d69c1e37e7e59-2c1g52-3f2f41d7d69g1f39c7c59d4d59-5g1e21d7d69-2g1f33c7c61f1d35d7d69-2f1e24d7d59-3d7d68f1e29b8a61e1g19e7e59-3b8d71e1g19e7e59-3c8g41-1e7e57c1e31-1d4e51d6e59-2e1g17b8c69d4d59c6e79b2b45f6h59f1e19-3f3e14f6d79-8h2h31-3h2h31-3E61.g1f31E62.d7d62c1f41e8g89-2c1g53e8g85e2e39-2h7h64g5h49-3e2e42e8g89f1e29e7e59-4g2g32e8g89f1g29E67.b8d79E68.e1g19E69.e7e59e2e49-8E61.e8g87c1f41d7d69e2e34-1h2h35-3c1g53c7c52d4d54d7d69-2e2e35-2d7d66e2e39b8d74f1e29c7c69-3c7c52-1c7c62f1e29-4h7h61g5h49d7d69e2e39-5e2e31d7d69f1e29b8d79e1g19e7e59-6e2e42d7d69f1e29e7e59d4d53-1e1g16b8c69d4d59c6e79-8g2g32d7d51c4d59f6d59f1g29-4d7d68f1g29b8c62e1g19-2b8d75e1g19e7e59e2e49-4c7c62e1g19d8a59-8g2g31d7d61f1g29-2e8g88f1g29d7d69g1f39b8c64e1g19a7a69-3b8d74e1g19e7e59e2e49-4c7c61e1g19-9D70.c1g51-1d4d51-1f2f31c7c51d4d59-2d7d54c4d59f6d59e2e49d5b69b1c39f8g79c1e39e8g89d1d29b8c69e1c19e7e56d4d59c6d49f3f49c8g49d1e19-6f7f53-13f8g74e2e49d7d68b1c39e8g89c1e39-4e8g81-4g1f31E60.f8g79b1c31d7d53c4d56f6d59e2e49d5c39b2c39c7c59-6e2e33-2d7d61e2e49e8g89-3e8g85c1g51-1e2e46d7d69f1e29e7e59e1g19b8c69d4d59c6e79-8g2g32d7d69f1g29-5g2g38c7c51f1g29-2c7c61f1g29d7d59c4d59c6d59b1c39-6d7d51c4d55f6d59f1g29d5b69b1c35b8c69e2e39e8g89e1g19f8e89-6e1g15b8c69e2e39-7f1g24d5c49b1a39-4d7d61f1g29e8g89e1g19b8d79-5e8g87f1g29c7c51-1c7c61b1c34d7d59c4d59c6d59-4e1g15d7d59-3d7d51c4d56f6d59e1g19d5b69b1c39b8c69d4d55-1e2e35-7e1g13d5c49b1a39-4d7d67b1c32b8c64e1g19a7a69-3b8d75e1g19e7e59e2e49c7c69-6e1g17b8c63b1c38a7a68b2b33a8b89-2d4d53c6a59f3d29c7c59-4h2h33-2a8b81-2d4d51-2b8d74b1c38e7e59e2e46c7c65-1e5d44f3d49f8e89-4h2h33-3d1c21e7e59-3c7c51-1c7c61b1c39d8a59e2e49-11D70.g2g31c7c51d4d56b7b59-2g1f33-2c7c61f1g27d7d59c4d59c6d59b1c34f8g79g1f39e8g89-4g1f35f8g79e1g19-7g1f32f8g79-3D71.d7d51c4d59f6d59f1g29f8g79-5E60.f8g78f1g29c7c51-1d7d52c4d58f6d59e2e47d5b42d4d59c7c69a2a39d8a59b1c39c6d59-7d5b67g1e29c7c55d4d59e7e69e1g19e6d54e4d59e8g89-3e8g85-5e7e51d4d59-2e8g83e1g19b8c69-6g1f32d5b64-1e8g85e1g19";
c0_opn[38]="-5g1f31e8g89e1g19-4d7d61b1c33e8g89g1f39-3g1f36e8g89e1g19b8d79-5e8g86b1c37d7d69e2e31-1g1f39b8c63e1g19a7a67d4d55c6a59f3d29c7c59d1c29a8b89b2b39b7b59-8h2h34-2a8b81-1e7e51-3b8d73e1g19e7e59e2e47a7a61-1c7c64h2h39-2e5d44f3d49f8e89h2h39-5h2h32c7c69e2e49-6c7c51d4d54-1e1g15b8c69-3c7c61e1g19d8a59-6e2e41d7d69-2g1f32d7d69b1c31-1e1g18b8c64b1c39a7a69-3b8d73b1c39e7e59e2e49-4c7c61b1c39-11A45.e2e31b7b61-1c7c51-1d7d51f1d39-2d7d61-1e7e61f1d39c7c59-3g7g64f1d35f8g79f2f49d7d69g1f39-5f2f42f8g79g1f39-3g1f32f8g79-4e2e41f6e49-2f2f31d7d59e2e49d5e49b1c39-5f2f41d7d55-1g7g64-2A46.g1f32b7b51c1g55c8b79-2e2e34a7a69-3A47.b7b61c1f41c8b79e2e39-3c1g51c8b75b1d29-2e7e62-1f6e42-2c2c43c8b73b1c39e7e69a2a39-4e7e66a2a32-1b1c33-1g2g34c8a69-4e2e31c8b79f1d39e7e69-4g2g32c8b79f1g29c7c54-1e7e65e1g19f8e79c2c49e8g89b1c39-10A46.c7c51c2c31b7b63c1f43c8b79-2c1g54-1g2g32c8b79f1g29-4c5d41c3d49d7d59b1c39b8c69c1f49-6d7d51-1d8c71-1e7e63c1f43-1c1g54-1e2e31-2g7g61-2c2c41c5d48f3d49b8c62-1e7e55d4b59d7d59c4d59f8c59e2e39e8g89b5c39-8e7e62-3g7g61b1c39-3d4c51e7e69-2d4d55b7b53a2a41b5b45-1c8b74-2c1g57d7d62g5f69e7f69e2e49a7a69a2a49b5b49f1d39g7g69-9d8b62g5f69b6f69c2c39-4f6e44g5f43c8b79-2g5h46c8b79a2a45-1d1d34f7f59-6c2c41c8b79-3d7d61b1c36g7g69e2e49f8g79f1b54-1f1e25e8g89e1g19-7c2c43b7b55c4b59-2g7g64b1c39f8g79-5e7e62b1c34d7d63e2e49-2e6d56c3d59f6d59d1d59b8c64-1f8e75e2e49-7c2c45b7b52-1e6d57c4d59d7d69b1c39g7g69e2e49f8g79-9g7g62b1c36d7d62e2e49f8g79-3f8g77e2e49d7d66f1b54-1f1e25e8g89e1g19-4e8g83f1e29-5c2c43b7b56c4b59a7a69-3f8g73b1c39e8g89-6e2e32b7b61f1d39c8b79-3c5d41e3d49d7d59f1d39-4d7d51-1e7e62c2c42-1f1d37b7b64-1d7d55-3g7g64c2c31-1c2c42f8g79b1c39e8g89f1e29c5d49-6d4c51d8a59b1d29-3f1d32f8g79e1g19e8g89-4f1e22f8g79e1g19e8g89-6g2g31c5d49f3d49-4c7c61c2c49-2d7d51c1f41c7c53c2c33-1e2e36b8c69c2c39d8b69d1b39c5c49-7c7c61-1c8f51e2e39e7e69-3e7e62e2e39c7c59-3g7g61-2c1g51e7e65e2e39-2f6e44g5f49-3c2c31-1c2c46c7c63b1c35a7a61-1d5c43a2a49c8f59e2e39e7e69f1c49f8b49e1g19-8e7e64c1g54-1e2e35b8d79-4c4d51c6d59b1c39b8c69c1f49c8f59e2e39e7e69f1d39f5d39d1d39f8d69f4d69d8d69e1g19e8g89";
c0_opn[39]="-16d1c21-1e2e32a7a61-1c8f53b1c39e7e69-3c8g41-1e7e62-3d5c41b1c31-1e2e38c8g43f1c49e7e69-3e7e66f1c49a7a64e1g19-2c7c55e1g19a7a69-7e7e65b1c36b8d71c1g55-1c4d54e6d59c1g59-4c7c51c4d59f6d59-3c7c61c1g52-1e2e37b8d79d1c25f8d69-2f1d34-4d5c41e2e35a7a69-2e2e44f8b49c1g59c7c59-5f8b41c1g59-2f8e73c1f42e8g89e2e39-3c1g57e8g84e2e39h7h69g5h49-4h7h65g5f63e7f69-2g5h46e8g89e2e39b7b69-8c1g51f8e79-2c4d51e6d59b1c39-3e2e31-1g2g31d5c44f1g29-2f8e75f1g29e8g89e1g19d5c49d1c29a7a69-10e2e31c7c51-1c7c61-1c8f51c2c49-2c8g41-1e7e62f1d39c7c59-3g7g62-2g2g31c7c62f1g29c8f59-3c8f52f1g29e7e69e1g19-4e7e61f1g29-2g7g62f1g29f8g79e1g19e8g89-7d7d61b1c31b8d74e2e49e7e59f1c49f8e79-5c8f52-1g7g63e2e49f8g79-4c1f41g7g69-2c1g51b8d79b1d29-3c2c44b8d73b1c39c7c62e2e49e7e59f1e29f8e79e1g19-6e7e57e2e49f8e79f1e29e8g89e1g19c7c69-9c7c61b1c39-2c8g41b1c39-2g7g64b1c39f8g79e2e49e8g89f1e29e7e59e1g19-9g2g32b8d74f1g29e7e59-3g7g65f1g29f8g79e1g19e8g89c2c49-8e7e63b1d21c7c55e2e39-2d7d54e2e39-3c1f41b7b64b1d21c8b79-2e2e38c8b79b1d26f8e79h2h39-3f1d33f8e79-5c7c54c2c33b7b69-2e2e36b8c63-1d8b66d1c19-4d7d51e2e39c7c59c2c39-5c1g51b7b61-1c7c54c2c32b7b62-1c5d42-1d8b62-1f8e72-2e2e37b7b61d4d59-2b8c61-1c5d41e3d49-2d7d51-1d8b62b1d24-1d1c15b8c64-1f6e45-3f8e72b1d27b7b69f1d39c8b79-4f1d32-2h7h61g5h49b7b69-5d7d51b1d23f8e79e2e39-3e2e36b8d72-1f8e77b1d25-1f1d34-4f8e71b1d26d7d59e2e39e8g89f1d39-5e2e33b7b69f1d39c8b79-5h7h62g5f63d8f69e2e49d7d69b1c39b8d79d1d29-7g5h46b7b62e2e39c8b79-3c7c54c2c32-1e2e37-2d7d62-1g7g51h4g39-5c2c31b7b66c1g59c8b79b1d29f8e79e2e39-6c7c53c1g59-3c2c44b7b64a2a32c7c51-1c8a63d1c29a6b77b1c39c7c59e2e49c5d49f3d49f8c59d4b39b8c69-9c7c52-3c8b75b1c39d7d58c1g53f8e79d1a49-3c4d56e6d52-1f6d57d1c29-4f8e71-4b1c31c8b74a2a34d7d59c1g54f8e79-2c4d55f6d59-4c1g53f8e79-2e2e31-2f8b45c1g56c8b76e2e39h7h69g5h49-4h7h63-2d1b33c7c59-4c1f41c8b79e2e39-3c1g51-1e2e31c8b79f1d39c7c52e1g19-2d7d54e1g19-2f8e72-4g2g34c8a66b1d21c7c54-1f8b45-2b2b35a6b71f1g29f8b49c1d29a7a59e1g19e8g89-7b6b51c4b59a6b59f1g29-4d7d51-1f8b46c1d29b4e79b1c31-1f1g28a6b72-1c7c67d2c35d7d59b1d23-1f3e56f6d79e5d79b8d79b1d29e8g89";
c0_opn[40]="e1g19-9e1g14d7d59-8d1a41a6b79f1g29c7c59d4c59-5d1b31-1d1c21-2c8b73f1g29f8b42c1d29-2f8e77b1c32f6e49-2e1g17e8g89b1c39f6e49c1d23-1c3e43b7e49f3e19e4g29e1g29-5d1c23e4c39c2c39-10f8b41c1d29-4b8c61-1c7c51b1c31c5d49f3d49f8b49-4d4d56b7b51c1g59-2d7d62b1c39e6d59c4d59g7g69e2e49-6e6d56c4d59d7d69b1c39g7g69e2e47f8g79-2h2h32-7e2e32c5d44e3d49-2d7d55b1c39b8c69-4g2g31c5d49f3d49-4d7d51b1c37b8d71c1g59-2c7c51c4d59-2c7c61c1g54-1e2e35b8d79-3d5c41e2e39-2f8b41c1g59-2f8e74c1f43e8g89e2e39c7c59d4c59-5c1g56e8g85e2e39-2h7h64g5h49e8g89e2e39b7b69-8c1g51f8e79-2g2g31d5c44f1g29-2f8e75f1g29e8g89e1g19d5c49d1c29a7a69-9f8b42b1c31c7c59-2b1d22b7b64a2a39b4d29c1d24-1d1d25-4d7d52-1e8g83a2a39-3c1d26a7a51b1c33-1g2g36-2b4d21d1d29-2c7c51d2b49c5b49g2g39-4d8e76a2a31b4d29-2b1c31-1g2g37b7b61f1g29c8b79e1g19b4d29-5b8c66b1c33b4c39d2c39f6e49a1c19-5f1g26b4d29b1d29d7d69e1g19a7a55e2e49e6e59d4d59c6b89-5e8g84e2e49e6e59d4d59c6b89f3e19-12e8g82f1g29b4d29d1d29-9e2e31b7b65b1d21c8b79-2f1d39c8b79b1d22c7c55c2c33-1e1g16f8e79-3d7d54e1g19-3e1g17c7c54b2b32-1c2c47f8e76b1c39-2g7g64b1c39f8g79-5d7d52b2b35-1c2c44-2f8e73b1d22-1c2c47e8g89b1c39d7d59b2b36-1c4d53-9f1e21c8b79e1g19-4c7c53c2c31-1c2c41-1f1d38b7b64e1g19c8b79c2c49f8e79b1c39-6b8c62e1g19d7d59b2b39-4d7d53b2b36b8c69e1g19-3c2c33-4d7d51f1d39c7c59b2b35b8c69-2c2c34-5g2g31b7b51d1d31-1f1g28c8b79c1g51-1e1g18c7c57c2c39-2f8e72-5b7b63f1g29c8b79c2c42f8b43c1d29-2f8e76b1c34-1e1g15e8g89b1c39f6e49-6e1g17c7c52c2c49c5d49d1d49-4f8e77c2c49e8g89b1c39f6e49c3e43b7e49-2d1c26e4c39c2c39-12c7c52c2c31-1c2c41c5d49f3d49-3f1g28b8c64e1g19c5d44f3d49-2d7d55c2c49-4c5d44e1g14-1f3d45d7d59-3d7d51e1g19-4d7d52c2c41-1f1g28c7c51e1g19-2f8e78c2c43e8g89e1g19d5c49d1c29a7a69-6e1g16e8g89c2c49c7c64-1d5c45d1c29a7a69-11A48.g7g64D02.b1c31d7d57c1f49c7c61e2e39f8g79-3f8g78d1d21-1e2e39c7c61-1e8g89f1e29b7b61f3e59c8b79h2h49-4c7c56d4c52d8a59-2f3e57b8c69e1g19c5d49e3d49-6c7c62f3e59-8f8g72e2e49d7d69c1e34e8g89d1d29-3f1e23e8g89e1g19-3h2h31-5A48.b1d21d7d55e2e39f8g79f1d39e8g89-5f8g74e2e49d7d69-4b2b31f8g79c1b29e8g89g2g39-5b2b41f8g79c1b29e8g89-4c1f41d7d61e2e35";
c0_opn[41]="f8g79-2h2h34f8g79e2e39-4f8g79b1c31-1b1d21e8g89-2c2c31-1e2e37d7d51-1d7d63f1e21e8g89-2h2h38e8g89f1e29b8d74e1g19-2c7c55c2c39-6e8g85b1d21d7d69h2h39-3f1e24c7c52c2c39-2d7d67e1g11-1h2h38b8d75e1g19-2c7c54-4h2h34c7c53c2c39-2d7d66f1e29b8d79e1g19-7h2h31e8g89e2e39d7d69-6c1g51f6e41g5f45f8g79-2g5h44f8g79-3f8g79b1d28c7c51c2c32c5d49c3d49-3e2e34-1g5f63g7f69d2e49f6d49f3d49c5d49d1d49e8g89-9d7d53c2c31e8g89-2e2e39c7c51c2c39-2e8g89c2c31-1f1d35b8d74e1g19c7c59c2c39-4c7c55c2c39d8b69-4f1e23b8d75e1g19-2c7c54c2c39-6d7d61c2c32e8g89e2e49-3e2e31-1e2e45e8g87c2c39-2h7h62-3e8g84c2c33d7d52e2e39b8d79-3d7d67e2e49b8d73-1c7c56d4c59d6c59f1c49b8c69e1g19-9e2e32d7d69f1c43-1f1d32-1f1e23-3e2e43d7d52-1d7d67c2c35b8d75-1c7c54-2f1d32-1f1e22-4h7h61g5h49-3c2c31d7d52-1e8g87b1d29d7d54e2e39-2d7d65e2e49-5e2e31d7d62-1e8g87b1d24-1f1e25d7d69-6c2c31f8g79c1f42e8g89-2c1g57d7d62b1d29-2e8g87b1d29d7d53e2e39-2d7d66e2e49-7c2c44c7c51b1c34c5d46f3d49b8c65e2e49-2f8g74e2e49-4f8g73e2e49-3d4d54b7b58c4b59a7a69b5a69c8a69b1c39-6d7d61b1c39-3e2e31-2d7d51-1d7d61b1c39f8g79-3f8g79b1c37c7c51-1d7d52c1f41e8g89a1c13-1e2e36c7c59d4c59d8a59-6c1g51f6e49c4d57e4g59f3g59e7e69d1d25-1g5f34e6d59-6g5h42e4c39b2c39-5c4d54f6d59c1d21-1d1b31-1e2e48d5c39b2c39c7c57a1b14e8g89f1e29c5d49c3d49d8a59c1d29a5a29e1g19-9c1e34d8a56d1d29b8c69-3e8g83-2f1b51-2e8g82f1e29-7d1b31d5c49b3c49e8g89e2e49a7a64-1b8a65-6e2e31e8g89f1e29-4d7d61c1g51e8g85e2e39-2h7h64g5h49-3e2e47e8g89f1e28b8d71e1g19e7e59-3e7e58c1e31-1d4d51a7a59-2e1g16b8c69d4d59c6e79b2b45-1f3e14f6d79-8h2h31-3g2g31e8g89f1g29b8d79e1g19-6e8g85c1f41d7d69e2e36-1h2h33-3c1g51c7c51-1d7d66e2e39b8d76f1e29-2c7c53-3h7h61g5h49-3e2e31d7d69-2e2e47c7c61-1d7d69c1e31-1f1e29b8a61e1g19e7e59c1e39f6g49e3g59-6b8d71e1g19e7e59-3c7c51d4d54-1e1g15c5d49f3d49-4c8g41c1e39f6d79-3e7e57c1e31f6g49e3g59f7f69g5h49b8c69d4d59c6e79-8d4d51a7a57c1g59h7h69g5h49b8a69f3d29d8e89-7b8d72c1g59h7h69g5h49-5d4e51d6e59d1d89f8d89c1g59d8e89c3d59f6d59c4d59c7c69e2c49-11e1g15b8a61c1e34f6g49e3g59-3f1e15-2b8c67d4d59c6e79b2b45a7a53c1a39-2f6h56f1e19f7f59f3g59h5f69-6f3d21a7a59-2f3e13f6d76c1e35";
c0_opn[42]="f7f59f2f39f5f49e3f29g6g59-6e1d34f7f59c1d29-4f6e83-5b8d71c1e39-2e5d41f3d49f8e89f2f39-7h2h31e7e59d4d59a7a59-6g2g31d7d69f1g29b8c65e1g19-2b8d74e1g19e7e59-8g2g32c7c51f1g29-2c7c61f1g29d7d59-3d7d51c4d56f6d59f1g29d5b69b1c39b8c69e2e39e8g89e1g19-9f1g23-2d7d61f1g29e8g89e1g19-4e8g87f1g29c7c51-1c7c61b1c34d7d59-2e1g15d7d59-3d7d51c4d56f6d59e1g19d5b69b1c39b8c69-6e1g13-2d7d67b1c32b8c63e1g19a7a69-3b8d73e1g19e7e59e2e49-4c7c62e1g19-3e1g17b8c63b1c37a7a69d4d59c6a59-4d4d52c6a59f3d29-4b8d73b1c37e7e59e2e47c7c69h2h39-3h2h32-3d1c22e7e59f1d19-4c7c51-1c7c61b1c39d8a59-10e2e31f8g79b2b31-1c2c41e8g89-2f1d34d7d63-1e8g86e1g19d7d69-4f1e22e8g89e1g19d7d69-6A49.g2g31c7c51-1d7d51f1g29f8g79e1g19e8g89c2c49d5c49-7f8g79c2c41e8g89f1g29-3f1g29c7c51-1d7d51c2c42d5c49-2e1g17e8g89c2c49c7c63-1d5c46b1a39-6d7d61e1g19e8g89c2c49b8d79-5e8g88c2c41d7d51-1d7d68b1c33b8c64-1b8d75e1g19e7e59-4e1g16b8c65b1c39a7a69-3b8d74b1c39e7e59e2e49-7e1g18c7c51-1c7c61c2c49d7d69b1c39-4d7d52b1d21-1c2c31-1c2c47c7c64c4d59c6d59b1c39-4d5c45b1a39b8c65a3c49c8e69b2b39-4c4c34b2c39c7c59-7d7d67a2a41a7a59-2b1c31b8d79e2e49e7e59-4b1d21-1b2b31b8d72c1b29-2c7c53-1c7c61c1b29-2e7e52d4e59-3c2c31-1c2c45b8c63b1c38a7a67h2h39-2e7e52-2d4d51c6a59-3b8d74b1c38e7e59e2e47c7c64-1e5d45f3d49f8e89-4h2h32-3d1c21-2c7c51b1c39b8c69-3c7c61b1c39b8d73-1d8a56-4f1e11b8d79e2e49e7e59-12A45.g2g31c7c51d4d56b7b55-1e7e64-2g1f33-2c7c61-1d7d52f1g29c7c66g1f39c8f59e1g19-4e7e63-3d7d61-1e7e61f1g29c7c54g1f39-2d7d55g1f39-4g7g64f1g29d7d51g1f39f8g79e1g19e8g89-5f8g78e2e47d7d69b1c34e8g89g1e29e7e59-4g1e25e8g89e1g19e7e59-6g1f32e8g89e1g19d7d69-8g2g41f6g49.A00.e2e31d7d51f2f49g8f69-3e7e53c2c45g8f69-2d2d44e5d49-3g7g61d2d49f8g79-3g8f63b2b34g7g69-2f2f45d7d59.A40.e2e45B00.a7a61d2d48b7b58f1d35c8b79-2g1f34-2e7e61-2g1f31b7b59-3b7b61b1c31c8b79-2d2d49c8b79b1c33e7e69a2a32-1f1d33g8f69-2g1f34f8b49f1d39g8f69d1e29-7b1d21e7e69g1f39-3f1d35e7e65g1f39c7c59c2c35g8f69-2e1g14-4g7g61-1g8f63b1d23e7e69-2d1e26b8c64c2c39e7e59-3e7e65g1f39-6e7e61-2g1f31c8b79-3b8c61b1c31d7d61-1e7e52f1c49-2e7e62d2d49f8b49-3g7g61-1g8f63d2d49d7d59e4e59f6d79";
c0_opn[43]="-6d2d31e7e59-2d2d43d7d55b1c33d5e43d4d59c6e59-3e7e51-1e7e61-1g8f62e4e59f6d79-4e4d51d8d59g1f39-3e4e55c8f59c2c37e7e69-2g1f32e7e69-5d7d61b1c35-1g1f34g8f69-3e7e53d4d53c6e79c2c45-1g1f34-3d4e53c6e59f2f43-1g1f36-3g1f33e5d49f3d49-5f1b51g8f69-2f1c41g8f69-2f2f41d7d59-2g1f35d7d51e4d59d8d59b1c39d5a59d2d45c8g49-2f1b54-6d7d64d2d49c8g41-1g8f68b1c39c8g48c1e34e7e52-1e7e67h2h39g4h59d4d59e6d59e4d59-7d4d51c6b89-2f1b51a7a69b5c69b7c69-4f1e22e7e69-3g7g61-2c2c31-4e7e52d2d41e5d49f3d49-3f1b55a7a66b5a49g8f69e1g19-4g8f63e1g19-3f1c42g8f69-3e7e61d2d49d7d59-3f7f51e4f59d7d59d2d49c8f59-5g7g61d2d49-2g8f61e4e59-4B20.c7c54a2a31e7e65-1g7g64-2B23.b1c31a7a61a2a41b8c69-2f2f41b7b59g1f39c8b79d2d39-5g1e21-1g1f31d7d65d2d49c5d49f3d49g8f69-5e7e64d2d49c5d49f3d49-5g2g34b7b59f1g29c8b79d2d38e7e69f2f45-1g1f34-3g1e21-6b7b61-1b8c66d2d31d7d62g2g39g7g69f1g29f8g79-5g7g67c1e34d7d69-2g2g35f8g79f1g29-5f1b51c6d46b5a41-1b5c48e7e65g1e22g8e74-1g8f65e1g19-3g1f37a7a62f3d49c5d49c3e29-4g8e73f3d49c5d49c3e29e7c69-5g8f64e1g19a7a69d2d39-6g7g64g1e21f8g79-2g1f38f8g79e1g11-1f3d48c5d49d1f39e7e64c3b59d7d69-3g8h65c3e29e8g89-10g1f31d4b59c3b59-4d7d61b5c69b7c69d2d39-4e7e61b5c69b7c69d2d39-4g7g62b5c69b7c64d2d39f8g79f2f45d7d69g1f39-3g1e24-4d7c65d2d39f8g79c1e39b7b69d1d29e7e59-10f1c41e7e69-2f2f42d7d61f1b51-1f1c41-1g1f38e7e61-1g7g67f1b53-1f1c46f8g79e1g19e7e69d2d39g8e79d1e19-8g8f61-3e7e62f1c41-1g1f39a7a61g2g39d7d59d2d39g8f69-5d7d55d2d31-1f1b58d5d42-1g8e75e4d59-2g8f62-3d7d61-1g8e71d2d45c5d49f3d49-3f1b54-4g7g66f1c41f8g79g1f39e7e69-4g1f39f8g79d2d31-1f1b55c6d48a2a41-1b5c41-1b5d32d7d68f3d49c5d49c3e29g8f69-5e7e61f3d49c5d49c3b59d7d69c2c39-7e1g14a7a62b5d39d7d69f3d49c5d49c3e29g8f69-7d4b56c3b59d7d55e4e59a7a69b5c39-4d7d64d2d39-4e7e61-2f3d41c5d49c3e29a7a64-1d8b65-5d7d61-1e7e61b5c69-3f1c43d7d61e1g19e7e69-3e7e68d2d31g8e79e1g19-3e1g14g8e79d1e12e8g89d2d39d7d59c4b39-5d2d35d7d53c4b39e8g89d1e19-4e8g86d1e19-3e4e52-3f4f54g8e79f5e69d7e64d2d36e8g89e1g19-3e1g13-2f7e65d2d37d7d59c4b39b7b59e1g19-5e1g12-7g2g31d7d69f1g29e7e69-8g1e21d7d61d2d49c5d49e2d49g8f69c1g54-1f1c45-6e7e51c3d59-2e7e62";
c0_opn[44]="d2d46c5d49e2d49d8c76-1g8f63-4g2g33-2g7g62d2d48c5d49e2d49f8g79c1e38d7d63d1d29g8f69f2f39-4g8f66f1c49e8g89c4b39-5d4e21-5g2g31f8g79f1g29-4g8f61d2d45c5d49e2d49e7e59d4b59d7d69c1g59a7a69b5a39b7b59-10g2g34-3g1f31d7d62d2d49c5d49f3d49g8f69c1g54e7e69d1d29a7a69e1c19-5f1c43e7e69c1e39-3f1e22-6e7e51f1c49d7d64d2d39f8e79e1g19-4f8e75d2d39d7d69-5e7e62d2d47c5d49f3d49a7a61-1d8c75c1e39-2g8f62-4f1b52g8e79e1g19-4g7g63d2d47c5d49f3d49f8g79c1e38d7d62-1g8f67f1c49e8g89c4b39d7d69f2f39c8d79d1d29-9d4b31-5f1b51f8g79-2f1c41f8g79-3g8f61d2d44c5d49f3d49-3f1b55-3B24.g2g34d7d61f1g29g7g66d2d39f8g79c1e39-4g8f63d2d39g7g69-5e7e61f1g29g7g62-1g8f67d2d34-1g1e25-4B25.g7g69d2d31f8g79c1e37d7d69d1d29a8b84f1g29b7b59g1e29-4e7e52-1e7e63-4f1g22d7d69-4f1g29f8g79B26.d2d38a8b81c1e36b7b54d1d29b5b49c3d19d7d69-5d7d65d1d29b7b59-4f2f43d7d69g1f39-4d7d66c1e35a8b82d1d29b7b59f2f42b5b49c3d19-3g1e27b5b45c3d19c6d49e1g19e7e69e2c19-6c6d44e1g19-6c6d41d1d29d8a59-3e7e51d1d29c6d41-1c8e61-1g8e76e3h65g7h69d2h69c6d49-4f2f44-4e7e63d1d29a8b83f2f43g8e79g1f39-3g1e26c6d49-3c6d42c3d19-2d8a51-1g8e71e3h69-4g8f61h2h39e8g89d1d29-5f2f43a8b81g1f39b7b59-3e7e51g1f33g8e79-2g1h36g8e79e1g19-4e7e67g1f39g8e79c1e31c6d49-2e1g19e8g89c1e39a8b81-1b7b61e3f29-2c6d47a1b11-1d1d22a8b89-2e3f21-1e4e55c8d72-1e7f57e3f29d4f39d1f39f5d49f3d19-14g8f61g1f39e8g89e1g19a8b89h2h39b7b59-8g1e21a8b82-1e7e52-1e7e65c1e33-1e1g16g8e79c1e39-5g1f31-1g1h31-2e7e51-1e7e62c1e37b7b61-1c6d42c3e23-1d1d26g8e79c3d19-4d7d67d1d27a8b83g1e29c6d49-3c6d43c3d19-2g8e72e3h69e8g89h2h49-5f2f42g8e79g1f39e8g89e1g19-7f2f42d7d63g1f39g8e79e1g19e8g89c1e39-6g8e76g1f39d7d64-1e8g85e1g19-5g1e21g8e79-3g8f61f2f49d7d69g1f39-5B25.f2f41d7d67d2d33e7e69g1f39g8e79-4g1f36e7e69e1g19g8e79d2d39e8g89-7e7e62-2g1e21d7d65d2d33e7e69-2e1g16e7e69d2d39g8e79-5e7e64d2d35g8e79c1e39-3e1g14g8e79d2d39-8B24.g8f61f1g29d7d64-1e7e65-5B23.d7d61d2d31b8c69-2f1c41-1f2f44a7a61g1f39-2b8c64f1b51c8d79-2g1f39e7e61-1g7g67f1b52c8d75-1f8g74-2f1c47f8g79e1g19e7e67d2d39g8e79d1e19e8g89f4f59-6g8f62d2d39e8g89-7g8f61-3e7e61g1f39-2g7g63g1f39f8g79f1b51c8d79-2f1c48b8c67e1g19";
c0_opn[45]="e7e69d2d39g8e79d1e19e8g86f4f59-2h7h63-7e7e62e1g19g8e79-7g8f61g1f39-3g1e21b8c62d2d49c5d49e2d49-4g8f67d2d45c5d49e2d49a7a69-4g2g34-3g1f31a7a61-1g8f68d2d49c5d49f3d49a7a69-6g2g33b8c65f1g29g7g68d2d39f8g79c1e36e7e54-1e7e65d1d29-3f2f43e7e69g1f39g8e79e1g19e8g89c1e39c6d49-11g8f61d2d39-4g7g62f1g29f8g79d2d39b8c69c1e35-1f2f44e7e69g1f39g8e79-9g8f61f1g29b8c69d2d39-6e7e51-1e7e61d2d31b8c69-2f1c41b8c69-2f2f42a7a61g1f39b7b53-1b8c66g2g39-4b8c63g1f39a7a64-1d7d55f1b59-4d7d54d2d31-1e4d51e6d59-2f1b53b8c64-1c8d75-2g1f34d5e49c3e49-5g1e21a7a63g2g39b7b59f1g29c8b79-5b8c65d2d44c5d49e2d49-3g2g35d7d59-3d7d61-2g1f33a7a64d2d47c5d49f3d49b7b53f1d39d8b69-3d7d61-1d8c74f1d39-5g2g32b7b55-1b8c64f1g29-4b8c63d2d48c5d49f3d49d7d61-1d8c73c1e39-2g8f64d4b59-5f1b51g8e79-3d7d51-1d7d61d2d49c5d49f3d49g8f69-6g2g33a7a61f1g29-2b8c63f1g29g7g66d2d39f8g79c1e39d7d69d1d29-6g8f63d2d39f8e79-5d7d55d2d32b8c63-1g8f66f1g29-3e4d55e6d59d2d42c5d49d1d49-3f1g27g8f69d2d37d5d45c3e49f6e49-3f8e74g1e29-3g1e22d5d49c3e49f6e49g2e49-9f1g21d5d49c3e29-6g7g61d2d41-1f2f43f8g79g1f39b8c69f1b59c6d49-6g1f31f8g79d2d49c5d49f3d49b8c69c1e39g8f69f1c49-9g2g34f8g79f1g29b8c69d2d39d7d69c1e39-8g8f61-2B20.b2b31b7b61c1b29c8b79b1c39e7e69-5b8c64c1b29d7d65f1b57c8d76-1e7e53-2f2f42-2e7e53f1b59-2e7e61-3d7d51-1d7d62c1b29b8c63f1b59-2g8f66b1c35-1f1b54-4e7e51c1b29-2e7e61c1b29-2g8f61e4e59f6d59c1b29-5b2b41b7b61b4c59b6c59-3c5b48a2a36b4a33-1d7d56e4d59d8d59-4c1b21-1d2d42d7d59-4B22.c2c31a7a61-1b7b61d2d49c8b79f1d39g8f69b1d26c5d49c3d49b8c69-4d1e23-6b8c61d2d49c5d49c3d49d7d53e4d59d8d59-3d7d62-1e7e63-5d7d53e4d59d8d59d2d49b8c61c1e31-1d4c51-1g1f39c5d41c3d49e7e59b1c39f8b49c1d29b4c39d2c39e5e49f3e59c6e59d4e59g8e79-13c8g45d4c51-1f1e29c5d45c3d49e7e69b1c36d5a59e1g19g8f69h2h39g4h59-6e1g13g8f69b1c39-6e7e63e1g15g8f69-2h2h34g4h59-3g8f61-3e7e51-1e7e61-1g8f61c1e34c5d49-2f1e25-4c5d41c3d49b8c69g1f39c8g43b1c35-1f1e24-2e7e54b1c39f8b49c1d29b4c39d2c39e5e49f3e59c6e59d4e59g8e79-11e7e62b1c39-6e7e51d4e59d5e59-3e7e61b1a31-1g1f39b8c61f1e29-2g8f68b1a32d5d89-2c1e32c5d49c3d49b8c69b1c39d5d69-6f1d32b8c64e1g19-2f8e75";
c0_opn[46]="e1g19e8g89-4f1e23b8c63e1g19-2c5d43c3d49-2f8e73e1g19-6g7g61c1e31c5d49-2d4c52d5c59c1e39c5c79-4g1f36f8g79b1a34c5d43-1g8f66f1c49d5e49c1e39e8g89-6c1e33c5d49c3d49-3f1e22-4g8f65b1a31-1c1e31c5d49c3d49e7e69-4d4c51d5c59-2g1f39b8c61c1e34c5d49c3d49-3f1e25c5d49c3d49e7e69-5c5d41c3d49-2c8g45b1d21b8c69f1c49g4f39d1b39c6a59-6d1a41b8d72-1g4d77a4b39c5d49-4d4c51d5c56b1a39a7a69c1e39c5c79-5d5d13e1d19e7e59b2b49e5e49h2h39g4h59g2g49f6g49h3g49h5g49b1d29e4f39-14f1e27c5d41c3d49e7e69-3e7e69b1a31-1c1e31c5d49c3d49b8c69b1c39-5e1g14b8c68c1e35c5d49c3d49f8e79b1c39d5d69-6h2h34g4h59c1e39c5d49c3d49f8e79b1c39d5d69-9f8e71-2h2h34g4h59b1a31-1c1e31-1c3c41-1e1g17b8c69c1e39c5d49c3d45f8e79b1c39d5d69a2a34e8g89d1b39-3d1b35e8g89f1d19-7f3d44h5e29d1e29c6d45e3d49f8e79f1d19-4f8e74-13e7e63b1a31b8c64-1d5d85-2c1e33c5d49c3d49b8c67b1c39d5d69a2a39f8e79f1d39e8g89-7f8b42b1c39e8g89-6f1d32b8c65e1g19-2f8e74e1g19e8g89c1e39-5f1e22b8c64e1g19c5d49c3d49f8e79b1c39d5d69-7c5d42c3d49-2f8e73e1g19e8g89-5g7g61f1e29-5g1f31b8c64-1g8f65d2d49-4g8f61d2d49-3e4e51-2d7d61d2d49b8d71g1f39-2c5d42c3d49g7g62-1g8f67b1c39e7e66g1f39f8e79-3g7g63-5g8f67d4c52b8c69d1c24-1f2f35d6d59e4d59-5f1d36b8c62g1f39c8g49d4d59-4c5d42c3d49g7g69-3e7e51-1g7g64g1f39f8g79e1g19e8g89h2h39-7f2f31-3g1f31-2d8a51g1f39b8c67-1d7d62-3e7e51g1f39b8c69d2d42c5d49c3d49-3f1c47d8c76e1g19-2f8e73-5e7e61d2d49c5d41c3d49d7d59e4e59-4d7d59e4d56d8d51g1f39g8f69-3e6d58c1e32c5c45b2b39c4b39a2b39b8c65-1f8d64-5c5d44e3d49b8c69-4g1f37b8c68c1e32c5c49b2b39c4b39a2b39f8d69-6f1b55f8d69d4c56d6c59e1g19g8e79b1d29e8g89d2b39c5b64-1c5d65-8e1g13g8e79d4c59d6c59b1d29e8g89d2b39-9f1e21-2g8f61-4e4e53b8c67g1f39c8d74f1e29-2d8b65a2a36-1f1e23-4d8b62g1f39c8d79-6g1f31b8c64d2d49d7d59-3d7d55e4d59e6d59-5g7g61d2d49c5d49c3d49d7d58e4d56g8f69b1c36f6d55f1c49-2f8g74-2f1b53b8d79b1c39f8g79-6e4e53b8c69b1c39f8g79-5f8g71b1c39d7d69-6g1f31f8g79-3g8f63d2d31b8c69-2e4e59f6d59d2d47c5d49c3d42b8c61g1f39d7d69f1c49d5b69-5d7d64f1c41d5b69-2g1f38b8c67b1c32d6e59d4e59-3f1c47d5b69c4b33-1c4b56d6e59f3e59c8d79-7e7e62-3e7e63b1c34d5c39b2c39d8c79c1d29-5g1f35b7b65-1d7d64";
c0_opn[47]="-4d1d41e7e69f1c41b8c69d4e49-3g1f38b8c69d4e49d7d64b1d29d6e59f3e59c6e59e4e59-6f7f55e4e26d8c79g2g39-3e5f63d5f69-8f1c41d5b69c4b39-3g1f36b8c65c3d43d7d69b1c31-1e5d61d8d69-2f1c48d5b68c4b33d6e59d4d59c6a59b1c39-5c4b56d6e59f3e59c8d79b5c64d7c69e5c69b7c69e1g19g7g69-6e5d75d8d79b1c39e7e69e1g19-10e7e61e1g19f8e79-5e7e61-2f1c46d5b68c4b39d7d55e5d69d8d69b1a31-1e1g18c8e69b1a35d4c35d1e29e6b39a3b59d6b89a2b39-6e6b34d1b39-3b3e64d6e69f3d49c6d49d1d49a8d89d4h49-12d7d62e5d69d8d69e1g19c8e69b1a34-1b3e65d6e69f3d49c6d49d1d49a8d89d4h49-12g7g61c3d45f8g79-2f3g54d7d59e5d69e7e69-7e7e61c3d49d7d69e1g19f8e79d1e29e8g89-9d7d61c3d49b8c69f1c49-4e7e64c3d49b7b64b1c37d5c39b2c39d8c79c1d29c8b75f1d39d7d69e1g19b8d79f1e14d6e59f3e59-3f3g55d6e59d1h59-8d7d63f1d39b8d79e1g19-4f8e71f1d39-7f1d32c8a69-3b8c61-1d7d65a2a32c8d79f1d39d7c69e1g19b8d79b2b49a7a69-8b1c33d5c39b2c39d8c79c1d29b8d79e5d69f8d69f1d39b7b69e1g19c8b79-12f1c44b8c64e1g19f8e79d1e29e8g89-5d5b65c4b34-1c4d35-5f1c41-4e7e61g1f39c5d49-4f1c41d5b69c4b39-3g1f32b8c65b1a31-1d2d44c5d49c3d46d7d69f1c49d5b69c4b33-1c4b56d6e59f3e59c8d79e5d79d8d79b1c39e7e69-12f1c43d5b69c4b39d7d59e5d69d8d69e1g19c8e69-10f1c44d5b69c4b39c5c44b3c29d8c79d1e29g7g59h2h39f8g79e1g19c6e59f3g59-10d7d53e5d69d8d69e1g19-4g7g61-5d7d61d2d49c5d49c3d49-4e7e63d2d45c5d49c3d49b7b64b1c36d5c39b2c39d8c79c1d29-5f1d33-2d7d65f1c49d5b69-6f1c44d5b64c4b39d7d69-3d7d65d2d49c5d49c3d49-7g2g31b8c63f1g29-2d7d66e5d69d8d63f1g29b8c69-3e7e66f1g29f8d69g1f39b8c69e1g19e8g89-14B20.c2c41b8c68b1c35e7e61-1g7g69d2d31f8g79-2g2g38f8g79f1g29d7d65d2d34-1g1e25-2e7e64g1e29g8e79e1g19e8g89d2d39-11g1e22g7g65d2d49c5d49e2d49f8g79c1e39-6g8f64b1c39e7e69d2d49-5g1f31-1g2g31g7g69f1g29f8g79-5d7d61-1e7e51-1e7e61b1c39-2g7g61-2d2d31b8c67b1c31-1f2f41d7d53-1g7g66g1f39f8g79g2g39-5g1f31g7g69g2g39f8g79f1g29-5g2g37d7d52b1d29g8f69f1g29-4e7e61f1g29-2g7g67f1g29f8g79b1c31-1f2f48d7d66g1f39e7e52e1g19g8e79-3e7e65e1g19g8e79c2c39e8g89c1e39b7b69e3f29-8g8f62e1g19e8g89-5e7e63g1f39g8e79e1g19e8g89c2c39-7g1f31-6d7d51-1d7d61g2g39g7g69-3e7e61g1f32-1g2g37d7d59b1d29-4g7g61g2g39f8g79f1g29b8c69";
c0_opn[48]="f2f49d7d69g1f39-9d2d41c5d49c2c38d4c35b1c39a7a61-1b8c66f1c41e7e69g1f39-3g1f38d7d65f1c49a7a62e1g19g8f69-3e7e66e1g19a7a62-1f8e73d1e29-2g8f64d1e29f8e79f1d19-6g8f61-3e7e63f1c49a7a66e1g19g8e79c1g59-4d8c73e1g19g8f69-5g7g61f1c49f8g79-5d7d61f1c45g8f69-2g1f34-2e7e61f1c43-1g1f36a7a69f1c49b7b59c4b39-8d4d31c3c41-1f1d38b8c69c3c44-1g1f35d7d69-5d7d51e4d59d8d59c3d49b8c69g1f39-6g7g61-1g8f62e4e59f6d59c3d42d7d64-1e7e65-2d1d41e7e69-2f1c41-1g1f34b8c64c3d49d7d69-3e7e65c3d49b7b69-8d1d41b8c69d4e39-3g1f31b8c63f3d49-2d7d63f3d49g8f69b1c39-4e7e62-3e7e61-2f1c41b8c63g1f39-2d7d61-1e7e65b1c39a7a64-1b8c65-4B21.f2f41a7a61-1b8c62g1f39d7d61f1b59-2e7e62f1b59-2g7g65f1b59f8g79b5c69b7c69-7d7d53b1c32d5d44-1d5e45c3e49-3e4d56d8d54b1c39d5d89g1f39b8c63-1g8f66-5g8f65f1b59c8d79b5d79d8d79c2c49e7e69d1e29f8d69-10e4e51b8c69g1f39-4d7d61g1f39b8c69-3e7e51-1e7e61g1f39a7a61-1b8c63-1d7d54f1b59c8d79b5d79-6g7g61g1f39f8g79b1c39b8c69-5g8f61-2B20.g1e21b8c64b1c36d7d62-1e7e61-1g7g63d2d49c5d49e2d49f8g79c1e39-6g8f62g2g39-3d2d43c5d49e2d49g8f69b1c39d7d69-7d7d62b1c34g8f69g2g39-3g2g35g7g69f1g29-4e7e61b1c35-1d2d44c5d49e2d49-4g7g61-1g8f61b1c39-3B27.g1f37B28.a7a61b1c31b7b52d2d49c5d49f3d49c8b79-5b8c61d2d49c5d49f3d49-4d7d62d2d49c5d49-3e7e63d2d49c5d49f3d49d8c79-6c2c32d7d54e4d59d8d59d2d49e7e65f1e29g8f69e1g19-4g8f64f1e29-6d7d61d2d49-2e7e62d2d49d7d59e4d55e6d59-2e4e54-4g7g61-1g8f61e4e59f6d59d2d49c5d49-6c2c42b8c63d2d49c5d49f3d49g8f69b1c39-6d7d62d2d49c5d45f3d49g8f69b1c39-4c8g44-3e7e64b1c37b8c65-1d8c74-2d2d42c5d49f3d49-5d2d31-1d2d42c5d49f3d49e7e51d4b39-2g8f68b1c38e7e59d4b35f8b49f1d39d7d59e4d59-5d4f34f8b49c1d29-5f1d31-5g2g31-2B27.b7b61d2d49c5d49f3d49c8b79b1c39a7a69-7B30.b8c63b1c31d7d61d2d49c5d49f3d49e7e51-1g8f68c1g53e7e69d1d29a7a65e1c19h7h69-3f8e74e1c19-5f1c42e7e69c1e39-3f1e21e7e59-2f2f31-1g2g31-5f1b51c8d79-3e7e51f1c49d7d64d2d39f8e79e1g12g8f69f3g59e8g89f2f49-5f3d27e7g53-1g8f66d2f19c8g49f2f39g4e69f1e39e8g89e1g19-12f8e75d2d39d7d66e1g12g8f69f3g59e8g89f2f49-5f3d27e7g54h2h49-2g8f65d2f19c8g49f2f39g4e69f1e39e8g89e1g19-10g8f63f3d29d7d69d2f19-8e7e62d2d48c5d49";
c0_opn[49]="f3d49a7a61-1d7d61-1d8c74c1e33a7a69f1d39-3f1e24a7a69e1g19g8f69c1e35f8b49-2g1h14-5g2g32a7a69f1g29g8f69e1g19-6g8f63d4b55d7d69c1f49e6e59f4g59a7a69b5a39b7b59g5f69g7f69c3d59-11d4c64b7c69e4e59f6d59c3e49d8c79f2f49-11f1b51g8e79e1g19a7a69b5c69e7c69-7g7g62d2d47c5d49f3d49f8g79c1e38d7d61-1g8f68d4c61b7c69e4e59-3f1c47d8a52e1g19e8g89c4b34d7d69-2d4b35-4e8g87c4b39a7a54-1d7d65f2f39c8d79d1d29c6d49e3d49b7b59-10f1e21e8g89e1g19-5d4b31g8f69f1e29e8g89e1g19d7d69f1e19-11f1b51f8g79e1g19-3f1c41f8g79e1g19-3g2g31f8g79f1g29-4g8f61d2d43c5d49f3d49e7e59d4b59d7d69c1g59a7a69b5a39b7b59g5f69g7f69c3d59-13e4e51f6g49d1e29-3f1b55c6d44e4e59d4b59c3b59f6d59f3g59-6d8c73e1g19c6d49-3g7g62-4b2b31d7d66c1b29-2e7e53-2b2b41-1c2c31d7d54e4d59d8d59d2d49c5d41c3d49e7e59b1c39f8b49c1d29b4c39d2c39e5e49f3e59c6e59d4e59g8e79-13c8g43f1e29c5d45c3d49e7e69b1c39-4e7e64h2h39g4h59c3c49-6e7e51-1e7e61f1e29-2g8f61f1e29e7e69e1g19-8d7d61d2d49-2e7e51f1c49-2e7e61d2d49d7d59e4d57e6d59f1b59f8d69-4e4e52-4g8f63d2d31-1e4e59f6d59d2d48c5d49c3d45d7d68f1c49d5b69c4b33-1c4b56d6e59f3e59c8d79-7e7e61-2f1c44d5b67c4b39d7d59e5d69d8d69e1g19c8e69-7e7e62c3d49d7d69-6f1c41d5b69c4b39-7c2c41e7e55-1g7g64-2d2d31d7d61g2g39g7g69f1g29f8g79e1g19-6e7e61g2g39d7d59b1d29-4g7g67g2g39f8g79f1g29d7d63e1g19e7e56c2c39g8e79-3g8f63-3e7e52e1g19g8e79c2c39e8g89-5e7e62e1g19g8e79c2c34-1f1e15-4g8f61e1g19e8g89-7g8f61-2B32.d2d46c5d49c2c31d4c36b1c39d7d69f1c49-4g8f63e4e59f6d59-4f3d49a7a61b1c39e7e69-3d7d51-1d7d61b1c37g7g63c1e39-2g8f66-2c2c42g8f69b1c39-4d8b61d4b39e7e61-1g8f69b1c39e7e69a2a31-1c1e33b6c79a2a34a7a69f2f49d7d69-4f1d35a7a69-4d1e21f8b49c1d29e8g89a2a39b4e79-6f1d34a7a63e1g19-2d7d62e1g19-2f8e73e1g19-5f1d31e7e69e1g19-5d4b51-1d4c61-2d8c71b1c38e7e69c1e33a7a68d1d23g8f69e1c15f8b49f2f39-3f2f34-3f1d34b7b52-1g8f67e1g19c6e59h2h39f8c59g1h19d7d69-8f1e21g8f69e1g19f8b49-5g8f61-2d4b51c7b89c1e39-3f1e24a7a69c1e31g8f69-2e1g19g8f69c1e36f8b47c3a49b4e79d4c69b7c69a4b69a8b89b6c89c7c89e3d49-10f8e72f2f49d7d69-4g1h13c6d46d1d49f8c59d4d39b7b59f2f49c8b79e2f39h7h59e4e59-10f8e73f2f49d7d69c1e39e8g89-9g8f61e1g19a7a69-4f2f41";
c0_opn[50]="a7a69-2g2g31a7a69f1g29d7d62e1g19c8d79-3g8f67e1g19c6d43d1d49f8c59-3f8c56d4c69d7c69-10c1e31-1c2c41g8f69b1c39f6e49-4d4b51c7b89c2c47g8f69b5c39e7e69-4f1d32-4e7e51d4b31g8f69-2d4b59a7a61b5c31-1b5d69f8d69d1d69d8e71-1d8f69d6a31-1d6c71g8e79b1c39-3d6d14f6g69b1c39d7d54c3d59g6e49c1e39c6d49d5c79e8e79a1c19-8g8e75h2h49h7h59c1g59-7d6d21-1d6f62g8f69b1c39c6b45f1d39-2d7d54-9d7d67a2a41c8e65b1c39a7a69b5a39-4f8e74b1c39-3b1c34a7a69b5a39b7b58c3d59c6e73c1g51-1c2c48e7d59d1d52c8e69-2e4d57b5c49a3c49g8f69c1e39a8b89f1e29-10f8e71-1g8e73c1g52h7h69-2c2c47c6d47c1e39e7d59c4d59f8e79f1d39e8g89e1g19-8e7d52-3g8f62c1g59f8e79g5f69e7f69c2c39e8g89a3c29f6g59-11c8e61a3c49-2f8e71-1g8f61c1g59-5c1e31-1c2c44a7a61b5c39-2c8e61b1c39a7a69b5a39a8c84-1f8e75-5f8e78b1c35a7a69b5a39c8e65a3c23e7g59f1e29-3f1d32e7g59-2f1e23e7g59e1g19-4f7f54e4f57c8f59f1d39f5e69e1g19g8f69-6f1d32f5f49-6b2b31a7a62b5c39-2f7f53-1g8f64f1d39e8g89e1g19-5f1d31a7a64b5c39e7g59-3c8e65e1g19-3f1e21c8e69e1g19-5f1c41-2g8f61b1c39d7d69c1g59a7a69-6d4c61b7c69-2d4f31g8f69b1c39f8b49-5e7e61b1c37a7a62c1e32-1d4c61b7c69-2f1e24d8c79e1g19g8f69-4g2g31-2d7d61c1e39g8f69-3d8c76c1e33a7a69d1d22g8f69-2f1d35g8f69e1g19-3f1e22g8f69-4f1e23a7a68e1g19g8f69c1e35f8b46c3a49-2f8e73f2f49d7d69-4g1h14c6d49d1d49f8c59d4d39-8g8f61e1g19a7a69-4f2f41a7a69-2g2g31a7a69f1g29d7d62e1g19-2g8f67e1g19-6g8f61-2c1e31g8f69-2d4b51d7d69c1f44e6e59f4e39a7a64b5c39-2g8f65e3g59-5c2c45g8f69b1c39a7a69b5a39f8e79f1e29e8g89e1g19b7b69c1e39-13d4c61b7c69-3B34.g7g61B35.b1c34f8g79c1e38d7d61-1g8f69d4b31e8g89f1e29-3d4c61b7c69e4e59f6d54c3d59c6d59d1d59a8b89f1c49-6f6g85e3d44-1f2f45-5f1c46d7d61f2f39-2d8a52e1g19e8g89c4b36d7d69h2h39c8d79f2f49c6d49e3d49d7c69-8d4b33a5c79-5e8g86c4b38a7a53a2a42f6g49d1g49c6d49-4e1g13a5a49c3a49f6e49d4b59-5f2f34d7d59b3d59f6d59e4d59c6b49d4e29-8d7d65f2f37c8d79d1d28a8c83-1c6d46e3d49b7b59-4h2h41-3h2h32c8d79e1g19-4d8a51-1f6g41d1g49c6d49-4e1g11-1f2f31d8b69-4f1e21e8g89d4b32d7d69e1g19-3e1g17d7d59e4d59c6b43-1f6d56c3d59c6d44e3d49d8d59d4g79d5d19-5d8d55e2f39-9f2f31e8g89d1d27d7d59d4c64b7c69-2e4d55f6d59-4f1c42d8b69-6d4b31";
c0_opn[51]="g8f69f1e29e8g89e1g19d7d69c1g55-1f1e14-7d4e21g8f69g2g39e8g89f1g29-7B34.c1e31f8g76b1c39g8f69f1c46e8g89-2f1e23e8g89-5g8f63b1c39f8g79f1c49-5B36.c2c44B37.f8g76B38.c1e39d7d61b1c39g8f69f1e29e8g89e1g19-6B39.g8f69b1c39d7d61f1e29e8g89e1g19c6d42e3d49-2c8d77a1c13-1d1d26c6d49e3d49d7c69f2f39-10e8g85f1e29b7b63e1g19c8b79f2f39d8b83d1d29f8d89-3e7e66-5d7d66e1g19c8d79a1c11-1d1d28c6d49e3d49d7c69e2d32-1f2f37a7a59b2b39-12f6g43d1g49c6d49g4d19d4e66a1c16d8a59d1d25-1f1e24-3d1d23d8a59a1c19b7b69-5e7e53c3b53e8g89-2f1d36e8g89e1g19d7d69-11B38.g8h61-2B37.d4c21-2B36.g8f63b1c39c6d42d1d49d7d69c1e32f8g79-2c1g53f8g79f1e29-3f1e24f8g79c1e39e8g89d4d29c8e69-9d7d67d4c21f8g79f1e29f6d79-4f1e28c6d48d1d49f8g79c1e35e8g89d4d29c8e69a1c13d8a59f2f39f8c89b2b39-5e1g14d8a59a1b19f8c89b2b39-5f2f31d8a59-6c1g52e8g89d4d29c8e69a1c19d8a59f2f39f8c89b2b39-9e1g11e8g89-5f8g71c1e39e8g89e1g19-5f2f31c6d49d1d49f8g79-8B34.d4c61b7c69d1d49g8f69e4e59f6d59e5e69-7f1c41f8g79c1e39g8f69-4f1e21f8g79d4b39g8f69b1c39e8g89e1g19d7d69-8g2g31f8g79-3B32.g8f65B33.b1c39a7a61-1d7d63c1e31e7e52-1e7e62-1f6g45e3g59-3c1g54a7a61-1c8d71d1d27a8c89e1c16c6d49d2d49d8a59-4f2f43-3f1e22d8a59g5f69g7f69-5d8b61d4b39e7e69d1d29a7a69-5e7e68d1d29a7a66e1c19c6d41d2d49f8e79f2f49-4c8d74f2f32f8e79h2h49-3f2f47b7b55d4c62d7c69-2g5f67g7f69c1b16d8b69d4c69d7c69d2e19-5d4c63d7c69-5f8e72d4f39b7b59-3h7h62g5h49-4f8e71-1h7h64d4c61b7c69g5f49d6d59d2e39-5g5e36c6d41e3d49b7b59-3c8d73f2f35-1f2f44-2d8c71-1f8e74f2f34c6d49e3d49-3f2f45c6d49-4g5f42c8d79d4c69d7c69f2f39d6d59d2e19f8b49a2a39-12d8b61d4b39-2f8e73e1c19a7a61-1c6d42d2d49e8g89f2f49d8a59f1c49c8d79e4e59d6e59f4e59-10e8g86d4b32d8b69f2f39f8d89-4f2f31-1f2f46c6d47d2d49d8a59c1b12-1f1c47c8d79e4e59d6e59f4e59-8h7h62g5h49-6h7h61g5f69g7f69-4d1d31-1f1b51c8d79-2f1e21-3f1b51c8d79-2f1c42c8d71c4b33g7g69-2e1g16g7g69-3d8b63d4b35e7e69c1e32b6c79-2c1f42c6e59c4e29-3e1g14a7a63-1f8e76c1e39b6c79-6d4b51a7a69c1e39b6a59b5d49-5d4c61b7c69e1g19g7g69-4d4e21e7e69e1g19-4e7e65c1e36a7a64c4b34d8c79-2d1e25d8c79e1c19c6a59-5f8e75c4b32e8g89-2d1e27a7a65e1c19d8c79c4b39-4e8g84e1c19a7a69c4b39-7c4b32";
c0_opn[52]="a7a63-1f8e76c1e36e8g89-2e1g13-3e1g11f8e79-3g7g61-2f1e21e7e55d4b35f8e79c1e32e8g89e1g19-3e1g17e8g89c1e34a7a55a2a49-2c8e64-2f2f42a7a59-2g1h12a7a59a2a49-7d4f34f8e71-1h7h68e1g19f8e79f1e19e8g89h2h39c8e69e2f19c6b89-11e7e62c1e32f8e79e1g19-3e1g17f8e79c1e37e8g89f2f49-3g1h12-4g7g62c1e35f8g79d1d23-1e1g16e8g89-4e1g14f8g79c1e34e8g89-2d4b35e8g89-6f2f31e7e57d4b39c8e62-1f8e77c1e39c8e62-1e8g87d1d29a7a59f1b59c6a79-9e7e62c1e39f8e79d1d29e8g89-6f2f41-1g2g31g7g69d4e24-1f1g25c6d49d1d49f8g79-7d8b61d4b39e7e69-3d8c71-1e7e55d4b31f8b49c1g52-1f1d37d7d59e4d59f6d59c1d29d5c39b2c39-9d4b59d7d69a2a41a7a68b5a39c8e66c1g54f8e79-2f1c45a8c85-1f8e74-3c8g41f2f39g4e69-3f8e71-3c8e61-2c1g58a7a69b5a39b7b59c3d55d8a52g5d29a5d89c2c41-1d2g58d8a59g5d29a5d89d2g53-1f1d36-4f8e71-2d5f61d8f69-2f1d31-4f8e77d5e71c6e79f1d33-1g5f66g7f69c2c49-5g5f69e7f69c2c39a8b81a3c29f6g59-3c6e71a3c22e7d59d1d59-3d5f67g7f69a3c23-1f1d33-1f1e23-4c8b71a3c29c6b89a2a49-4e8g85a3c29a8b82f1e25-1h2h44-2f6g57a2a47-1f1d31-1f1e21-1h2h41-3f1e21f6g59-3f6g52a3c29a8b82a2a49-2c6e71c2b49-2e8g85a2a49-5c2c41b5b49a3c29a6a59-4f1d31-2g7f61-4g5f64g7f69c3d59f6f56c2c33f8g79e4f59c8f59a3c29-3f1d31c8e69-4e4f51c8f59c2c39f8g79a3c29-5f1b51a6b59a3b59a8a49b2b49-5f1d34c8e69c2c31f8g79d1h59-3d1h52f8g73e1g19-2h8g86g2g39-3e1g16e6d57e4d59-2f8g72d1h59-5g2g31f5e49f1g29-4f8g73c2c34c6e71-1f6f59e4f58c8f59a3c29-3f1d31c6e79d5e79-5f1d34c6e79d5e79d8e79c2c32-1c2c42-1e1g14-4c8e61-2g2g31f6f59f1g29-8c8e61a3c49a8c89c3d52e6d59g5f69-3c4e33f8e79-2g5f64g7f69c4e39-6f8e71-2g5f61g7f69b5a39b7b58c3d59f6f56e4f53c8f59c2c39-3f1d36c8e69-3f8g73c2c39f6f59e4f59c8f59-7f6f51-6c3d51f6d59e4d59c6b87a2a41f8e79-2c2c49a7a62b5c39f8e79f1e29e8g89e1g19f7f59f2f49-8b8d71-1f8e76f1d34a7a63b5c39e8g89e1g19f7f59-5e8g86e1g19a7a69b5c39f7f59-6f1e25a7a62b5c39e8g89e1g19f7f59-5e8g87e1g19a7a69b5c39f7f59-9c6e72c2c34e7f59a2a49f8e79-4c2c45e7f55f1d39-2e7g64-7h7h61b5d69f8d69d1d69d8e79-6d4c61b7c69-2d4e21-1d4f31f8b49f1d39d7d59-4d4f51d7d59e4d59c8f59d5c69b7c69d1f39d8d79c1g59-10e7e61a2a31-1c1e31f8b49f1d39d7d59-4c1g51-1d4b56d7d64c1f49e6e59f4g59a7a69";
c0_opn[53]="b5a39b7b58c3d55d8a52g5d29a5d89-3f8e77g5f69e7f69c2c39-5g5f64g7f69c3d59f6f56f1d39-2f8g73-5c8e61-7f8b45a2a39b4c39b5c39d7d59e4d59e6d59f1d39e8g89e1g19d5d49c3e26c8g49-2c3e43c8f59c1g59-15d4c61b7c69e4e59f6d59c3e49d8c79f2f49-7f1e21f8b49-3g7g61c1e35f8g79f1c45e8g89c4b39-3f2f34e8g89-4d4c63b7c69e4e59f6g89f1c49f8g79d1f39-7f1e21f8g79-4B32.d4c61b7c69f1d39-7B30.f1b51a7a61b5c69b7c63e1g19-2d7c66d2d35-1e1g14-4B31.c6a51c2c39-2B30.c6d41f3d49c5d49e1g19-4d7d61b5c61b7c69e1g19c8g44-1e7e55c2c39-5c2c31g8f69d1e29-3d2d41c5d49d1d49c8d79b5c69d7c69b1c39g8f69c1g59e7e69e1c19f8e79h1e19-13e1g16c8d79c2c32a7a62-1g8f67f1e19a7a69-4f1e17a7a62b5c64d7c69d2d49c5d49f3d49-5b5f15d7g49-3g8f67c2c37a7a69b5f19d7g49d2d36e7e69b1d29f8e79h2h39g4h59g2g49h5g69f3h49-9h2h33g4f39d1f39g7g69-8h2h32a7a69b5f19-8d8b61b1c39e7e69e1g19g8e79-5d8c71e1g19a7a65b5c69-2e7e64-3e7e51e1g19-2e7e62b2b31-1b5c63b7c69b2b31f7f63e1g19-2g8e76-2d2d35d7d51-1d8c71-1g8e77d1e25e7g65h2h49h7h59e4e59-4f7f64f3h49g7g69f2f49f8g79-6e1g12e7g69f3g59-3h2h41-3e1g12g8e79b2b34e7g69c1b29f7f69-4d2d35e7g69f3g59-6d7c61-2c2c31-1e1g15g8e79b1c31a7a69b5c69e7c69d2d49c5d49f3d49d8c79-8b2b31a7a65b5c69e7c69c1b29b7b59-5c6d42f3d49c5d49-3e7g62c1b29f7f69-4c2c33a7a68b5a47b7b59a4c29c8b77d1e26d7d59e4e59-3f1e13-2d7d52-4b5e22d7d59e4d59e7d59d2d49c5d49f3d49-8d7d51e4d59d8d59-4d2d41c5d49-2f1e13a7a67b5c63e7c69d2d49c5d49f3d49d7d64-1d8c75-6b5f16d7d58e4d59e7d59d2d49f8e79-5e7g61-3c6d41f3d49c5d49-3e7g61c2c39-6B31.g7g65b5c63b7c63d2d31f8g79-2e1g19f8g79c2c31-1d2d31-1f1e17e7e51-1f7f61c2c39g8h69-3g8f61e4e59f6d59c2c49-4g8h65c2c39e8g89d2d49c5d49c3d49f7f69-11d7c66d2d37c8g41-1f8g79b1c31e7e55c1e39-2g8f64-2e1g11g8f69-2h2h37b7b61b1c39e7e59c1e39-4e7e52b1c32-1c1e37d8e79d1d29g8f69-5g8f66b1c39e8g85c1e39b7b69d1d29e7e59e3h69d8d69-7f6d74c1e39e7e59d1d29d8e74e3h69-2h7h65e1g19d8e79-12e1g11f8g79d2d39-3h2h31e7e52d2d39f7f69-3f8g77d2d39e7e53-1g8f66b1c39-7c2c31f8g75d2d49c5d49c3d49-4g8f64d1e23f8g79e1g19e8g89-4e4e56f6d59d2d45c5d49-2e1g14-5e1g15f8g79b1c31e7e59-2b5c61b7c63-1d7c66d2d39e7e54-1g8f65-4c2c34a7a61-1e7e51d2d34g8e79c1e39-3d2d45";
c0_opn[54]="c5d49c3d49e5d49c1f49-6g8f68d1a41e8g89d2d49c5d49c3d49-5d2d41-1e4e51f6d59d2d49c5d49c3d49e8g89b1c39d5c34b2c39d7d69-3d5c75-8f1e17e8g89d2d45c5d45c3d49d7d59e4e59f6e49b1c35e4c39b2c39-3b5c64b7c69-7d7d54e4e59f6e49b5c69b7c69b1d29c5d49c3d49-9e4e51f6d59d2d49c5d49c3d49-5h2h33d8b62-1e7e57d2d49c5d49c3d49-9f1e14e7e53b2b41-1b5c66b7c61-1d7c68d2d39d8e77a2a39-2g8e72-4c2c32g8e79-3e7e61-1g8f65b1c31e8g89e4e59f6e89-4c2c33e8g89d2d45c5d45c3d49d7d59e4e59f6e49-5d7d54-2h2h34-3e4e55f6d59b1c39d5c79b5c69d7c69c3e49b7b63e4f69e8f89f6e49c8g49d2d39c7e69-7c7e66d2d39e8g89c1e39b7b69d1d29e6d49f3d49-20B30.g8f61b1c34c6d43-1d8c73e1g19-2g7g63-2b5c61d7c69-2d1e21-1e4e53f6d59e1g19g7g69-6f1c41e7e69b1c39a7a69-4f1e21-1g2g31g7g69f1g29f8g79e1g19d7d69-7B50.d7d64b1c31a7a61d2d46c5d49f3d49g8f69-4g2g33-2b8c62d2d49c5d49f3d49g8f69-5g8f66d2d46c5d49d1d41-1f3d48a7a67-1g7g62-4e4e51d6e59f3e59-3f1c41-1g2g31-3b2b31g8f69-2B51.b2b41c5b49d2d49g8f69-4B50.c2c31b8c61d2d49c5d49c3d49-4g7g61-1g8f69d1c21-1d2d31b8c64-1g7g65-2e4e51d6e59f3e59-3f1b51-1f1c41e7e69d1e29-3f1d32b8c66d3c28c8g48d2d36e7e66b1d29f8e79h2h39g4h59-5g7g63-2h2h33g4f35d1f39g7g69-3g4h54-3g7g61-2e1g11-1h2h31-2c8g41d3c29b8c69d2d39-4g7g62d3c26f8g79e1g19-3e1g13f8g79-4f1e25b8c62d2d32g7g69e1g19f8g79-4d2d47c5d49c3d49d6d52e4e59-2f6e47d4d59d8a59b1c39e4c39b2c39c6e59f3e59-12b8d72d1c21-1d2d38b7b66e1g19c8b79b1d29e7e64-1g7g65-5g7g63e1g19f8g79-5c8d71d2d39d7c64-1g7g65e1g19f8g79-5c8g41-1e7e61e1g19f8e79-3g7g63e1g19f8g79e2b55b8d73f1e19a7a65b5f19-2e8g84d2d49-4c8d76b5d79b8d75f1e19e8g89d2d49-4d8d74f1e19-5f1e14e8g89e2f19b8c67h2h39e7e59-3c8g42h2h39g4f39d1f39b8c69-12h2h31b8c64f1d39d6d54e4e59f6d79-3g7g65-3b8d71f1d39-2g7g64f1d39f8g79d3c26e8g89-2e1g13e8g89d3c29-9c2c41e7e55-1g8f64b1c39-3d2d31b8c67g2g39g7g69f1g29f8g79e1g19e7e54c2c39g8e79a2a39-4e7e62-1g8f62-7g7g62g2g39f8g79f1g29b8c69e1g19-7B53.d2d47c5d49c2c31-1d1d41a7a62c1e32b8c65d4b69d8b69e3b69g8f69-5g8f64b1c39-3c1g51b8c69d4d29h7h69g5h49-5c2c45b8c69d4d29g7g65b1c33-1b2b36f8g79-3g8f64b1c39g7g69b2b39f8g79c1b29e8g89-11b8c66f1b59c8d79b5c69b7c61c2c49-2d7c69b1c37e7e61";
c0_opn[55]="c1g59g8f69e1c19f8e79-5g8f68c1g59e7e51d4d39-2e7e69e1c19f8e79d4d32d8a55h2h49-2e8g84f3d49-3h1e17e8g89c1b14d8c79-2d4d23-1e4e52d6e59d4h49d8c79f3e59-12h7h61-2c2c42f7f52-1g8f67b1c39e7e63e1g19f8e79-3g7g66e1g19f8g79d4d39e8g89f3d49-14c8d71c2c49b8c69d4d29g7g64b2b39-2g8f65b1c39g7g69b2b39f8g79c1b29e8g89-11g8f61-2B54.f3d49a7a61b1c36g8f69-2c2c43-2b8c61b1c37g8f69-2c2c42-2e7e51f1b59-2e7e61b1c39-2g7g61b1c39f8g79c1e39-4B55.g8f69B56.b1c39B90.a7a65a2a41b8c62f1e29e7e54-1e7e65-3e7e53d4b34c8e69-2d4f35d8c79-3e7e62c1e32-1f1e27f8e79e1g19e8g89-5g7g61f1e29f8g79e1g19e8g89-6c1e32b7b51-1b8c61f1e23-1f2f36e7e69d1d29f8e79e1c19e8g89-7b8d71-1d8c71-1e7e54d4b38c8e67d1d21b8d76f2f39b7b53-1f8e72-1h7h53-3f8e73f2f39e8g89e1c19-5f1e21f8e79e1g19e8g89-4f2f37b8d74d1d24b7b58a2a47b5b49c3d59e6d59e4d59d7b69e3b69-7e1c12-2f8e71-2g2g45b7b54g4g59b5b49c3d54f6d59e4d59e6f59f1d39-5c3e25f6h59d1d29a6a59e2g39-8d7b61g4g59f6h59d1d29-4f8e71d1d29-2h7h62d1d29b7b59e1c19-6f8e73d1d29b8d71g2g49-2e8g86e1c19b7b52g2g49b5b49-3b8d74g2g49b7b59g4g59b5b49c3e29-6d8c73g2g49f8c89-5h7h51-3h7h51d1d29b8d79e1c19a8c89c1b19-7f2f41e5f49e3f49b8c69-5f8e72f1e21-1f2f39c8e68d1d29b8d73g2g49-2e8g86e1c19b7b52-1b8d74g2g49d8c79-3d8c72g2g49-6e8g81d1d29c8e69e1c19-7d4f31d8c74a2a49f8e79a4a59-4f8e75f1c49e8g89e1g19c8e69-7e7e63a2a41-1d1d21b7b57f2f39b8d79g2g49-4f8e72f2f39-3f1e21d8c73-1f8e76e1g16e8g89f2f49-3f2f43-3f2f34b7b58d1d24b8d76e1c12c8b79g2g49-3g2g47d7b65-1h7h64e1c19c8b79h2h49b5b49-7c8b73g2g49-3g2g45c8b72d1d29-2f6d72d1d29d7b69e1c19-4h7h65d1d29b8d79e1c19c8b79h2h49b5b49c3a49d8a59b2b39-12f8e71d1d29-3f2f41b7b59d1f39c8b79f1d39-5g2g42b7b51g4g59-2e6e52d4f59g7g69g4g59g6f59e4f59d6d59d1f34d5d49e1c19b8d79-4g5f65d5d49f1c49d8c79d1d39-12h7h51-1h7h64f1g23-1f2f46e6e59d4f59h6h59-7f6g41e3c13g4f69c1e36e7e52-1f6g47e3c19-3f2f33-3e3g56h7h69g5h49g7g59h4g39f8g79d1d21b8c69d4b39-3f1e25h6h59d4f52c8f59e4f59-3e2g47c8g45f2f39g4d79g3f29-4h5g44e1g19-5h2h33g4e56d4f55c8f59e4f59b8c69-4f2f34b8c69g3f29-4g4f63d1f39-11B94.c1g52b8c61d1d27e7e69e1c19c8d79-4g5f62g7f69-3b8d71f1c44d8a59d1d29e7e69-4f2f45-2e7e51-1B95.e7e69";
c0_opn[56]="d1d21f8e76e1c19-2h7h63-2d1d31b8d74-1f8e75e1c19-3d1f31b8d73e1c19d8c79-3f8e73e1c19-2h7h63g5h49-3f1e21f8e79-2B96.f2f48b7b51e4e59d6e59f4e59d8c79d1e25f6d79e1c19c8b79e2g49-5e5f64c7e59f1e29e5g59d1d35-1e1g14-10b8c61d1d22h7h69g5f69-3d4c64b7c69e4e59h7h69g5h49g7g59f4g59f6d59c3e49d8b69-10e4e52h7h69g5h49-4b8d71d1f39d8c79e1c19b7b58e4e54c8b79f3h39d6e59d4e69f7e69h3e69-7f1d35c8b79h1e19e8c84-1f8e75-5f8e71g2g49b7b59g5f69d7f69-9c8d71-1B97.d8b62a2a31-1d1d26b6b29a1b17b2a39e4e51d6e59f4e59f6d79-4f1e21-1f4f57b8c69f5e69f7e69d4c69b7c69e4e55-1f1e24-7g5f61g7f69f1e29-5d4b32b2a39g5f69g7f69f1e29b8c69e1g19-8b8c61e1c19-3d4b32b8d75d1f39b6c75e1c19-2f8e74e1c19b6c79-5f8e74d1f39b8d79e1c19b6c79-7B96.d8c71d1f37b7b56e1c19b5b49-3b8c61-1b8d72e1c19-3g5f62g7f69-3B98.f8e73d1f39b8d71e1c19d8c79g2g49b7b59-5d8a51e1c19c8d79-3B99.d8c77e1c19b8c61-1b8d78f1d31b7b53h1e19c8b79-3h7h66g5h49g7g59-4g2g48b7b59g5f69d7f69g4g59f6d79a2a31-1f4f58-4g7f61-3h7h61-3e8g81-1h7h61-3B98.h7h61g5h49b8d72e1c19d8c79-3d8c74e1c19b8d79f1d39g7g59-5g7g52f4g59f6d79-7B96.h7h61g5h49f8e79-6B90.d1f31-1f1c41b7b51c4b39c8b74-1e7e65-3e7e69a2a31b7b53c4a29-2f8e76c4a29-3a2a41f8e79-2c1e31b7b59-2c4b37b7b54a2a31-1c1g52f8e79d1f39d8b64e1c19-2d8c75e1c19-5d1f31-1e1g16b5b41c3a49c8d79-3c8b71f1e19-2f8e77d1f37d8b64c1e39b6b79f3g39b5b49c3a49b8d79f2f39-8d8c75f3g39b8c63-1e8g86c1h69f6e89a1d19c8d79-8f2f42e8g89-4f2f41c8b79-3b8c61c1e39f8e79-3b8d72c1g51d7c59-2e1g11d7c59f1e19-3f2f46d7c59d1f33f8e79-2e4e52d6e59f4e59-3f4f53f8e79d1f39-6f8e72c1e32-1e1g13e8g89f2f49-3f2f42b8c69-2g2g41-3e1g11b7b56c4b39f8e79d1f39d8c79f3g39-6f8e73c4b39e8g89f2f49-7f1d31b8c62-1e7e53d4e29-2e7e62-1g7g61-2B92.f1e22b7b51-1b8c61-1b8d71e1g19-2e7e55d4b39c8e61c1e31-1c1g51-1e1g14b8d74-1f8e75f2f49-3f2f42d8c79-3f8e78a2a41c8e69-2c1e32c8e67c3d56b8d76d1d39e6d59e4d59e8g89-5f6d53e4d59e6f59d1d29-5e1g13e8g89-3e8g82e1g14c8e69-2g2g45c8e69g4g59f6d79-6c1g51b8d74-1c8e65-2e1g16c8e61c1e32-1f2f47d8c79a2a42-1f4f53e6c49-2g1h14b8d79-5e8g88a2a41b8c62-1c8e67f2f49-3c1e33c8e69c3d51-1d1d25b8d79a2a49a8c89a4a59d8c79-6f2f42e5f49-3d8c71-2c1g51-1f2f41";
c0_opn[57]="b7b59-2g1h14b7b51a2a49b5b49c3d59-4b7b63a2a42c8b79f2f39-3c1e35c8b79f2f39b6b59-4f2f32c8b79-3b8c61-1b8d71-1c8e61f2f49d8c75-1e5f44c1f49b8c69-5d8c71f2f49b7b59-6g2g41h7h69-4d4f31f8e75e1g19e8g89-3h7h64e1g19-4e7e63a2a41b8c65c1e35-1e1g14-2f8e74e1g19-3c1e31d8c72-1f8e77d1d22-1e1g17e8g89-4e1g16b7b51e2f39-2b8d71f2f49b7b59-3d8c71f2f49-2f8e77a2a41b8c69c1e39e8g89f2f49d8c79g1h19f8e89-8c1e32d8c72-1e8g87f2f49d8c79-4f2f45b8c61c1e39-2d8c74a2a43b8c69c1e39e8g89g1h19-5c1e32-1g1h13-2e8g84c1e33b8c69-2g1h16d8c79a2a49b8c69c1e39f8e89-10f2f41d8c74e1g19-2f8e75e1g19e8g89-5g7g61c1e35f8g79-2e1g14f8g79-4B90.f2f31b7b51-1b8c61c1e39-2d8b61d4b39e7e69d1e29-4e7e54d4b39c8e68c1e39b8d74d1d24b7b56-1f8e73-2g2g45b7b59g4g59b5b49c3e29f6h59d1d29a6a59e2g39-10f8e74d1d29b8d72g2g49-2e8g86e1c19b8d75g2g49d8c79-3d8c74g2g49f8c89-5h7h51-3h7h51d1d29b8d79-5f8e71c1e39c8e69d1d29b8d74-1e8g85e1c19-8e7e63c1e39b7b56d1d24b8d75g2g49d7b69-3c8b74g2g49-3g2g45c8b71d1d29-2f6d72d1d29d7b69e1c19b8d79-5h7h65d1d29b8d79e1c19c8b79h2h49b5b49c3a49d8a59b2b39-12b8c61d1d29-2b8d71-1f8e72d1d29-5B93.f2f41b8d71-1d8c72a2a41-1d4f32b8d79-2f1d34g7g69e1g19f8g79-4f1e21-2e7e54d4f39b8d78a2a46f8e79f1c41-1f1d38e8g89e1g19d7c54g1h19e5f49c1f49c8g49-5e5f45c1f43-1g1h16-7f1c41-1f1d32f8e79e1g19e8g89g1h19b7b59-7d8c71a2a45f8e79f1d39-3f1d34-4e7e62d1f34d8b65d4b39b6c79-3d8c74-2f1d32-1f1e22f8e79e1g19-4g7g61-2B91.g2g31b8c61f1g29c8d79-3e7e56d4b32b8d73-1f8e76f1g29e8g89-4d4e27b7b52f1g29c8b79-3b8d72a2a44b7b69f1g29c8b79h2h39-5f1g25b7b59-3c8e61f1g29-2f8e73f1g29b8d73-1e8g86e1g19-6e7e62f1g29f8e79e1g19d8c73-1e8g86-5g7g61f1g29f8g79e1g19e8g89h2h39-7B90.h1g11e7e59d4b39c8e69g2g49-5h2h31e7e52d4e29-2e7e65g2g49b7b54-1d6d55-3g7g62g2g49f8g79-5B56.b8c61c1e31e7e52d4b39-2e7e61-1f6g46e3g54h7h69g5h49g7g59h4g39f8g79-6f1b55g4e39f2e39c8d79e1g19-7B60.c1g54a7a61d1d29-2c8d71d1d27a8c88e1c17c6d49d2d49d8a59f2f45-1g5d24-5f2f42-2c6d41d2d49-3f1e22d8a59g5f69g7f69e1g19-6d8b61d4b39e7e69d1d29-4B62.e7e68B63.d1d29B66.a7a66B67.e1c19c6d41d2d49f8e79f2f49b7b59g5f69g7f69-7B68.c8d74f2f33a8c82-1f8e75h2h49-2h7h62g5e39-3B69.f2f46";
c0_opn[58]="b7b56d4c61d7c69-2g5f68g7f69c1b16d8b69d4c69d7c69d2e19-5d4c63d7c69d2e19-6f8e71d4f39b7b59g5f69-4h7h62g5f63d8f69-2g5h46g7g59f4g59f6g49-7B67.d8b61-1f8e71-1h7h63d4c61b7c69g5f49d6d59d2e39f8e79f1e29-7g5e36c6d41e3d49b7b59-3c8d72f2f35-1f2f44-2f8e76f2f35c6d49e3d49b7b59c1b19a8b89-6f2f44c6d45e3d49b7b59-3c8d74-4g5f41c8d79d4c69d7c69f2f39d6d59d2e19f8b49a2a39-12B63.d8b61d4b39a7a65e1c19-2f8e74-3B64.f8e72B65.e1c19c6d43d2d49a7a61-1e8g88f2f32-1f2f47d8a59f1c49c8d79e4e59d6e59f4e59-10e8g86d4b32d8b69f2f39f8d89-4f2f31-1f2f46c6d45d2d49d8a59c1b12-1f1c47c8d79e4e59d6e59f4e59-8h7h64g5h49e6e59d4f59c8f59e4f59e5f49-11B63.h7h61g5f69g7f69e1c19a7a69f2f49-7B62.d1d31-1f1b51c8d79b5c69b7c69d1f39-7B56.d4b31-1f1b51c8d79-2B57.f1c42c8d71c4b34g7g69-2e1g15g7g69-3d8b64d4b36e7e69c1e32b6c79f2f49-3c1f42c6e59c4e29-3e1g14a7a63-1f8e76c1e39b6c79f2f49-7d4b51a7a69c1e39b6a59b5d49-5d4c61b7c69e1g19e7e62-1g7g67-4d4e21e7e69-3e7e51-1e7e64c1e36a7a65c4b33d8c79-2d1e26d8c79e1c19c6a59c4d39b7b59-7f8e74c4b32e8g89-2d1e27a7a65e1c19d8c79c4b39-4e8g84e1c19a7a69-6c4b32a7a63c1e39-2f8e76c1e36e8g89-2e1g13-3e1g11f8e79-4B58.f1e21e7e55B59.d4b34f8e79c1e32e8g89-2e1g17e8g89c1e35-1g1h14-5B58.d4f35h7h69e1g19f8e79f1e19e8g89h2h39c8e69e2f19c6b89b2b39-12e7e61c1e33f8e79e1g19-3e1g16f8e79c1e39e8g89f2f49-6g7g62c1e33f8g79e1g19e8g89-4d4b31f8g79e1g19e8g89-4e1g15f8g79c1e33e8g89-2d4b36e8g89c1g55-1f1e14-7B56.f2f31d8b61d4b39e7e69-3e7e55d4b39c8e62-1f8e77c1e39c8e62-1e8g87d1d29a7a59f1b59c6a79b5d39-10e7e63c1e39a7a62-1f8e77d1d29e8g89e1c19-7f2f41e7e59d4f39f8e79-4B58.g2g31g7g69d4e25f8g79f1g29e8g89e1g19-5f1g24-4B56.b8d71-1c8d71c1g53e7e69d1d29a7a69-4f1c42b8c69-2f1e22-1f2f31-2e7e51d4b34-1f1b55-2B80.e7e61c1e31B81.a7a66f2f39b7b59d1d24-1g2g45-4B80.b8c61-1f8e72f2f39-3c1g51f8e79-2B86.f1c41B87.a7a65c4b39-2B86.f8e74-2B83.f1e23B84.a7a63a2a42-1B85.e1g17d8c74-1f8e75f2f49-4B83.b8c61c1e39-2f8e75c1e31-1e1g18a7a61-1b8c62c1e39-2e8g85c1e34b8c69-2f2f45b8c69c1e39-7B82.f2f41a7a66-1b8c63c1e39-3B80.g2g31b8c64f1g29c8d79-3f8e75f1g29e8g89e1g19-5B81.g2g42a7a61g4g59f6d79-3b8c61g4g59f6d79c1e39-4h7h67g4g53";
c0_opn[59]="h6g59c1g59b8c69-4h2h46b8c69h1g19h6h59g4h59f6h59-9B70.g7g62B72.c1e36b8c61f2f39f8g79d1d29-4f8g79d1d21-1f1c41b8c62-1e8g87f2f39b8c69d1d29c8d79e1c19-7f1e21b8c63d4b34e8g89-2B73.e1g15e8g89-3B72.e8g86e1g19b8c69d4b39c8e69f2f49-7B75.f2f38a7a61d1d29-2b8c63d1d28c8d71e1c17a8c89c1b15-1g2g44-3f1c42-2e8g88e1c14c6d43e3d49c8e69c1b19d8c79g2g46f8c89h2h49-3h2h43f8c89-7c8d71-1d6d55d2e12e7e59d4c69b7c69e4d59-5e4d57f6d59d4c69b7c69e3d49e7e59d4c59-9f1c45c8d79c4b31-1e1c17a8c84c4b39c6e59c1b13e5c49b3c49-3h2h46h7h59e3g59-6c6e53c4b39a8c84-1d8a55-3d8a52c4b39f8c89-4h2h41a8c89c4b39-5g2g41c8e69-4f1c41c8d72d1d29-2e8g87d1d29c8d79e1c19-6B76.e8g86d1d28B77.b8c69e1c14c6d43e3d49c8e69c1b19d8c79g2g45f8c89h2h49-3h2h44f8c89h4h59-5c3d51e6d59e4d59-6c8d71c1b13-1g2g46a8c89h2h49-4c8e61-1d6d55c1b11c6d49e4e59-3d2e12e7e56d4c69b7c69e4d59f6d59f1c49-6e7e63h2h49-3d4c61b7c69-2e4d55f6d59d4c69b7c69c3d52c6d59d2d59-3e3d47d5c31d2c39-2e7e56d4c59-2g7d41d2d49-9f1c44B78.c8d79c4b31-1B79.e1c17a8c85c4b39c6d41e3d49b7b59-3c6e59c1b14e5c49b3c49-3h2h45e5c42b3c49-2h7h57e3g59-6c6e52c4b39a8c84h2h49h7h59-3d8a55c1b14f8c89-2h2h45f8c89-5d8a51c1b13f8c89c4b39c6e59-4c4b36f8c89c1b19c6e59-5d8b81-2B78.h2h41a8c84c4b39h7h59e1c19c6e59-5c6e53c4b39-2d8a52-3B77.f6d71e1c19d7b69-4g2g41c6d42e3d49-2c8e67e1c19c6d49e3d49d8a59a2a39-9B76.f1c41b8c69c4b31-1d1d28c8d79e1c19a8c87c4b39c6e59h2h49h7h59-5c6e52c4b39-11B70.c1g51f8g79d1d29-3f1b51c8d79-2f1c41f8g79c1e31e8g89-2c4b31e8g89-2e1g13e8g89f1e19b8c69-4f2f31e8g89c1e39b8c69-4h2h32e8g89c4b39b8c69-6f1d31f8g79-2f1e21f8g79c1e33b8c63d4b32e8g89-2e1g17e8g89-3e8g86d1d22b8c69-2e1g17b8c69d4b39c8e69f2f49-7e1g16b8c62c1e32e8g89-2d4b37e8g89c1g56-1f1e13-4e8g87c1e32b8c69d4b39c8e69f2f49-5c1g52b8c69d4b39a7a64-1c8e65-4d4b32b8c69c1g59c8e69-4f1e12b8c69d4b39c8e69e2f19-5g1h11b8c69d4b39-7f2f31f8g79c1e39b8c64d1d29e8g89e1c19-4e8g85d1d29b8c69e1c15-1f1c44c8d79-8B71.f2f41b8c65d4c67b7c69e4e59f6d79e5d69e7d69c1e39-7d4f32-2b8d71-1f8g73e4e59d6e59f4e59f6g49f1b59e8f89d4e69-9B70.g2g31b8c64d4e25f8g79f1g29e8g89e1g19-5f1g24c6d49d1d49f8g79e1g19e8g89-7f8g75f1g29e8g89e1g19";
c0_opn[60]="b8c69d4e29-7h2h31f8g79-4B55.f1d31b8c69-2f2f31a7a61c2c49e7e69b1c39f8e79c1e39-6b8c62c2c49c6d42d1d49g7g69b1c39f8g79-5d8b63d4c29e7e65b1c39f8e79-3g7g64b1c39f8g79-5e7e62b1c39f8e79-3g7g61-3e7e54d4b36c8e64c2c49b8d79c1e39-4d6d54c1g59c8e69g5f69g7f69e4d59d8d59d1d59e6d59b1c39d5e69-11f8e71c2c49-3f1b53b8d75d4f59d6d59e4d59a7a69-5c8d74b5d79d8d79d4f59d6d59c1g59-8e7e61c2c49f8e79b1c39e8g89-5g7g61c2c49f8g79b1c39e8g89c1e39b8c69-11B53.g8f61b1c39c5d49d1d41a7a64-1b8c65f1b59c8d79b5c69d7c69c1g59-7f3d49a7a65c1e32e7e56d4b39c8e69d1d22-1f2f37b8d74-1f8e75d1d29-6e7e62-1f6g41-2c1g51e7e69f2f49d8b64-1f8e75d1f39d8c79e1c19b8d79-8f1c41e7e69c4b39b7b55-1b8d74-4f1e21e7e56d4b39f8e79e1g19e8g89g1h19-6e7e63e1g19-3f2f31e7e59d4b39c8e69c1e39f8e79d1d29-7f2f41e7e59d4f39-3g2g31-2b8c61c1g55e7e69d1d29a7a69e1c19-5f1c42d8b69-2f1e21-2e7e61c1e35a7a69-2f1e24-2g7g62c1e37f8g79f2f39b8c64d1d29e8g89e1c15-1f1c44c8d79-5e8g85d1d29b8c69e1c14d6d59-2f1c45c8d79e1c19-9f1c41f8g79-2f1e21f8g79e1g19e8g89-8d4c51d8a53-1f6e46c5d69b8c69-4f1b51-3B51.f1b51b8c61b5c61b7c69e1g19e7e59c2c39-5c2c31-1d2d41c5d49d1d49c8d79b5c69d7c69b1c39g8f69-8e1g17c8d79c2c32a7a63-1g8f66f1e19a7a69-4f1e17a7a62b5f19-2g8f67c2c38a7a69b5f19d7g49d2d34-1h2h35-5h2h31-6b8d72c2c31g8f69d1e29a7a69b5a49b7b59a4c29-7d2d45c5d42d1d49a7a64b5d79c8d79b1c39-4e7e52d4d39-2g8f63b1c39-4d7f61b1c36a7a69b5d79f6d79e1g19-5e1g13-2g8f65b1c38a7a63b5d79f6d79e1g19e7e69c1g59d8c79-7c5d46d1d49e7e59d4d39h7h69c1e37f8e79b5c49a7a69a2a49-5e1g12-7e1g11-3e1g12a7a62b5d79c8d79d2d49c5d49d1d49-6g8f67f1e19a7a69b5d72-1b5f17b7b69c2c49c8b79b1c39-10B52.c8d76a2a41b8c66e1g19-2g8f63-2b5d79b8d71c2c41g8f69b1c39-3e1g18g7g61-1g8f69d1e25e7e69b2b36f8e79c1b29e8g89c2c49-5c2c33f8e79d2d49-5d2d31-1f1e14e7e69c2c39f8e79d2d49c5d49c3d49-10d8d78c2c44b8c66b1c35g7g66d2d49c5d48f3d49f8g79c1e34g8f69f2f39e8g89e1g19-5d4e25g8f69e1g14e8g89f2f39-3f2f35e8g89e1g19-8f8g71-3g8f63d2d46c5d49f3d49g7g69-4e1g13-3d2d42c5d49f3d49g7g63b1c39f8g79d4e29-4g8f66b1c39e7e62-1g7g67f2f39f8g79c1e39e8g89e1g19-11e1g11g7g65d2d49c5d49f3d49f8g79c1e39g8f69f2f39e8g89b1c39-10g8f64b1c39";
c0_opn[61]="g7g69d2d49c5d49f3d49-8e7e51b1c39b8c69-3g7g61-1g8f62b1c39b8c67d2d46c5d49f3d49d7g43-1g7g66f2f39-5e1g13-2g7g62-4e1g15b8c67b2b31g8f69f1e19g7g69-4c2c36g8f69d1e21e7e69d2d49c5d49c3d49d6d59e4e59f6e49c1e39f8e79-10d2d44c5d43c3d49d6d59e4e59f6e49f3e19-6f6e46d4d59c6e59f1e19e4f64-1e5f35d1f39e4f69c3c49-9f1e13e7e69d2d49c5d49c3d49d6d59e4e59f6e49b1d29e4d29c1d29f8e79a1c19-15c2c41g7g65d2d49c5d49f3d49f8g79c1e39g8f69-7g8f64b1c39-3d2d41c5d49f3d49g8f69-4f1e11g8f69c2c39e7e69-5e7e61-1g7g61-1g8f62d1e21b8c69-2e4e52d6e59f3e59d7c75d2d49-2d7c84-4f1e15b8c69b2b33-1c2c36e7e69d2d49c5d49c3d49d6d59e4e59f6e49b1d29e4d29c1d29f8e79-18d1e21-3B50.f1c41b8c61c2c34g8f69d2d39-3d2d32-1e1g13g8f69-3e7e62e1g19g8f69f1e19-4g8f65b1c31-1d1e21b8c69-2d2d38b8c65c2c38e7e63c4b39f8e79e1g19e8g89f1e19-6g7g66c4b33f8g79-2e1g16f8g79c4b39e8g89-6e1g11-2e7e62c4b36f8e79e1g19e8g89-4e1g13-2g7g61-4f1e21g8f69-2g2g31b8c65f1g29g7g66e1g19f8g79c2c39-4g8f63d2d39-4g7g61f1g29f8g79-3g8f63d2d39g7g69f1g29f8g79e1g19-8B27.d8a51-1d8b61-1d8c71-1B40.e7e62b1c31a7a65a2a41-1d2d46c5d49f3d49b7b53f1d38c8b72e1g19-2d8b67d4b35b6c79e1g19-3d4f34-3g2g31c8b79f1g29-4b8c61-1d7d61-1d8c75f1d34b8c65c1e39g8f69e1g19-4g8f64e1g19-3f1e23b7b54-1g8f65e1g19-3g2g32g8f69f1g29-7g2g32b7b55f1g29c8b79d2d39d7d69e1g19b8d75-1g8f64-7b8c63f1g29d7d69e1g19-4d7d61f1g29-4b8c63d2d46c5d49f3d49a7a61-1d7d61-1d8c74c1e33a7a69f1d39g8f69e1g19-5f1e23a7a69e1g19g8f69-4g2g32a7a69f1g29g8f69e1g19-6g8f63d4b57d7d69c1f49e6e59f4g59a7a69b5a39b7b59g5f69-9d4c62b7c69-6f1b53c6d43e1g19-2g8e76e1g19a7a69b5c69e7c69d2d49c5d49f3d49d8c79-10g2g31-2d7d61d2d49c5d49d1d42-1f3d47g8f69-6b2b31a7a61c1b29b8c69-3b7b62c1b24c8b79b1c39-3c2c41c8b79b1c39-3d2d43c5d49f3d49a7a63-1c8b76-5b8c61c1b28d7d65d2d49c5d49f3d49-4g8f64e4e59f6d59-4f1b51-2d7d51e4d59e6d59f1b59-4d7d62c1b29g8f69e4e56d6e59f3e59f8e79-4f1b53-4g8f61e4e59f6d59c1b29b8c69-6b2b41c5b49d2d49-3c2c31b8c61d2d49d7d59-3d7d54e4d57d8d55d2d49b8c61-1g8f68b1a32d5d89-2c1e32c5d49c3d49b8c69b1c39d5d69-6f1d31-1f1e23b8c64e1g19-2f8e75e1g19-6e6d54d2d49b8c67c1e32-1f1b56f8d69d4c55d6c59e1g19g8e79b1d29e8g89";
c0_opn[62]="d2b39c5b69-8e1g14g8e79d4c59d6c59b1d29-7f1e21-2g8f62f1b59c8d79-6e4e52b8c64d2d49c8d73-1d8b66-3d5d45c3d44c5d49f1b59-3f1d35b8c69e1g19-6d7d61-1g8f64d2d31b8c69-2e4e58f6d59d2d47c5d49c3d49b7b62b1c37d5c39b2c39d8c79c1d29c8b79f1d39d7d69e1g19b8d79-10f1d32-2b8c61b1c39-2d7d66a2a32c8d79f1d39d7c69e1g19b8d79-6b1c32d5c39b2c39d8c79c1d29b8d79-6f1c44b8c65e1g19f8e79d1e29-4d5b64c4d39-5d1d41b8c69d4e49-5f1c41d5b64c4b39d7d69-3d7d65d2d49c5d49c3d49b8c69-6g2g31-3f1d31-3c2c41a7a61b1c39d8c79-3b7b61b1c39-2b8c67b1c39a7a61f1e29-2c6d41-1d7d61d2d49c5d49f3d49-4e6e51d2d39d7d69-3g8e71d2d49-2g8f64f1e29d7d59e4d59e6d59d2d49-7d2d41c5d49f3d49g8f69-5d7d61d2d49c5d49f3d49g8f69b1c39-7d1e21b8c69g2g39g7g69f1g29f8g79-6d2d31b7b61g2g39c8b79f1g29-4b8c67b1d21d7d54-1g7g65g2g39f8g79f1g29g8e79e1g19-7c2c31d7d59d1e29-3g2g38d7d53b1d26f8d63f1g29g8e79e1g19e8g89f1e16-1f3h43-6g7g62f1g29f8g79e1g19g8e79f1e19b7b69-7g8e71f1g29g7g69-3g8f63f1g29f8e79e1g19e8g89f1e19b7b59-8d1e23g8e74f1g29g7g69e1g19f8g79-5g8f65f1g29f8e79e1g19e8g89e4e59-8d7d61f1g29g7g63-1g8f66e1g19f8e79-5g7g63c1g51-1d3d41c5d49f3d49-3f1g28f8g79c2c31-1e1g19g8e79b1d21-1c2c35d7d54b1d24-1d1e25-2e6e52-1e8g83-2f1e13d7d66c2c39e6e59-3e8g83-7g8e71f1g29g7g69e1g19f8g79c2c36e8g89-2f1e13-6g8f61f1g29d7d53b1d29f8e79e1g19-4d7d62e1g19f8e79-3f8e74e1g19e8g89-7d7d52b1d26b8c68g2g39f8d64f1g29g8e79e1g19e8g89f1e15-1f3h44-6g7g62f1g29f8g79e1g19g8e79f1e19-6g8f63f1g29f8e79e1g19e8g89-7g8f61g2g39b8c69f1g29f8e79e1g19-7d1e23g8f69g2g39-4d7d61g2g39-3d2d47c5d49c2c31d4c39b1c39-3B41.f3d49a7a64a2a31-1B43.b1c33b7b53a2a31c8b79f1d39-3c1e31c8b79f2f39-3f1d37c8b71e1g19d8c79-3d7d61e1g19g8f69-3d8b66c1e32f8c59d3e29b8c69d4c69c5e34f2e39d7c69d1d49b6d49e3d49e6e59-7d7c66e3c59b6c59d1d39-9d4b35b6c79e1g19c8b77d1e24-1f2f45-2g8f62-4d4f32b6c74e1g19c8b79-3b8c65e1g19-4f8c51d4b39-3f1e21c8b79-2g2g31c8b79f1g29b5b43-1g8f66-5b8c61c1e34-1f1e25-2d7d61c1e39-2d8c76a2a31-1c1e31f8b43-1g8f66f1d39-3f1d33b7b51e1g19c8b79-3b8c64c1e36g8f69e1g19b7b53-1c6e56h2h39f8c59-6d4c63b7c63e1g19-2d7c66e1g19e6e59-5f8c51-1g8f64e1g17b8c63c1e39-2d7d62-1f8c52d4b39c5e79";
c0_opn[63]="-3f8e71-2f2f42d7d69-4f1e23b7b53e1g19c8b79e2f33b8c69d4c69-3f1e16b8c69d4c69d7c69e4e59-8b8c61e1g19g8f69c1e39-4f8b41-1g8f65e1g19b8c63c1e37f8e79-2g1h12-2d7d61-1f8b42d1d39b8c69-3f8e72f2f49d7d69-6f2f41b7b59-2g2g32b7b51f1g29c8b79e1g19-4b8c61f1g29g8f69e1g19-4f8b43c1d23g8f69f1g29b8c69-4d4e26g8f69f1g29b4e79e1g19-6g8f63f1g29b8c63e1g19-2f8e76e1g19e8g89-8B41.b1d21-1c1e31g8f69b1c34-1f1d35-3c2c41d8c71b1c39g8f69-3g8f68b1c38d7d61f1e29f8e79-3d8c74a2a33b7b69c1e39c8b79-4c1e31-1f1d32b8c69-2f1e22f8b49-3f8b44f1d39b8c68d4c69d7c69-3d8c71-4f1d31b8c66d4c69d7c69e1g19e6e59-5d8c73-4B42.f1d34b7b51e1g19-2b8c61c1e31g8f69e1g19-3d4c68b7c63e1g19d7d59c2c49g8f69-5d7c66b1d25e6e59d1h54f8d69d2c49g8f69-4d2c45-3e1g14e6e59b1d29g8f69-7d7d51e4d59d8d59e1g19-4d7d61e1g19-2d8b61c2c32-1d4b37b6c79e1g19g8f69-5d8c71b1c31-1d1e21-1e1g18b8c62d4c69d7c69-3g8f67b1c31-1c2c42-1d1e26d7d69c2c49b8d75-1g7g64b1c39f8g79-9f8c52c2c31-1d4b39c5a73b1c32b8c69d1e29d7d69c1e39-5c2c41b8c69-2d1e22b8c69c1e39g8e79-4e1g13b8c68d1e26d7d69-2d1g43-2g8e71-3c5e76b1c31d7d69-2c2c41d7d69b1c36g8f69e1g19-3e1g13g8f69-4d1g42g7g69g4e29d7d69e1g19b8d79-6e1g14d7d69c2c45g8f69b1c39b7b69-4d1g42g7g69g4e29-3f2f42-6g7g61b1c31f8g79-2c2c44f8g79c1e33-1d4b33-1d4e23-3e1g14f8g79c1e39g8e79-5g8e71e1g19-2g8f63b1c31d8c79e1g19-3c2c41b8c69-2d1e21d7d69-2e1g18d7d64b1c31-1c2c48b7b61b1c39c8b79-3b8d71b1c39-2c8d73b1c39b8c69c1e32-1d4c67d7c69d1e29f8e79-7f8e72b1c39e8g89-3g7g62b1c39f8g79c1e39e8g89-6f2f41-2d8c75b1c31-1c2c41b8c69d4c69d7c69-4d1e26d7d69c2c48b8d71-1f8e71-1g7g67b1c39f8g79d4f33e8g89-2f1d16e8g89d4f39b8c69h2h39f6d79-10f2f41-3g1h11-5B41.f1e21d8c72e1g19g8f69b1c39-4g8f67b1c39d7d61-1d8c75e1g19d7d65-1f8b44-3f8b42-4g2g31d7d55-1g8f64f1g29-4B44.b8c62B45.b1c37B46.a7a61c1e32d8c75f1d39g8f69e1g19-4g8e71-1g8f62-2d4c61b7c69f1d39d7d59e1g19g8f69d1e24f8e79-2f1e15-7f1e24d7d62e1g19g8f69c1e39f8e79-5d8c75c1e31-1e1g18g8f69c1e35f8b49c3a49-3g1h14-4g8e72-2f2f41-1g2g31d7d64f1g29c8d79e1g19g8f69-5d8c72f1g29-2g8e73-3B45.d7d61c1e35g8f69f1c42-1f1e23f8e79e1g19e8g89-4f2f32f8e79d1d29e8g89-4f2f42-3f1e23g8f69e1g19f8e79c1e39";
c0_opn[64]="e8g89-6g2g41-2B47.d8c76B48.c1e33B49.a7a68d1d22g8f69e1c16f8b49f2f39c6e59d4b39b7b59-6f2f33-3f1d35b7b52d4c65c7c69e1g19c8b79-4e1g14c8b79-3g8f67e1g19b7b51-1c6d41e3d49f8c59-3c6e54h2h39f8c59g1h19d7d69f2f49e5g69-7f8d61-1h7h51h2h39-5f1e21g8f69e1g19f8b49c3a49-5f2f41-2B48.g8f61f1d39a7a69e1g19-5B47.d4b51c7b89c1e39a7a69e3b69a6b59c3b59f8b49c2c39b4a59b5c79-11d4c61-1f1e23a7a69c1e31g8f69e1g19f8b49c3a49-5e1g19b7b51d4c69-2g8f69c1e35d7d61-1f8b46c3a49b4e76d4c69b7c69a4b69a8b89b6c89c7c89e3d46-1e4e53-8e8g83d4c69b7c69-5f8e72f2f49d7d69a2a43e8g89g1h19-3d1e13e8g89e1g39-3g1h12-5g1h14c6d44d1d49f8c59d4d39b7b59f2f49c8b79e2f39h7h59e4e59-10f8b41-1f8e73f2f49d7d69c1e39e8g89d1e19c6d49e3d49b7b59-13g8f61e1g19a7a69c1e39-5f2f41a7a67d4c69b7c63-1c7c66f1d39b7b59d1e29c8b79c1d29-8c6d42d1d49a7a69-4g2g31a7a69f1g29d7d62e1g19c8d79a2a44-1f1e15f8e79d4c69-6g8f67e1g19c6d42d1d49f8c59c1f49d7d69d4d29h7h69a1d19e6e59f4e39-10d7d62f1e19-2f8c52d4c69d7c69c3a49-4f8e72f1e19-8B45.g8f61d4b59d7d69c1f49e6e59f4g59a7a69b5a39b7b59-10B44.c1e31d8c72-1g8f67b1c36f8b49-2f1d33-3c2c41g8f69b1c39f8b49d4c69b7c69-6d4b51d7d69c1f43e6e59f4e39a7a65b5c39g8f69e3g56f8e79g5f69e7f69-4f1c43-4c8e61-1g8f63e3g59a7a64-1c8e65-6c2c46a7a61b5c39g8f69f1e29-4g8f69b1c38a7a69b5a39b7b62f1e29c8b79e1g19-4f8e77f1e29b7b61e1g19-2e8g88e1g19b7b69c1e39c6e54f2f49e5d79e2f39-4c8b75d1b39f6d79-12b5c31f8e79f1e29e8g89e1g19-8g8f61b1c39-3d4c61b7c69f1d39d7d54-1g8f65e1g19d7d59-6f1e21g8f69-2g2g31-2B41.d7d61b1c39-2d8b61b1c32f8c59c3a49b6a59c2c39c5d49d1d49g8f69a4c59-9d4b37b6c77b1c35a7a69f1d39g8f69-4f1d34a7a63-1g8f66-3b8c61-1g8f61-3f8c51d4b39c5b69b1c35g8e79-2f1d34g8e79-5g8f62b1c39a7a61-1B45.b8c63a2a31-1c1e31f8b49f1d39d7d59-4d4b56d7d66c1f49e6e59f4g59a7a69b5a39b7b59c3d55d8a51g5d29a5d89d2g59d8a59g5d29-6f8e78g5f69e7f69c2c39c6e72-1e8g87a3c29-7g5f64g7f69c3d59f6f56c2c35f8g79e4f59-3f1d34c8e69e1g19-4f8g73c2c36f6f59e4f59-3f1d33-6c8e61a3c49-3g5f61g7f69b5a39-8f8b43a2a39b4c39b5c39d7d59e4d58e6d58f1d39e8g89e1g19d5d49c3e25c8g45-1f8e84-2c3e44c8f59c1g59-8f6d51-2f1d31-6f8c51-2d4c61b7c69e4e58f6d59c3e49c8b71-1d8c76";
c0_opn[65]="f2f49c7a52-1c7b67c2c49f8b49e1e29-6f7f51-4f1d31-3f1e21f8b49e1g19-3g2g31-2B41.d7d65c1e32a7a65d1d21-1f1e22-1f2f36b7b59d1d26c8b79-2g2g43-4b8c61f2f39-2f8e72f1e22-1f2f34-1f2f42-3c1g51f8e79d1d25a7a69-2f2f44-3f1b51-1f1c41a7a64c4b39b7b59-3f8e75c1e33-1c4b36-3f1d31-1f1e23a7a63a2a42-1c1e31-1e1g15d8c74f2f49-2f8e75f2f49-3f2f41-2b8c61c1e34f8e79e1g19-3e1g15f8e79c1e39e8g89f2f49-6f8e75c1e31-1e1g18a7a61f2f49-2b8c61c1e39-2e8g86c1e34a7a63-1b8c66f2f49-3f2f45a7a62-1b8c67c1e37a7a69-2g1h12-7f2f41a7a64d1f39d8c79-3b8c63c1e39f8e79d1f39-4f8e71-2g2g31a7a63f1g29d8c79e1g19f8e79-5b8c62f1g29c8d79e1g19f8e79-5f8e73f1g29e8g89e1g19a7a69-6g2g42a7a61g4g59f6d79c1e39b7b59-5b8c61g4g59f6d79c1e39f8e79h2h49-6e6e51-1f8e71g4g59f6d79-3h7h65f1g21-1g4g51h6g59c1g59-3h1g11-1h2h31b8c69-2h2h44b8c67h1g19h6h59g4h59f6h59c1g59h5f69-7f8e72-5d8b61d4b39-2f8b41e4e56f6d59c1d26d5c39b2c39b4e79d1g49-5d1g43-3f1d33b8c69-4f1d31a7a61e1g19-2b8c67c1e32d7d59-2d4b31-1d4c66b7c65e1g19d7d59b1d29-4d7c64e1g19e6e59b1d29-6d7d61e1g19-6d7d51-2B40.f1e21b8c69-2g2g31b8c67f1g29g8f69d2d39-4d7d52e4d59e6d59-5B27.g7g61b1c31f8g79d2d49c5d49f3d49b8c69c1e39g8f69-8c2c31d7d52e4d59d8d59d2d49f8g79-5f8g78d2d49c5d49c3d49d7d59e4d54g8f69f1b59b8d79d5d69-5e4e55b8c63-1c8g46b1c39-9c2c41f8g79d2d49c5d49f3d49b8c69c1e39g8f69b1c39-9d2d31f8g79-2d2d47c5d44d1d42g8f69b1c32b8c69d4a49d7d69e4e59d6e59f3e59-7e4e54b8c69d4a49f6d59a4e49-5f1b52b8c69-4f3d47b8c63b1c34f8g79c1e39g8f69f1c49e8g89-6c2c45f8g73-1g8f66b1c39d7d69f1e29c6d49d1d49f8g79-9f8g75b1c35b8c69c1e39g8f69f1c49e8g89c4b39d7d69-8c1e31-1c2c43b8c69c1e39g8f69b1c39e8g86f1e29d7d69e1g19c8d79-5f6g43d1g49c6d49g4d19-10g8f61b1c39b8c64-1d7d65-5f8g75b1c34c5d48f3d49b8c69c1e38g8f69f1c48e8g89c4b39d7d69f2f39c8d79d1d29-7f1e21e8g89-4d4b31g8f69f1e29-6d8a51-2c2c31c5d49c3d49d7d59e4e59-5c2c41c5d44f3d49b8c69c1e39-4d8b65-2d4c52d8a59b1c33g7c39b2c39a5c39-4c2c36a5c59b1a34-1c1e35c5c79-6d4d51d7d65b1c39-2g8f64b1c39d7d69-6f1c41f8g79e1g19b8c69c2c39-5g2g31f8g79f1g29b8c69e1g19-6B29.g8f61b1c35b8c64d2d49c5d42f3d49-2d7d57e4d59f6d59c3d59d8d59c1e39c5d49f3d49-10d7d53e4d58f6d59";
c0_opn[66]="f1b59c8d79-4f1b51-2d7d61d2d49c5d49f3d49-4e7e61d2d49-3d2d31-1e4e54f6d59b1c37d5c34d2c39b8c69c1f49-4e7e65c3d57e6d59d2d49b8c69d4c59f8c59d1d59d7d69e5d69d8b69-10c3e42-3d2d42c5d49d1d49e7e69-8B20.g2g31b8c64f1g29g7g69d2d33f8g79f2f49d7d69g1f39-5f2f42f8g79g1f39-3g1e23f8g79e1g19-6d7d52e4d59d8d59g1f39c8g49f1g29d5e69e1f19b8c69h2h39g4h59d2d39e6d79-13d7d61-1e7e61f1g29-2g7g61f1g29f8g79-5B10.c7c61b1c31d7d59d1f31d5e49c3e49b8d79d2d49-5d2d41d5e49c3e49b8d73-1c8f54e4g39f5g69-3g8f62-4f2f41d5e49c3e49-3B11.g1f37c8g46h2h39g4f37d1f39e7e66d2d34b8d75-1g8f64-2d2d42-1f1e21-1g2g32g8f69f1g29-4g8f63d2d39e7e69c1d29-6g4h52e4d59c6d59f1b57b8c69g2g49h5g69f3e59a8c89d2d49e7e69d1e29-9g2g42h5g69-7B12.d5e42c3e49b8d71-1c8f51e4g39f5g69h2h49h7h69f3e59-6c8g41-1g8f65e4f69e7f63-1g7f66d2d49-6B11.g7g61d2d49-4B10.g7g61d2d49-3b2b31d7d59-2c2c31d7d59-2c2c41d7d57c4d53c6d59e4d59d8d51b1c39-2g8f68b1c35f6d59g1f39b8c63-1e7e66-4d1a41b8d79b1c39g7g69-4f1b52b8d79b1c39a7a69-8e4d56c6d59c4d58d8d51b1c39-2g8f69b1c37f6d58d2d41-1g1f38b8c63f1b59-2d5c32b2c39g7g69d2d49f8g79-5e7e64d2d45f8b44-1f8e75-2f1c44-4g7g61f1c49f8g79-4d1a41b8d79b1c39g7g69-4f1b51b8d79b1c39a7a69-6d2d41g8f69b1c39b8c63-1e7e66g1f39-6g8f61b1c39c6d59c4d59f6d59g1f39-8d7d61-1e7e51d2d41-1g1f38d7d69d2d49b8d79b1c39g8f69f1e29f8e79e1g19e8g89-11e7e61-1g7g61b1c39f8g79-4d2d31d7d58b1d29d5e41d3e49e7e59g1f39-4e7e55g1f39b8d71-1f8d69d3d41e5d49e4d59c6d59-4f1e21g8f69-2g2g37g8e71f1g29-2g8f68f1g29e8g89e1g19f8e89f1e19-9g2g31-2g7g62g1f36f8g79g2g39e7e59f1g29g8e79e1g19e8g89-8g2g33f8g79f1g29e7e59g1f39g8e79e1g19e8g89-9g8f61g1f39c8g49-5e7e51g1f39-2g7g61-2d2d48B12.b8a61-1d7d59B15.b1c32b7b51a2a39-2d5e49c3e49B17.b8d72e4g53d7f61f1c49-2g8f69f1c41e7e69d1e29d7b69-4f1d39e7e69d1e21f8d69g1f39h7h69g5e49f6e49e2e49-7g1f38f8d69d1e29h7h69g5e49f6e49e2e49d7f63e4e29d8c79c1d29b7b69e1c19-6d8c76e1g13b7b69e4g49-3e4g46e8f89e1g19c6c59-11h7h61-6f1c42g8f69e4f61d7f69c2c39-3e4g58e7e69d1e29d7b69c4b33h7h69g5f39a7a54-1c6c55-4c4d36h7h69g5f39c6c59d4c59f8c59f3e59b6d79g1f39d8c79-16f1d31g8f69e4g59e7e69g1f39f8d69-6g1f33g8f69e4f65d7f69c2c31-1f1c45";
c0_opn[67]="c8f56e1g19e7e69-3e7e63-2f3e53c8e69-4e4g34e7e69f1d39c6c55e1g19c5d49f3d49f8c59-5f8d62-1f8e72-7B18.c8f55e4c51b7b69c5b39-3e4g39B19.f5g69f1c41e7e68g1e29f8d65e1g14-1h2h45-2g8f64e1g16f8d69f2f49-3e2f43f8d69-5g8f61g1e29e7e69-4g1e21e7e65e2f49-2g8f64e2f49-3g1f32b8d77f1c41e7e69-2f1d32e7e62e1g19g8f69-3g6d34d1d39g8f69-3g8f62-2h2h46h7h69f1d31g6d39d1d39-3h4h58g6h79f1d39h7d39d1d39d8c72c1d29e7e65-1g8f64-3e7e63c1d24-1c1f45-2g8f63c1d29e7e69e1c19d8c79-13e7e61h2h49h7h69-3g8f61h2h49h7h69h4h59g6h79f1d39h7d39d1d39e7e69-10g1h31-1h2h45h7h69f2f41e7e69g1f39-3g1e21-1g1f38b8d77f1d31g6d39d1d39d8c74-1e7e65-4h4h59g6h79f1d39h7d39d1d39d8c71c1d29e7e64e1c19g8f69-3g8f65e1c19e7e69g3e49-6e7e65c1d22d8c72-1g8f67e1c19f8e79-4c1f47d8a54f4d29a5c79e1c19-4f8b41c2c39b4e79e1c19-4g8f63e1c19f8e79c1b19-6g8f62c1d24e7e69e1c19d8c79-4c1f45d8a55f4d29a5c79e1c19-4e7e64e1c19f8e79c1b19-12e7e61f3e56g6h79f1d39h7d39d1d39b8d79f2f49-7h4h53g6h79f1d39h7d39d1d39g8f69-7g8f61f3e57g6h79f1c42e7e69d1e29f6d59-4f1d37h7d39d1d39e7e69c1d29b8d79f2f49-9h4h52g6h79f1d39h7d39d1d39e7e69c1d29-9g1h31-1h4h51g6h79g1f39b8d77f1d39h7d39d1d39e7e65-1g8f64-5g8f62f1d39h7d39d1d39e7e69-13B15.g8f61e4f68e7f63c2c34f8d69f1d39e8g89d1c24-1g1e25f8e89-6f1c43d8e74d1e29-2f8d65-2g1f31f8d69-3B16.g7f66c1f41-1c2c34c8f59g1e23-1g1f36e7e69g2g39-5f1c41c8f59g1e29-3g1e21-1g1f32c8f54f1d39-2c8g45f1e29e7e69-6B15.e4g31g7g65-1h7h54-5e7e61-1g7g61e4e52f8g79f2f49-3g1f33f8g79h2h39-3h2h33f8g79g1f39g8f69f1d39-7B12.b1d21d5e49d2e49b8d73e4g53g8f69f1c41e7e69d1e29d7b69-4f1d39e7e69d1e21f8d69g1f39h7h69g5e49f6e49e2e49-7g1f38f8d69d1e29h7h69g5e49f6e49e2e49d7f64e4e29d8c79c1d29b7b69-5d8c75e4g49e8f89e1g19c6c59-16f1c42g8f69e4f62d7f69c2c39d8c79-4e4g57e7e69d1e29d7b69c4b33h7h69g5f39-3c4d36h7h69g5f39c6c59d4c59f8c59f3e59b6d79g1f39-15f1d31g8f69e4g59e7e69-4g1f33g8f69e4f65d7f69c2c32c8g49h2h39-3f1c43c8f59-2f3e54-3e4g34c6c52-1e7e67f1d39c6c59e1g19-8c8f55e4c51b7b69c5b39-3e4g39f5g69f1c41e7e69g1e29f8d65h2h49h7h69e2f49d6f49c1f49g8f69-7g8f64e2f49-5g1e21e7e65e2f49-2g8f64e2f49-3g1f31b8d77f1d32-1h2h47h7h69h4h59g6h79f1d39h7d39d1d39";
c0_opn[68]="d8c72c1d29-2e7e63-1g8f63-9g8f62h2h49h7h69-4g1h31-1h2h46h7h69g1f39b8d77f1d31g6d39d1d39-3h4h59g6h79f1d39h7d39d1d39d8c71c1d29e7e66e1c19g8f69-3g8f63e1c19-4e7e65c1d24d8c72e1c19-2g8f67e1c19f8e79d3e25-1g3e44-5c1f45d8a54f4d29a5c79e1c19-4f8b41c2c39b4e79-3g8f63e1c19f8e79c1b19-6g8f62c1d24e7e69e1c19f8e79-4c1f45d8a55f4d29a5c79e1c19-4e7e64e1c19f8e79-11e7e61f3e56g6h79f1d39h7d39d1d39b8d79-6h4h53g6h79f1d39h7d39d1d39g8f69-7g8f62f3e56g6h79f1c43e7e69d1e29f6d59-4f1d36h7d39d1d39e7e69c1d29b8d79f2f49-9h4h53g6h79f1d39h7d39d1d39e7e69c1d29-9g1h31-1h4h51g6h79g1f39b8d79f1d39h7d39d1d39-12g8f61e4f69e7f63c2c35f8d69f1d39e8g89-4f1c42-1g1f31-2g7f66c2c36c8f59g1e23-1g1f37e7e69g2g39-5g1f33c8f54-1c8g45f1e29-5e4g31-4g7g61c2c33f8g79-2g1f34f8g79-2h2h32-3B13.e4d52c6d59b1c31-1c1f41-1c2c31b8c69c1f49-3B14.c2c46b8c61-1d5c41f1c49-2e7e61b1c39g8f69g1f39-4g8f69b1c39b8c62c1g53c8e62-1d5c42d4d59-2d8a52g5f69e7f69c4d59f8b49-5e7e62g1f39f8e79-4c4d51f6d59-2g1f36c8e61-1c8g47c4d59f6d59d1b39g4f39g2f39d5b63c1e35e7e69e1c19f8e79d4d59e6d59c3d59-7d4d54c6d49-3e7e66b3b79c6d49f1b59d4b59b7c69e8e79c6b59-14e7e61-1g7g61-3e7e66c1g51f8e79-2c4c51f8e79g1f39e8g89f1d39-5g1f39b8c61c4c54-1c4d55f6d59f1d39-4f8b45c4d56e6d51-1f6d59c1d25b8c67f1d39b4e74a2a32-1e1g17e8g89d1e29-4d5f61-1e8g84e1g19b4e79a2a33-1d1e26d5f69-7e8g82f1d39b8c69e1g19b4e79-6d1c24b8c68a2a31-1f1d34b4a59-2f1e24e8g89e1g19b4e79-5d8c71c1d29b8d79-6f1d33d5c48d3c49e8g89e1g19a7a62-1b7b65c1g59c8b79f3e59-4b8d71-5e8g81e1g19d5c49d3c49b7b69-7f8e73c4c51e8g89-2c4d57e6d51-1f6d59f1c41-1f1d38b8c67e1g19e8g89a2a31-1f1e18d5f64a2a39b7b69-3e7f65d3e49c6e79f3e59-8e8g82e1g19b8c69f1e19e7f69-8f1d31d5c45d3c49e8g89e1g19b8c69-5e8g84e1g19-6g7g61c4d52f6d54-1f8g75-2d1b35f8g79c4d59e8g89f1e28b8a63e2f39d8b69b3b69a7b69g1e29a6b49e1g19f8d89-9b8d76e2f39d7b69g1e29c8g49f3g49f6g49-8g1e21-5g1f31f8g79-4g1f31-3B13.f1d32b8c68c2c39d8c71g1e29c8g49f2f39g4d79-5g7g61c1f45f8g79g1f39g8h69-4g1f34f8g79e1g19-4g8f66c1f47c8g47d1b38c6a51b3a49g4d79a4c29-4d8c84b1d29e7e69g1f39f8e79e1g19e8g85-1g4h54-7d8d73b1d29e7e69g1f39g4f39d2f39f8d69f4d69d7d69e1g19";
c0_opn[69]="e8g89a1e19-13g1f31e7e69-3e7e61g1f39-2g7g61g1f39f8g79-4c1g51-1g1f31c8g49e1g19e7e69-4h2h31e7e54d4e59c6e59-3g7g65-5g7g61-1g8f61c2c36b8c66c1f49c8g49d1b39-4c8g43d1b39-3g1f31-1h2h31-3g1f31b8c63-1g8f66f1d39-4d8d51-2B12.e4e52b8a61-1c6c51c2c31b8c69g1f39-3d4c57b8c64f1b57e7e69c1e39g8e79c2c39c8d79b5c69e7c69-8g1f32c8g49-3e7e65c1e35g8h69c2c39h6f59e3d49-5g1f34f8c59f1d39b8c69e1g19-7g1f31-2c8f58b1c33a7a61c1e39e7e69g2g49f5g69g1e29-6d8b61f1d32f5d39d1d39e7e69g1e29-5g1f33e7e69f1e29b8d79e1g19-5g2g43f5d79c3a49b6c79-5e7e67g2g49f5g69g1e29b8d71-1c6c54c1e33b8c69d4c59c6e59e2d49-5h2h46h7h56e2f49b8c63f4g69f7g69-3g6h76f4h59c5d49-5h7h63c1e39b8c69-5f7f61e2f46f6e54-1g6f75d1e29-3h2h43-2f8b41h2h49-2f8e71-1g8e72e2f47c6c59d4c54e7c69h2h49d8c79-4h2h45c5d49c3b59e7c69h4h59g6e49f2f39a7a69-10f2f42-2h7h61h2h49-6h7h51f1d35f5d39d1d39e7e69-4f1e24-3b1d21e7e69d2b39b8d79g1f39g8e79-6c1e31d8b62-1e7e67b1d29b8d79c2c39-5c2c31e7e69c1e39b8d76b1d29c6c55-1g8e74-3d8b63d1b39b8d79b1d29-7c2c41d5c42f1c49e7e69-3e7e67b1c39b8d79-4f1d31f5d39d1d39e7e69f2f42-1g1e23-1g1f33-5f1e21e7e69g1f39-3g1e21e7e69e2g39f5g69h2h49h7h54-1h7h65h4h59g6h79f1d39h7d39c2d39-11g1f33e7e69a2a31b8d75b1d24-1f1e25-2c6c52c2c49-2g8e71-2f1d31-1f1e28b8d73e1g19c6c51-1f5g62b2b39g8h69-3g8e74f3h49f5g69-3h7h62b2b39g8e79-5c6c53c1e35b8d72e1g19-2c5d43f3d49g8e79-3d8b63b1c39-3c2c31b8c69e1g19-3e1g13b8c69c2c39-4f8e71e1g19-2g8e71e1g19b8d72-1c6c54-1h7h62-3h7h61e1g19-5g2g41f5d72-1f5e43f2f39e4g69h2h49-4f5g63-2h2h41h7h57c2c49e7e69b1c39b8d73-1d5c42f1c49-2g8e73-5h7h62g2g49-4e7e61-1g7g61-2f2f31d5e42f3e49e7e59g1f39c8e64-1e5d45f1c49-6e7e65b1c38f8b48c1f49g8f69d1d39-4g8f61-2c1e31-2g7g62b1c39f8g79c1e39-6B10.d7d61b1c36g8f69-2g1f33-2g7g61b1c37d7d54e4e52-1g1f32f8g79-2h2h34f8g79g1f39-4f8g75f1c43-1f2f42-1g1f34d7d69-4c2c41-1g1f32d7d52-1f8g77-3g8f61-2f1c41d7d59-2f2f41d7d59e4e59-3g1e21d7d59e4e59c6c59d2d49b8c69c2c39-7g1f31d7d59b1c36c8g46h2h39g4f37d1f39e7e69d2d39-4g4h52-3d5e43c3e49g8f69e4f69-5e4d52c6d59d2d49g8f69-4e4e51-2d7d61-1g7g61-3B01.d7d51b1c31c7c61-1d5d44c3e29e7e59d2d35-1e2g34-4d5e44c3e49c8f55e4g39";
c0_opn[70]="f5g69-3d8d54-3g8f61-2d2d31d5e49-2d2d41d5e49b1c39g8f69f2f39e4f39-6e4d59c7c61-1d8d55b1c39d5a57d2d31-1d2d47c7c63c1d21-1f1c43c8f56c1d23e7e69-2g1f36e7e64c1d29-2g8f65c1d29e7e69-5g8f63c1d23-1g1f36c8f59c1d29-5f1d31g8f69-2g1f36c8f52f1c49e7e69c1d29-4c8g41h2h39-2g8f66c1d22c8f59f1c49e7e69-4f1c46c8f59c1d26e7e69c3d55a5d89d5f69g7f69-4d1e24f8b49e1c19b8d79-6e1g11e7e69-2f3e51e7e69g2g49f5g69-6f3e51-4c8f51g1f39-2e7e51d4e59-2g8f66c1d21c7c69f1c44-1g1f35c8f59-4f1c42b8c61-1c7c65c1d24c8f59-2g1e21-1g1f33c8f59c1d29e7e69-5c8f51g1f39e7e69-3c8g42f2f39g4f59-4f1d31-1g1f36b8c61f1b59-2c7c64c1d21c8f59f1c49e7e69-4f1c46c8f58c1d27e7e69c3d55a5d89d5f69d8f65d1e29-2g7f64-4d1e24f8b49e1c19b8d79-6e1g11e7e69-2f3e51e7e69g2g49-4c8g41h2h39g4h59-4f3e51c8e69-3c8f52c1d22c7c69f1c49e7e69-4f1c45c7c62-1e7e67c1d29c7c69-4f3e52c7c69-3c8g42f1e21-1h2h38g4f31d1f39c7c69-3g4h58g2g49h5g69f3e59e7e69f1g29c7c69-12f1c41c7c61d2d39-2g8f68d2d34c7c69c1d29-3d2d42c7c69-2g1e21-1g1f31-3g1f31c7c61-1c8g41-1g8f68d2d44c7c69f1c49c8f59-4f1c42c8f59-2f1e22-1h2h31-3g2g31c7c62f1g29-2g8f67f1g29c7c69g1e25-1g1f34-6d5d61d2d48a7a61-1c7c61-1g8f69f1c41a7a69c4b34-1g1e23-1g1f32-3f1e21-1g1f37a7a68c1e31b8c69-2f1c41-1f1d31-1f1e21b8c69-2f3e51b8c69-2g2g33b7b54f1g29c8b79e1g19e7e69c1f49-6c8g45f1g29b8c69-4h2h31-2c7c61-1c8g41-4f1c41g8f69-2g1f31g8f69d2d49a7a69-4g2g31g8f69-3d5d81d2d48c7c61-1g7g61-1g8f67c1g51-1f1c43c7c69g1f39-3g1f34c7c69f1c49c8f59-6f1c41g8f69-2g1f31-2d5e51-2d2d41b8c62g1f39-2e7e53-1g8f63g1f39-3g1f31c8g43f1e29b8c69-3g8f66d2d47c8g49f1e29e7e69-4f1e22-4g8f64b1c31f6d59c3d52d8d59-2f1c47c7c63d1f39-2d5b64c4b39b8c69g1f39-4e7e62-4c2c41c7c65b1c31c6d59d2d49-3d2d47c6d59b1c39b8c63g1f39-2e7e64g1f39f8b44-1f8e75-3g7g62-4d5c61b8c69g1f39-4e7e64d2d42e6d59b1c39-3d5e67c8e69d2d42f8b49c1d29-3f1e21-1g1f35b8c65-1d8e74d1e29b8c69-8d2d44c8g43f1b51b8d79b5e24g4e29d1e29f6d59-4f2f35g4f59c2c49-5f1e23g4e29d1e26d8d59g1f39b8c64c2c49d5f59-3e7e65e1g19b8c69-6g1e23d8d59e1g19b8c69b1c39-7f2f32g4f59c2c42e7e69d5e69b8c69-4f1b57b8d79c2c49a7a63b5d79d8d79-3e7e66d5e69f5e69d4d59e6f59-10g1f32d8d59b1c32-1f1e27";
c0_opn[71]="b8c69c2c43-1e1g13e8c89-2h2h33-6d8d51-1f6d56c2c45d5b68b1c34e7e56d4d54-1d4e55d8d19c3d19b8c69-5g7g63c1e39f8g79-4g1f35c8g43c4c56b6d79f1c49e7e69-4f1e23e7e69-3g7g66b1c37f8g79c4c56b6d59f1c49c7c69-4h2h33-3h2h32f8g79-5d5f61b1c35-1g1f34-3f1e21-1g1f34c8f51-1c8g43c2c41d5b69-2f1e26b8c62-1e7e67e1g19f8e79-4h2h31g4h59-3g7g65c2c44d5b69b1c36f8g79-2h2h33f8g79-4f1c41f8g79e1g19-3f1e24f8g79e1g19e8g89c2c49d5b69b1c39-11f1b51b8d71c2c49a7a69-3c8d78b5c44b7b52c4b39-2d7g47f2f39g4c85b1c39b8d79d2d45d7b69-2g1e24d7b69-5g4f54b1c39b8d79-6b5d71d8d79-2b5e24f6d59d2d49d7f58g1f39e7e69e1g19f8e79a2a36e8g89c2c49d5b69b1c39b8c69-6c2c43-6g7g61-6f1c41-1f1e21-1g1f31c8g41-1d8d51b1c39d5a59d2d49-4f6d57d2d49c8f51-1c8g43f1e29e7e69e1g19-4g7g65c2c45d5b69b1c39f8g79c4c59b6d59f1c49-7f1e24f8g79e1g19e8g89c2c49d5b69-12e4e51c7c56-1c8f53d2d49e7e69-5B07.d7d61b1c31c7c51-1e7e51-1g7g63d2d42-1f2f45f8g79g1f39-3g2g32f8g79f1g29-4g8f64d2d42-1f2f44g7g69g1f39f8g79-4g2g32-3b2b31g8f69-2c2c31g8f69-2c2c41c7c52-1e7e52-1g7g62-1g8f62-2d2d31g7g69-2d2d49b8d71g1f39-2c7c51-1c7c61b1c39-2e7e51d4e52d6e59d1d89e8d89-4g1f37b8d79f1c49-4e7e61-1f7f51-1g7g61b1c36c7c61c1e34-1f2f45d6d59-3f8g78c1e33a7a63d1d29b7b59-3b8d71-1c7c63d1d29b7b55-1b8d74-3g8f62f2f39-3c1g51-1f1c41-1f1e21-1f2f42a7a61g1f39b7b59-3b8c61-1c7c61g1f39-2g8f65g1f39e8g89f1d39b8a69e1g19c7c59d4d59-9g1e21-1g1f31c7c62-1g8f67f1e26e8g89e1g19-3h2h33-3g2g31-2g8f61-2c1e31f8g79-2c2c31f8g79-2c2c41f8g79b1c39g8f69-4f1c41f8g79-2f2f41f8g79g1f39g8f69-4g1f31f8g78b1c33g8f69-2f1c43-1f1e22g8f69b1c39e8g89e1g19-6g8f61b1c39f8g79-4g2g31-2g8f68b1c39b8c61-1b8d71c1e31e7e59-2f2f42e7e59g1f39e5d49d1d49c7c69c1e39d6d59e4d59f8c59d4d39d8e79-12g1f35e7e59d4e51d6e59f1c49-3f1c48f8e79e1g19e8g89a2a42c7c69-2f1e17c7c69a2a49a7a52-1b7b67-10g2g31e7e59g1e29-3g2g41-2c7c61a2a41d8a59c1d29-3c1e31-1c1g51b8d79-2f1d31e7e59-2f1e21-1f2f31b8d79c1e39-3f2f43d8a59c1d21-1e4e51f6e49d1f39e4c39-4f1d37e7e59d4e51d6e59f4f59-3g1f38b8d72e1g19-2c8g47c1e36b8d79e1g19f8e79h2h39-5d4e53d6e59-7g7g61g1f39f8g79-4g1f32c8g47f1e25b8d72-1e7e67e1g19f8e79-4h2h34g4h59-3d8a51-1g7g61-2g2g31";
c0_opn[72]="-1h2h31-2e7e51d4e53d6e59d1d89e8d89c1g54c8e69e1c19b8d79f2f45e5f49-2g1f34-5f1c45c8e67c4e69f7e69c1e34f8d69-2f2f35-4d8e82g1f39f8d69-4g1f31f8d69f1c49-7g1e21-1g1f36b8d79f1c49f8e79e1g19e8g89a2a42a7a52-1c7c67c4a23-1f1e16b7b69-4d1e21c7c69a2a49-3f1e16c7c69a2a49a7a53b2b33e5d49-2c4a21-1h2h34e5d49-3b7b65b2b32a7a69-2c1g51-1d4d54c6d59c3d59-3h2h31-2d8c71-4h2h31c7c69a2a49-7f1e21f8e79e1g19-3g2g31-2e5d41f3d49-4g7g66c1e31a7a61-1c7c66a2a41-1d1d25b7b57f1d36b8d79g1f39e7e59-4f2f33b8d79g2g49d7b69-5b8d72f2f34-1g1f35-3f2f31b7b59d1d29b8d79-4g1f31-1h2h32b7b52e4e59-2b8d73f2f49-2f8g73f2f49-4f8g73d1d26c7c66e3h63g7h69d2h69-3f2f33-1g1f33-2e8g82-1f6g41e3g59h7h69-4f2f32c7c66d1d29b7b59-3e8g83d1d29-3h2h31-3c1f41f8g79-2c1g51b8d71-1c7c62d1d29b7b59f1d39b8d79-5f8g76d1d26c7c63f2f49e8g89-3e8g81-1h7h65g5f42-1g5h47g6g59h4g39f6h59e1c19-7e4e51d6e54d4e59-2f6d75-2f2f42e8g85-1h7h64-3h7h61g5h49-3f1c41c7c61-1f8g78d1e29b8c69e4e59-5f1d31f8g79-2f1e21f8g79c1e33c7c65-1e8g84-2g1f31e8g89e1g19-3g2g41-1h2h43c7c53d4c59d8a59-3h7h56-4f2f31c7c65c1e39b7b56d1d29b8d79-3b8d73d1d29b7b59-5f8g74c1e39c7c66d1d29b7b59-3e8g83d1d29-5B09.f2f42c7c61g1f39-2f8g79a2a31-1e4e51-1g1f39c7c53d4c53d8a59f1d39a5c59d1e29c8g43c1e39c5a59e1g19-4e8g86c1e39c5a59e1g19c8g49-10d4d51e8g89-2e4e51-1f1b55c8d79e4e59f6g49b5d73d8d79d4d59d6e59h2h39e5e49c3e49g4f69e4f69g7f69e1g19-11e5e66d7b52e6f79e8d79c3b59d8a59b5c39c5d49f3d49g7d49d1d49-10f7e67f3g59d7b59g5e69g7d49e6d89d4f29e1d29f2e39d2e19-16c7c61-1e8g86c1e31b7b69-2e4e51d6e54f4e59-2f6d75h2h49-3f1c41-1f1d36b8a64e1g19c7c59d4d59a6c72-1a8b83-1c8g44-5b8c64e1g15c8g44-1e7e56d4e53d6e59-2f4e56d6e59d4d59-5e4e54d6e59d4e54f6d59-2f4e55f6h59-5c7c51d4c59d6c59-3c7c61-1c8g41-2f1e21c7c59d4c59d8a59e1g19a5c59g1h19-11B07.g1e21f8g79g2g39e8g89f1g29-5B08.g1f32c7c61-1f8g79c1e31c7c64d1d29b7b59f1d39-4e8g85d1d29c7c69e3h69-5c1f41-1c1g51-1f1c41c7c63-1e8g86e1g19-3f1d31-1f1e25c7c61-1e8g89e1g19a7a61-1b8c61-1b8d71-1c7c51-1c7c64a2a45a7a53-1b8d73-1d8c73-2f1e12b8d79-2h2h32b8d79-3c8g43c1e38b8c69d1d26e7e59d4d54c6e79a1d19-3d4e55d6e59a1d19d8c89d2c19f8d89d1d89-9d4d53";
c0_opn[73]="-3h2h31g4f39e2f39b8c69-6h2h31-3h2h31c7c61a2a49-2e8g88c1e39a7a62-1c7c67a2a49-7B07.g2g31f8g79f1g29e8g89g1e29b8d71e1g19c7c59-3c7c61a2a45-1e1g14-2e7e56e1g13b8c69-2h2h36b8c64c1e39e5d49e2d49-4c7c65a2a49-9h2h31f8g79c1e34e8g89-2g1f35e8g89c1e39-7b1d21g7g69-2f1d31e7e55c2c38b8c63g1f39-2d6d54d4e59f6e49g1f39b8c69b1d29-6f8e72-2d4d51-2g7g64c2c32f8g79-2f2f41f8g79-2g1e22f8g79e1g19-3g1f33f8g79e1g19e8g89-6f2f31b8d71-1c7c51-1c7c61-1e7e52-1g7g63c1e33f8g79-2c2c46f8g79b1c39e8g89c1e39-9f1c41g8f69-2f2f41c7c51-1g7g64g1f39f8g79-3g8f63b1c39-3g1f31e7e51-1g7g61-1g8f67b1c37g7g69d2d49f8g79-4d2d32-3g2g31g7g65f1g29f8g79-3g8f64-3C20.e7e52a2a31g8f69-2C23.b1c31b8c62f1c43f8c52d1g49-2g8f67d2d39c6a53-1f8b43-1f8c52-4C25.f2f42d7d62-1e5f47g1f39g7g59-4C23.g1f31g8f69d2d44-1f1b55-3C25.g2g32f8c55f1g29d7d69-3g8f64f1g29f8c59-5C23.c7c61-1C25.d7d61f1c49-2f8b41-1f8c51f1c44g8f69d2d39-3f2f41-1g1f32d7d69-2g2g31-2g8f66C27.f1c42C28.b8c65d2d39c6a54g1e29-2f8b43c1g59h7h69-3f8c52-3C27.f6e42d1h59e4d69c4b39b8c64c3b59g7g69h5f39-4f8e75-5f8b41-1f8c51d2d39d7d69-4C26.f2f43C29.d7d58e4d51-1f4e59f6e49d1f31e4c39-2d2d33e4c39b2c39d5d49g1f39b8c69-6g1f35b8c61-1c8g42d1e29-2f8e75d1e25e4c39d2c39-3d2d44e8g89f1d39-8C26.d7d61g1f39b8c69-4C25.g1f31b8c69d2d43e5d49f3d49f8b49d4c69b7c69f1d39d7d59e4d59-9f1b54-1g2g32-3g2g32b8c61f1g29f8c59g1e29-4c7c61-1d7d54e4d59f6d59f1g29c8e61-1d5c38b2c39f8c52-1f8d67g1f39e8g89e1g19-10f8c52f1g29b8c63-1d7d63-1e8g82-6C20.c2c31d7d59-2c2c41b8c65-1g8f64-2d2d31b8c65-1f8c54-2C21.d2d41b8c61-1d7d61-1e5d49c2c31d4c36f1c49c3b29c1b29-4d7d53e4d59d8d59c3d49b8c69-6C22.d1d46b8c69d4e39b7b61b1c39-2d7d61b1c39g8f69c1d29-4f8b41b1c39g8f69c1d29e8g89e1c19f8e89-7g7g61b1c39f8g79c1d29-4g8f65b1c38f8b48c1d29e8g89e1c19f8e89e3g36e8e49a2a39-3f1c43-6f8e71-2c1d21-5C21.g1f32b8c67f1c45g8f69e1g19-3f3d44-2f8b42c2c39d4c39-6C20.f1b51c7c69-2C23.f1c41b8c61b1c33g8f69d2d39f8c59-4d2d31g8f69-2g1f35f8c55-1g8f64d2d39-4c7c61-1d7d61-1f7f51-1f8c51b1c32-1g1f37b8c69c2c39g8f69-5g8f67b1c31b8c66d2d39-2f8c53d2d39-3d1e21-1C24.d2d37b8c64b1c33c6a53g1e29-2f8b44g1e29d7d59e4d59f6d59e1g19";
c0_opn[74]="-6f8c52-2g1f36f8c54c2c35a7a64-1d7d65-2e1g14d7d69c2c39-4f8e74e1g19e8g89f1e19d7d69a2a44-1c2c35-6h7h61e1g19-4c7c62c4b31-1d1e21-1g1f38d7d56c4b39a7a52-1f8d67b1c37d5e49f3g59e8g89c3e49f6e49g5e49-7e4d52-4f8e73e1g19d7d69-5d7d51e4d59f6d59g1f39b8c69e1g19-6d7d61-1f8c51b1c33d7d69-2g1f36b8c64c2c35-1e1g14-2d7d65c2c39-4f8e71g1f39-3d2d41e5d49g1f39b8c69e4e59d7d59c4b59f6e49f3d49-9C23.g1f31b8c69-4C30.f2f41b8c61g1f39f7f59-3C31.d7d51e4d59c7c62b1c39e5f49g1f39-4e5e44C32.d2d39g8f69d3e49f6e49g1f39f8c59d1e29-8e5f43g1f39g8f69f1c49-6C30.d7d61g1f39b8c69f1c49-4d8h41g2g39h4e79-3C33.e5f46b1c31-1f1c41d7d52c4d59g8f69b1c39-4d8h42e1f19-2g8f64b1c39c7c69c4b39d7d59e4d59c6d59d2d49-9C34.g1f37C36.d7d51e4d59g8f69f1b54c7c69d5c69b8c69d2d49-5f1c45f6d59c4d55d8d59b1c39-3e1g14-6C34.d7d61d2d45g7g59h2h49g5g49f3g19-5f1c44h7h69-3C35.f8e71f1c49e7h43e1f19-2g8f66e4e59f6g49e1g19-6C37.g7g52d2d41-1f1c43C38.f8g75-1C37.g5g44e1g19-3C39.h2h45g5g49f3e59d7d63e5g49g8f69g4f69d8f69b1c39-6g8f66d2d44d7d69e5d39-3f1c45d7d59e4d59f8d69-9C34.g8e71d2d46d7d59-2f1c43-2g8f61e4e59f6h59-3h7h61d2d49g7g59-5C30.f8c51g1f39d7d69b1c33b8c63-1g8f66f1c49b8c69d2d39-5c2c34g8f69d2d49e5d49c3d49-5f1c42g8f69-5g8f61-2C20.g1e21g8f69-2C25.g1f38C44.b8c68C46.b1c31d7d61d2d49c8g49-3f8b41c3d59-2f8c51f1c43g8f69-2f3e56c5f24e1f29c6e59d2d49-4c6e55d2d49c5d69d4e59d6e59-7g7g61d2d49e5d49c3d52f8g79c1g59c6e79-4f3d47f8g79c1e39g8f69-7g8f68C47.a2a31d7d59-2d2d43e5d49c3d51c6b42-1f6e42d1e29-2f8e75c1f49d7d69f3d49-5f3d48d7d61-1f8b48d4c69b7c69f1d39d7d58e4d59c6d59d1e21-1e1g19e8g89c1g59c7c68c3a42h7h69g5h49-3c3e21h7h69-2d1f35b4d63-1b4e73-1h7h63g5f69d8f69f3f69-5g5h41c8e69c3a49b4e79d3a69-6c8e61-5d8e71d1e29-4e8g81e1g19d7d59e4d59c6d59c1g59c7c69c3a44-1d1f35-12f8c51d4c69b7c69-5f8b41f3e59-3C48.f1b53a7a61b5c69-2c6d43b5a43c7c64-1f8c55f3e59e8g89e5d39c5b69e4e59f6e89c3d59-9b5c41-1f3d45e5d49e4e59d4c39e5f69d8f69d2c39f6e58d1e29e5e29b5e29d7d55c1f49c7c69-3f8e74c1e39e7f69e3d49f6d49c3d49-10f8c51-9d7d61d2d49c8d74-1e5d45f3d49c8d79e1g19-6C49.f8b43d2d31d7d69e1g19-3e1g19e8g89b5c61d7c69-2d2d38b4c32b2c39d7d69c1g59d8e79";
c0_opn[75]="-5d7d67c1g57b4c39b2c39d8e79f1e19c6d89d3d49d8e69g5c19c7c55-1f8d84-10c3e22c6e79-7C48.f8c51e1g19e8g89-3f8d61-2C47.f1c41f8c59d2d39-3C46.g2g31d7d53e4d59f6d59f1g29d5c39b2c39f8c54e1g19e8g89d2d34-1f1e15-4f8d64e1g19e8g89a1b19-4f8e71e1g19e8g89-9f8b41f1g29-2f8c54f1g29d7d69d2d37a7a69c1e32-1e1g17e8g89-4e1g12-7C44.c2c31d7d52d1a46d5e49f3e59d8d59-4f1b53d5e49f3e59d8d59d1a49-6d7d61d2d49-2g8f66d2d31-1d2d48d7d61-1e5d43e4e59f6d59c3d49-4f6e45d4d59c6b83-1c6e76f3e59e7g69-8d2d31g8f69-2d2d41d7d61d4e59d6e59d1d89-4e5d49c2c31d4c33b1c33f8b49f1c49-3f1c46d7d69b1c39-4d4d31f1d39d7d69-3d7d54e4d59d8d59c3d49c8g48f1e29e8c83-1f8b46b1c39g4f39e2f39d5c49-7g8f61-6f1c41d7d61f3d49-2f8b41c2c39d4c39e1g19-4f8c52c2c37d4d32-1g8f67c3d45c5b49c1d29-3e4e54d7d59c4b59f6e49-6e1g12d7d69c2c39-4f8e71c2c39d4c39-3g8f65e1g14f6e47f1e19d7d59c4d59d8d59b1c39d5a59c3e49c8e69c1d25-1e4g54e8c89g5e69f7e69e1e69f8d69c1g59-16f8c52e4e59d7d59e5f69d5c49f1e19c8e69f3g59-9e4e55d7d57c4b59f6e49f3d49c8d77b5c69b7c69e1g19f8c56c1e34-1f2f35e4g59f3f49-4f8e73f2f39-6f8c52c1e39c8d79b5c69b7c69-9f6e41-1f6g41-2f3g51-2h7h61e1g19-3C45.f3d47c6d41d1d49d7d69b1c35g8f69-2f1c44-4d7d61b1c39g8f69-3d8f61c1e35f8c59c2c39f6g62-1g8e77f1c49-5d4c64f8c59d1d29d7c69b1c39-6d8h41b1c36f8b49d4b54-1f1e25h4e49d4b59-5d4b53-2f8b41c2c39b4c56c1e37c5b69f1c49-3d4c62b7c69f1d39-4b4e73-3f8c54c1e34c5b61-1c6d41e3d49c5d49d1d49d8f69-5d8f69c2c39d7d61-1f6g61b1d29-2g8e78d1d21-1d4c21-1f1c46b7b61e1g19c8b79-3c6e54c4e29d7d51-1f6g68e1g19d7d69f2f35e8g89-2g1h14-6d7d61e1g19-2e8g83e1g19c5b64-1c6e53c4e29-2f6g62-4f1e21-1g2g31d7d59f1g29d5e49-6d4b51c5e39f2e39-5d4b31c5b41-1c5b68a2a45a7a69b1c39d7d69-4b1c34d7d64-1d8f65-4d4c64b7c61f1d39-2d8f69d1d29b7c61b1c34g8e79-2f1d35g8e79e1g19e8g89b1c39-6d7c67b1c38c5d42f1d39g8e79e1g19e7g69g1h19g6e59d3e29e5g49-9c8d71f1d39-2c8e63c3a49a8d87f1d39c5d49e1g19-4c5d62-3f6e71-1g8e72d2f49f6e69-4f1d31c8e69-3f6c61f1d39g8f69e1g19-5d1f31f6f39g2f39-5d4f51d8f69b1c39-4g7g61-1g8e71-1g8f63b1c32f8b49d4c69b7c69f1d39d7d58e4d59c6d58e1g19e8g89c1g59c7c69c3a42-1c3e21-1d1f36b4e79-7d8e71d1e29-4e8g81e1g19d7d59e4d59";
c0_opn[76]="c6d59c1g59c7c69d1f39-13d4c67b7c69b1d21-1e4e58d8e78d1e29f6d59c2c49c8a65b1d21-1b2b37e7h41a2a39f8c59g2g39c5f29e2f29h4e49e1d19-8e8c81g2g39-2g7g51g2g39f8g79c1b29e8c89-5g7g64c1b22f8g79-2f2f45e7b43c1d29b4b69-3f8g76e2f29-3g2g32f8g79c1b29e8g89f1g29-7g2g32g7g69b2b39f8g79c1b29e8g89f1g29a8e89e1g19-10d5b64b1c34a7a52-1c8a61-1e7e66e2e49c8a69b2b39-5b1d23a7a53g2g39-2c8b72b2b39-2e7e63b2b39-3b2b31-1g2g31-6f6d51c2c49d5b69f1d39-4f6e41-2f1d31d7d58e4d54c6d59e1g19f8e79-4e4e55f6g49-3d7d61e1g19-8C44.f7f61-2C60.f1b56C68.a7a67C70.b5a48b7b51a4b39c6a54e1g19d7d69d2d49-4f8c51-1f8e71-1g8f62e1g19-4C71.d7d61C73.a4c61b7c69d2d49e5d43d1d44-1f3d45c6c59-3f7f66b1c34-1c1e35g8e79b1c39e7g69-8C74.c2c33C75.c8d76C76.d2d47g7g63e1g19f8g79-3g8e74c1e39-2g8f62-2C75.e1g12g8e79d2d49e7g69-5C74.f7f52e4f59c8f59e1g19f5d39f1e19f8e79a4c29d3c29d1c29g8f69d2d49e5e49f3g59d6d59f2f39-16g8f61-2C71.c2c41c8g49-2d2d41b7b59a4b39c6d49f3d49e5d49b3d54a8b89-2c2c35d4c39-8C72.e1g13c8d76c2c37g7g63d2d49f8g79-3g8e74d2d49e7g69-3g8f62-2d2d42-2c8g42h2h39h7h59-3g8f61-3C70.f7f51d2d49e5d49e4e59f8c59e1g19g8e79-7f8c51e1g19-2f8e71-1g7g61-1g8e71-1C77.g8f69a4c61d7c69d2d39f6d74b1d29-2f8d65b1d29-5b1c31b7b59a4b39f8e79d2d39-5d1e21b7b56a4b39f8c54a2a41a8b89a4b59a6b59-4c2c35d7d64-1e8g85e1g19-3d2d31-1e1g11-2f8e75c2c36d7d63-1e8g86e1g19-3e1g13e8g89c2c39d7d69-7d7d61c2c39-2f8e72c2c36b7b59a4b39e8g89-4e1g13b7b59a4b39-5d2d31b7b54a4b39f8c52e1g19-2f8e77c2c33e8g89-2e1g16d7d64c2c39e8g89-3e8g85-5d7d65c2c39c8d71-1f8e73b1d25e8g89d2f19-3e1g14e8g89f1e19-4g7g64b1d25f8g79d2f19e8g89f1g39-5e1g14f8g79-4c2c41-2f8c51-2d2d41b7b51a4b39-2e5d48e1g19f8e79e4e54f6e49f3d49c6d45d1d49e4c59b1c39e8g89c3d59-6e8g84d4f59d7d59a4c69b7c69f5e79d8e79f1e19-11f1e15b7b55a4b34d7d69b3d59f6d59e4d59c6e59f3d49e8g89-8e4e55c6e59e1e59d7d69e5e19b5a49f3d49c8d79d1f39e8g89d4c69-12e8g84e4e59f6d53f3d49-2f6e86c1f49-7e4e51f6e49e1g19f8e79-5f6e41d1e29-3C78.e1g18b7b51a4b39c8b72c2c32f6e49d2d49c6a59b3c25e5d49-2f3e54a5b39d1b39e4d69-8d2d33f8c53a2a45-1b1c34d7d69-3f8d62-1f8e74b1c39-3d2d41c6d49-2f1e13f8c59c2c39d7d69d2d49c5b69a2a43h7h69";
c0_opn[77]="-2c1e34e8g89b1d29h7h69h2h39-5c1g52h7h69g5h49-10d7d61c2c39-2f6e41d2d49d7d59d4e59c8e69-5f8c53a2a44a8b86a4b53a6b59c2c35d7d69d2d49c5b69-4f3e54c6e59d2d49c5d49d1d49d7d69-8c2c36d7d69d2d49c5b69a4b53a6b59b1a39-3b1a36e8g89a4b59a6b59a3b59-10c8b73d2d39e8g89b1c39-5c2c33d7d69a2a43a8b89-2d2d46c5b69a2a44-1h2h35-5d2d31d7d69c2c39-3f3e51c6e59d2d49c5d49d1d49d7d69c2c39-8f8e73c2c31-1d2d41d7d67c2c39c8g44-1e8g85-3e5d42e4e59-3f1e18d7d64c2c38c6a51b3c29-2e8g88h2h39c6a56b3c29c7c59d2d49d8c79b1d29-6c8b73d2d49f8e89-6h2h31e8g89c2c39-4e8g85a2a42c8b79d2d39-3c2c36d7d53e4d59f6d59f3e59c6e59e1e59c7c69-7d7d66h2h39c6a59b3c29c7c59d2d49d8c79-8h2h31-6C79.d7d61a4c62b7c69d2d49-3c2c31-1d2d41-1f1e14b7b54a4b39-2f8e75-3C80.f6e41d2d49b7b59a4b39d7d59d4e59C81.c8e69b1d23e4c57c2c39d5d44b3e66c5e69c3d49c6d49a2a45-1d2e45-5f3g53d8g59d1f39e8c89b3e69-6e6g42b3c29d8d75f1e19-2f8e74-3f8e73b3c29d5d43-1e6g46f1e19-6f8c51d2e49d5e49-3f8e71c2c39e8g89b3c29f7f59-6c1e31f8c52-1f8e77c2c39e4c54b3c29-2e8g85b1d29-5C82.c2c33e4c51b3c29e6g49f1e19-4f8c55b1d27e8g89b3c28e4f24f1f29f7f69e5f69-4e6f53d2b39f5g69f3d49-4f7f52d2b39c5b69-4d1e21-3d1d31e8g89-2d1e21e8g89-3C83.f8e73b1d27e4c56b3c29e6g49-3e8g83-2c1e32e8g89-4C81.d1e21f8c51-1f8e78f1d19e4c52-1e8g87c2c49b5c49b3c49d8d74-1e7c55c1e39-11C80.f3e51c6e59d4e59-6e5d41f1e19d7d59f3d49f8d69d4c69d6h29-7f8e71-2f1e11e4c59a4c69d7c69f3e59f8e79d2d49c5e69-9C78.f8c51c2c37b7b59a4b34d7d69a2a49c8g49-4a4c25d7d53-1d7d66-4d2d31-1f3e51c6e59d2d49-4C84.f8e76C85.a4c61d7c69b1c31-1d1e12f6d79b2b39-3d2d36c8g41-1f6d78b1d28e8g89d2c49e7f61-1f7f68f3h49d7c59h4f59c8f59e4f59-9b2b31-5C84.b1c31b7b59a4b39d7d69-4c2c31-1C86.d1e21b7b59a4b39d7d64a2a42-1c2c37e8g89-3e8g85c2c39d7d54d2d39-2d7d65f1d19-7C84.d2d31b7b57a4b39d7d67a2a44-1c2c35e8g89-3e8g82-3d7d62c2c39-3d2d41e5d49e4e56f6e49f3d49c6d49d1d49e4c59b1c39-7f1e13-3C87.f1e18C88.b7b59a4b39c8b71-1d7d66a2a41b5b45-1c8g44c2c39e8g89-4C90.c2c39c6a51b3c29c7c59d2d49d8c79b1d29-6c8g41-1e8g89a2a31-1a2a41-1b3c21c6b89a2a49c8b79a4b59a6b59a1a89b7a89b1a39-9d2d31c6a59b3c29c7c59b1d29f8e89d2f19e7f85-1h7h64-8C91.d2d41c8g49";
c0_opn[78]="c1e34e5d49c3d49c6a59b3c29a5c43e3c19-2c7c56-6d4d55c6a59b3c29c7c66h2h39g4c85d5c69-2g4f34d1f39-4d8c83h2h39g4d79b1d29-9C92.h2h38a6a51-1c6a53C96.b3c29c7c59d2d31-1d2d49a5c61c2b34d8c79-2d4d55c6a59-3c5d41c3d49c8b79-3c8b71b1d26c5d49c3d49-3d4d53a5c49-3d8c76b1d29a5c62c2b11-1d4c53-1d4d55-2c5d45c3d49-2c8d71d2f19-2f8d81b2b33-1d2f12-1d4d53-2f8e81d2f19-3c1d21c8d79b2b49-3d4d51-2f6d71b1d28c5d45c3d49-2e5d44c3d49-3d4c51d6c59b1d29-8C94.c6b81d2d31b8d79b1d29c8b79-4C95.d2d49b8d79b1d29c8b79b3c29c7c51-1f8e89a2a41-1b2b31-1b2b41-1d2f18-5c3c41-4C92.c8b72d2d31-1d2d49f8e89b1d23e7f89a2a31h7h69-2a2a44h7h69b3c29-3b3c21-1d4d52c6b89d2f19-5f3g56e8f89g5f39f8e89b1d21-1c1g51-1f3g57-8c8e61b3c22d6d59-2d2d47e6b39a2b36e5d49c3d49d6d59e4e59-5d1b33-4f6d71d2d49d7b61b1d29-2e7f68a2a48c8b79b1a35e5d49c3d49-3d4d54c6e79a4b59-5c1e31c6a59b3c29a5c49e3c19-8f8e81d2d44c8b79b1d26e7f89-2f3g53e8f89g5f39f8e89-6f3g55e8f89g5f39f8e89f3g59e8f89g5f39-8C93.h7h61d2d49f8e89b1d29e7f89b3c22-1d2f17c8b74f1g39-2c8d75f1g39-11C88.h2h31c6a52-1e8g87c2c39c6a59b3c29c7c59d2d49-8e8g83a2a41a8b81-1b5b42d2d37d7d69a4a59c8e69b1d29-5d2d42-2c8b77c2c31-1d2d39d7d68b1c33b5b43-1c6a56b3a29b5b49c3e29c7c59e2g39-7b1d23c6a55b3a29c7c59d2f19-4f6d74-2c1d21-1c2c31c6a59-3f8e81-4b3d51-1C89.c2c35d7d54d2d41-1e4d59f6d59f3e59c6e59e1e59c7c69b3d51c6d59d2d49-3d2d31e7d69e5e19-3d2d48e7d69e5e19-4d5f61d2d49e7d69e5e19-10C90.d7d65d2d41-1h2h39c6a54b3c29c7c59d2d49c5d41c3d49-2d8c78b1d29a5c62-1c5d45c3d49-2c8d72d2f19-8c6b81d2d49b8d79b1d29c8b79b3c29f8e89d2f19-8c8b71d2d49f8e89f3g59e8f89g5f39f8e89f3g59-8c8e61-1f6d71d2d49e7f69-3f8e81f3g59e8f89g5f39f8e89f3g59-6h7h61d2d49f8e89b1d29e7f89d2f19-9C88.d2d31d7d69c2c39c6a59b3c29c7c59b1d29a5c65d2f19-2f8e84d2f19-9d2d41c6d41f3d49e5d49e4e59f6e89-5d7d68c2c39c8g49c1e34c6a54-1e5d45c3d49-3d4d55c6a59b3c29c7c66h2h39-2d8c83-8h2h31c8b76c2c31-1d2d39d7d68a2a38c6a54b3a29c7c59b1c39a5c69-5c6b82b1d29b8d79d2f19-4d8d72b1c39-3c2c31-2f8e81-3d7d63c2c39c6a57b3c29c7c59d2d49d8c79b1d29c5d49-7c6b82d2d49b8d79b1d29-10C87.d7d61a4c62b7c69d2d49e5d49f3d49c8d79-6c2c37c8g46d2d36f6d79-2h2h33";
c0_opn[79]="g4h59-3e8g83-8C68.b5c41-1b5c61b7c61-1d7c69b1c31d8d61d2d49e5d49-3f7f67d2d49e5d49d1d44d8d49f3d49c8d79c1e39-5f3d45c6c59d4e29d8d19c3d19c8d73c1f49e8c89d1e39-4c8e66c1f49e8c89d1e39g8e79a1d19d8d19e1d19-16f8d61d2d49e5d49d1d49f7f69-6d2d31-1d2d41e5d49d1d49d8d49f3d49c6c51d4e29c8d79-3c8d76b1c34e8c89c1e39-3c1e35e8c89b1d29g8e79-5g7g61c1d29f8g79d2c39g8f69b1d29e8g89e1c19f6g49d1f19c8d79d4e29-17e1g17c8g42d2d31-1h2h39g4f31d1f39-2g4h51-1h7h57c2c32d8d39h3g49h5g49f3e59f8d69e5d39d6h29g1h19h2g39-10d2d37d8f69b1d27g8e79d2c42g4f39d1f39f6f39g2f39e7g69-6f1e17e7g69d3d49f8d64-1g6f45-6c1e32g4f39d1f39f6f39g2f39f8d69-11C69.d8d61b1a34b7b53c2c39c6c59a3c29-4c8e66d1e29f7f69f1d19-5d2d32f7f66c1e39-2g8e73-2d2d42e5d49d1d43d6d49f3d49c8d79-4f3d46c8d79c1e39-6f7f64d2d49c8g43c2c32f8d69c1e39g8e79b1d29-5d4e57d8d19f1d19f6e59b1d22e8c89d1e19f8d69h2h39g4h59-6d1d37f8d67b1d29b7b53-1g8f66d2c49-4g4f32d3f39g8f69b1c39f8b49-11e5d46d1d41d8d49f3d49-3f3d49c6c59d4b36d8d19f1d19c8d72c1f49e8c89b1c39-4c8g46f2f39g4d74c1f49e8c89b1c39c5c49b3a59-6g4e65b1c32-1c1e33b7b69-2c1f44c5c49b3d49e8c89b1c39-8f8d61-4d4e23d8d19f1d19c8d79b1c36e8c89c1e39d8e89d1d29d7c69a1d19-7c1e33e8c89b1c39-12C68.f8d61d2d49c8g42d4e59g4f39d1f39d6e59-5e5d47d1d49f7f69c1e39g8e79b1d29-8g8e71f3e59d8d49d1h59g7g69h5g59f8g79e5d39f7f59e4e59-11h2h31-4C61.c6d41b5c41-1f3d49e5d49b5c41-1d2d31c7c69-2e1g17c7c63b5c49g8f69-3f8c56d2d39c7c69b5a44-1b5c45-8C62.d7d61c2c31c8d79-2d2d46c8d75b1c34g8f69-2e1g15g8f69b1c39-4e5d44d1d42c8d79b5c69-3f3d47c8d79b1c35-1e1g14-5e1g12c8d75c2c39-2g8f64-3C63.f7f51b1c35c6d41-1f5e47c3e49d7d55e4g31c8g49h2h39g4f39d1f39-5f3e58d5e49e5c69d8d52c2c49d5d69c6a79c8d79b5d79d6d79-7d8g57d1e29g8f69f2f49g5f49c6e55c7c69d2d49f4h49g2g39h4h39b5c49-7d2d44-10g8f64d1e25d7d59e4f69g7f69d2d49f8g79d4e59e8g89b5c69b7c69e5e69-11e4f64d8f69d1e25f8e79b5c69d7c69f3e59-5e1g14-6g8f61d1e23-1e4f56f8c59-4b5c61d7c69b1c39-3d2d32f5e48d3e49g8f69b1c31-1e1g18d7d63b1c39-2f8c56-5g8f61e1g19-3d2d41f5e49f3e59c6e59d4e59c7c69b1c39-7e4f51e5e49-3C64.f8c51c2c33d8f61-1f7f52d2d49f5e49-3g8e71-1g8f65d2d45c5b65-1e5d44-2e1g14";
c0_opn[80]="e8g89d2d49c5b69c1g59-7e1g16c6d43f3d49c5d49c2c39d4b69d2d49c7c69b5a47d7d69b1a39-3b5c42d7d69-9d7d62c2c39c8d79d2d49c5b69-5d8f61c2c39g8e79-3g8e71c2c39c5b69-3g8f62c2c36e8g89d2d49c5b69c1g59-5f3e53-4C60.g7g61c2c33a7a66b5a49d7d69d2d49c8d79e1g19f8g79-7d7d63d2d49c8d79-4d2d43e5d49c1g59f8e79g5e79d8e79b5c65d7c69d1d49g8f69-4e1g14-7e1g12f8g79c2c39a7a65b5a49d7d69d2d49c8d79-5d7d64d2d49c8d79-7g8e71b1c31g7g69d2d49-3c2c32a7a69-2d2d41e5d49f3d49-3e1g14a7a61-1g7g68c2c39f8g79d2d49e5d49c3d49d7d59e4d59e7d59f1e19c8e69-13C65.g8f61b1c31c6d45-1f8b44e1g19e8g89-4b5c61d7c69-2d1e21d7d62c2c39-2f8c55c2c39e8g89-3f8e71-2d2d31d7d67c2c36c8d73e1g19-2f8e72-1g7g64b1d24f8g79-2e1g15f8g79-4e1g13c8d74-1f8e75-3f8c52c2c33-1e1g16d7d69c2c39e8g89-6d2d41e5d49e1g19-3e1g17a7a61-1C66.d7d61d2d46c8d79b1c39f8e79f1e19e5d49f3d49-7f1e13c8d79c2c39-4C67.f6e47d2d48a7a61b5a49b7b59a4b39d7d59d4e59c8e69-7e4d68b5c69d7c69d4e59d6e41d1e29c8f59f1d19-4d6f59d1d89e8d89b1c38a7a51-1c8d71b2b33d8c89c1b29-3f1d13d8c89f3g59d7e89b2b39-5h2h33h7h69-3c8e61-1d8e84b2b31-1h2h38a7a53-1f5e74c3e45e7g69f1e19-3f1e14-2f8e72-3f5e71h2h39e7g69-3f8e71-1h7h62b2b32-1f1d11d8e89-2h2h35c8d79b2b39d8c89c1b29-7b2b31-1f1d11d8e89b1c39f5e79-10d4e51d6b59a2a49b5d49f3d49c6d49d1d49d7d59-9f8e71d1e26e4d69b5c69b7c69d4e59d6b79b1c39e8g89f1e19-9d4e52e8g89-2f1e11e4d69-4f1e11e4d69b5c62d7c69f3e59f8e79-4f3e57c6e52e1e59f8e79-3f8e77b5d35e8g89-2b5f14c6e59e1e59e8g89-9C65.f8c51c2c36e8g89d2d49c5b69c1g55h7h69g5h49d7d69d1d39-5d4e51f6e49d1d59e4c59-4f1e12d7d69h2h39-7d2d31d7d69-2f3e52c6e55d2d49a7a69-3f6e44d1e29c6e59e2e49d8e79-7f8e71f1e19d7d69-6C50.f1c41c6d41-1d7d61c2c32-1d2d44-1h2h32-2f8c54b1c31d7d61-1g8f68d2d38d7d66c1g59-2h7h63-2e1g11-3C51.b2b41c5b48c2c39C52.b4a55d2d48d7d63d1b39d8d79d4e59-4e5d46e1g19g8e79-4e1g11d7d69d2d49-4C51.b4c51d2d49e5d49e1g19-4b4e73d2d49c6a59f3e59a5c49e5c49d7d59e4d59d8d59c4e39-12c5b61a2a49a7a69b1c39-5C53.c2c35c5b61d2d49d8e79-3d7d61d2d49e5d49c3d49c5b44-1c5b65-5d8e71d2d42c5b69-2e1g17d7d69d2d49c5b69-5g8f68C54.b2b41c5b69d2d39d7d69a2a49-5C53.d2d35a7a63b1d22c5a79-2c4b34c5a76b1d25-1e1g14";
c0_opn[81]="d7d69-3d7d63-2e1g13c5a75c4b39-2d7d64c4b39c5a79-5d7d65b1d22a7a67c4b39c5a74-1e8g85-3e8g82-2b2b41c5b69a2a49-3c4b32a7a69b1d24-1e1g15-3e1g13e8g89b1d25-1c4b34-3h2h31-2e8g81e1g19d7d69-3h7h61-2d2d43e5d49C54.c3d48c5b49b1c34d7d51-1f6e48e1g19b4c38d4d59c3f69f1e19c6e79e1e49d7d69c1g59f6g59f3g59-10e4c31-4c1d25b4d28b1d29d7d59e4d59f6d59d1b37c6a55b3a49a5c69a4b39c6a59b3a49-6c6e74e1g19e8g89f1e19c7c69-6e1g12e8g89-7f6e41d2b49c6b49-6e1g11-1C53.e4e51d7d59c4b59f6e49c3d49c5b49-10C50.d2d31d7d62b1c39-2g8f66b1c34d7d69c1g59h7h69g5f69d8f69c3d59f6d89c2c39-9c1g51-1c2c31-1e1g12d7d69-3h7h61-2e1g11d7d62c2c35-1h2h34g8f69-3g8f67b1c31-1d2d36d7d68c2c39a7a65-1e8g84-3e8g81-2d2d42c5d45f3d49c6d49-3e5d44e4e59d7d59-7f8e71b1c31g8f69-2c2c31g8f69d2d39-3d2d31-1d2d44d7d65d4e59d6e59d1d89e7d89-5e5d44c2c33-1f3d46d7d69-4e1g13d7d61-1g8f68d2d39e8g89-5g7g61-1C55.g8f64b1c31f6e43c3e49d7d59-3f8c54d2d39-2f8e72-2d2d35d7d51e4d59f6d59e1g19-4d7d61-1f8c53b1c31d7d69c1g59-3c2c35a7a63c4b36-1e1g13-2d7d65b1d22a7a69-2c4b33-1e1g13e8g89-3e8g81e1g19-3e1g12d7d69c2c39-4f8e74b1c31d7d66h2h39-2e8g83-2c2c31d7d62-1e8g87b1d24-1e1g15d7d69-4c4b31e8g89-2e1g17d7d61c2c39e8g89-3e8g88b1c31d7d69-2c2c31d7d54e4d59f6d59-3d7d65c4b39-3c4b32d7d69c2c39c6a59b3c29c7c59-6f1e15d7d69a2a44c8e62-1g8h82-1h7h64-2c2c35c6a59c4b59a7a69b5a49b7b59a4c29c7c59b1d29f8e89d2f19-16h7h61c2c32d7d69-2e1g17d7d69c2c39g7g69d3d45d8e79-2f1e14f8g79-8C56.d2d41e5d49e1g14f6e47f1e19d7d59c4d59d8d59b1c39d5a57c3e49c8e69c1d24-1e4g55e8c89g5e69f7e69e1e69f8d69c1g59-10d5h52c3e49c8e69-9f8c52e4e59d7d59e5f69d5c49f1e19c8e69f3g59d8d59b1c39d5f59-12e4e54d7d57c4b59f6e49f3d49c8d75b5c69b7c69e1g19f8c59f2f39e4g59-7f8c54c1e39c8d79b5c69b7c69-9f6e41-1f6g41-2f3g51-3C55.e1g11f6e49-2C57.f3g52d7d59e4d59b7b51c4f19-2C58.c6a56c4b59c7c68C59.d5c69b7c69b5e27h7h69g5f37e5e49f3e59d8d42-1f8d67d2d46e4d39e5d39d8c79-4f2f43-5g5h32f8d69d2d39-5d1f32a8b89-5C58.c8d71d1e29f8d64-1f8e75-4d2d31h7h69g5f39-4C57.c6d41c2c39b7b59c4f19f6d59g5e49-6f6d51g5f79e8f79d1f39f7e89c4d59-8f8c51c4f75e8e79-2g5f74-4C50.h7h61-2C44.f1e21g8f69d2d39-4C40.d7d51e4d56e5e44";
c0_opn[82]="d1e29-2f8d65d2d49e5e49-4f3e53f8d69d2d49d5e49-5C41.d7d61b1c31g8f69-2d2d48b8d72b1c32c7c69-2f1c47c7c68e1g19f8e79a2a44-1d4e55d6e59f3g59e7g59d1h59-8f8e71d4e59-4c8g41d4e59-2d8e71b1c39-2e5d44d1d41a7a62c1g59b8c69-3b8c63f1b59c8d79b5c69d7c69b1c39-6g8f64b1c39f8e79-4f3d48g7g62b1c39f8g79c1e39g8f69d1d29e8g89-7g8f67b1c39f8e79c1f41e8g89d1d29-3f1c41e8g89e1g19-3f1e25e8g89e1g19a7a62-1c7c51-1f8e86f1e13e7f89-2f2f46e7f89e2f39c7c59-8g2g31-2g7g61-5f7f51-1g8f62b1c37b8d79f1c49f8e79e1g19e8g89a2a41c7c69-2d1e21-1f1e14c7c69a2a49-3h2h32c7c69a2a49-9d4e52f6e49d1d56e4c59c1g59d8d79-4f1c43-5f1c41b8c61-1c7c61-1f8e76d2d45e5d49f3d49g8f69b1c39e8g89e1g19-7e1g14g8f69-3h7h61-3C40.d8e71b1c35c7c69d2d49d7d69-4f1c44-2f7f51b1c31-1f1c42f5e49f3e59-3f3e56b8c62-1d8f67d2d47d7d69e5c49f5e49b1c39f6g69-6e5c42f5e49-5f7f61-1f8c51-1C42.g8f61b1c31b8c66d2d43e5d48c3d51-1f3d49f8b49d4c69b7c69f1d39d7d57e4d59c6d59e1g19e8g89c1g59c7c69c3a44-1d1f35-8e8g82e1g19-8f8b41f3e59-3f1b53c6d44b5a46f8c59-2f3d43e5d49e4e59d4c39e5f69d8f69d2c39-8d7d61-1f8b44e1g19e8g89d2d39d7d69c1g59b4c39b2c39-8f8c51-2f1c41f6e45c3e49d7d59-3f8c54-2g2g31d7d54e4d59f6d59f1g29d5c39b2c39-6f8c55f1g29d7d69d2d39a7a69-7d7d61d2d49b8d79f1c49f8e79-5f8b42d2d31-1f1c43b8c62-1d7d62-1e8g84e1g19-3f3e55e8g89e5d31b4c39d2c39f6e49-4f1e28f8e89e5d39b4c39d2c39f6e49d3f45d7d69e1g19b8d79-4e1g14-11d2d31b8c69c2c33d7d59b1d29-3f1e23-1g2g33-3C43.d2d41e5d41e4e59f6e49d1d49d7d59e5d69e4d69b1c35b8c69d4f49-3f1d34b8c69d4f49-10f6e48d4e51d7d59b1d29-3f1d38b8c61d3e49d7d59-3d7d59f3e59b8d77b1c31-1d1e21d7e59d3e49d5e49e2e49c8e69e4e59d8d79-8e1g11d7e59d4e59e4c59-4e5d77c8d79e1g19d8h42c2c49e8c89c4c59g7g59-5f8d66b1c31e4c39b2c39-3c2c48c7c69b1c32-1c4d57c6d59b1c33e4c39b2c39e8g89d1h59-5d1h56e8g89h5d59d7c69d5h59g7g69h5h39-12f8e71c2c49-5e5f71-2f8d62e1g19e8g89c2c49c7c63-1d6e56d4e59b8c69c4d59d8d59d1c29c6b49d3e49b4c29e4d59c8f59g2g49-16f8e71e1g19e8g89-6f3e51d7d59-4C42.f1c41b8c62-1f6e47b1c39e4c39d2c39-5f3e56d7d69e5c41f6e49b1c34e4c39-2d1e23d8e79-2d2d42-3e5f39f6e49b1c31e4c37d2c39b8c61c1f49-2f8e78c1e32b8c63d1d29-2e8g86d1d29-3c1f47b8c62";
c0_opn[83]="d1d29c8g49-3b8d73d1d29d7c59e1c19-4e8g84d1d29b8d79e1c19d7c59-9e4f62d2d49d6d54f1d39-2f8e75f1d39-5c2c41b8c63b1c39-2f8e76b1c34-1d2d45e8g89f1d39-5d1e22d8e79d2d39e4f69b1c31e7e29f1e29-3c1g58b8d72b1c39e7e27f1e29h7h69g5d29-4h7h62-3c8e61-1e7e27f1e29b8d71-1f6d51g5d29f8e79b1c39d5c39d2c39e8g89e1g19b8c69f1e19-10f8e78b1c38c7c68e1c18b8a68h1e19a6c79c3e49f6e49d3e49-6h7h61-2e1g11-2h7h61-2b1d21-1e1g11-5e2e71f8e79f1e29-7d2d31e4f69d3d49d6d56f1d39f8d69e1g19e8g89-5f8e73f1d39-5d2d45d6d59f1d39b8c64e1g19c8g41c2c46e4f69b1c39-3f1e13f8e79-3f8e78c2c48c6b48c4d51b4d39d1d39d8d59f1e19c8f59-6d3e28c8e61b1c39e8g89-3e8g89a2a31b4c69c4d59d8d59b1c39e4c39b2c39-7b1c38b7b61-1c8e64c1e32-1f3e57c7c53-1f7f66e5f39g8h89-5c8f54a2a39e4c39b2c39b4c69c4d53-1f1e16-10e4f61b1c35e8g89-2h2h34-3f1e11c8f51-1c8g48c2c36f7f59b1d25e8g89-2d1b34e8g89-4c2c43e4f69-7c8g41-1f8d63c2c41-1e1g19e8g89c2c48c7c69b1c33e4c39b2c39c8g44c4d55c6d59-2h2h34g4h59-3d5c45d3c49c8g49d1d35b8d79-2h2h34g4h59-8c4d52c6d59b1c39e4c39b2c39c8g49a1b19b7b62-1b8d77h2h39-9d1c22b8a69a2a39c8g43f3e59-2f7f54b1c39a6c79-3f8e82b1c39c8g49c3e49d5e49d3e49-9f1e11c8f59-4f1e11c8f55c2c49c7c69-3f8e84c2c49c7c69b1c39-8f8e72e1g19b8c67c2c46c6b48d3e29e8g89a2a31b4c69c4d59d8d59b1c39e4c39b2c39-7b1c38c8e63f3e59-2c8f56a2a39e4c39b2c39b4c69f1e19-10e4f61b1c39e8g89-4f1e13c8g49c2c35f7f59-2c2c45e4f69c4d59-6c8f51-1e8g81c2c49c7c69-7f8e71f1d39e4f69-4f1d31d6d52d1e29d8e79e1g19-4e4c51d3e29-2e4f65e1g15f8e79h2h39-3h2h34f8e79e1g19e8g89-8e5f71e8f79d2d49-4d8e71-1f6e41d1e29d8e79e2e49d7d69d2d49d6e59-10C20.g2g31g8f69-3C00.e7e61b1c31b7b61-1c7c51-1d7d59d2d43f8b46e4e59c7c59-3g8f63c1g59-3e4d51e6d59d2d49-3g1f35d5d41-1g8f68e4e59f6d79d2d49c7c59d4c59b8c66c1f49f8c59f1d39f7f69e5f69d7f69-7f8c53f1d39b8c69-12b2b31c7c51-1d7d59c1b29d5e45b1c39g8f69d1e29-4g8f64e4e59f6d79-6c2c41c7c53-1d7d56c4d55e6d59e4d59-3e4d54e6d59c4d59-5d1e21b7b61-1b8c61-1c7c56f2f41b8c69g1f39-3g1f34b8c69g2g39g7g69f1g29f8g79e1g19g8e79-8g2g33b8c69c2c33-1f1g22-1g1f34g7g69f1g29f8g79-7d7d51-1e6e51-1f8e71g1f39d7d59-3g8e71-1g8f61-2d2d31b7b51-1b7b61-1b8c61-1c7c52b1d21b8c69";
c0_opn[84]="g1f39-3g1f36b8c69c2c31-1g2g39d7d51b1d29-2d7d61f1g29-2g7g66c1g51-1f1g28f8g79e1g19g8e79c2c35-1f1e14d7d69c2c39-8g8e71f1g29g7g69e1g19f8g79-8g2g32b8c69f1g29g7g69b1c33f8g79c1e39d7d69-4f2f42f8g79g1f39g8e79-4g1f33f8g79e1g19g8e79-9d7d57b1d27b7b61-1b8c61g1f39g8f69-3c7c53g1f37b8c69g2g39f8d64f1g29g8e79e1g19e8g89f1e16-1f3h43-6g7g62f1g29f8g79e1g19g8e79f1e19b7b65-1e8g84-7g8e71f1g29g7g69-3g8f62f1g29f8e79e1g19e8g89f1e19b7b59-9g8f61g2g39-3g2g32b8c67f1g29g8f69g1f39f8e79e1g19e8g89f1e19-8f8d62f1g29g8e79-5d5e41d3e49-2g8f66g1f38b7b62c2c34c7c53-1f8e76-2e4e51f6d79d3d49c7c59c2c39-5g2g34c8b72-1d5e47d3e49c8b76d1e29-2f8c53-5b8c62c2c34a7a59-2e4e51f6d79d3d49-3f1e21-1g2g33d5e49d3e49e6e55f1g29f8c59e1g19e8g89-5f8c54f1g29-6c7c52g2g39b8c69f1g29f8e79e1g19b7b62f1e19c8b79-3e8g87e4e53f6d79f1e19-3f1e17b7b59e4e59f6d79d2f19-12d5e41d3e49f8c59-3f8c51-1f8e71g2g39c7c55f1g29b8c69e1g19-4e8g84f1g29-5g2g31b7b62f1g29c8b79-3c7c53f1g29b8c69g1f39f8e79e1g19-6d5e43d3e49-5d1e22b8c61g1f39e6e59-3d5e42d3e49b7b63-1e6e56g1f39b8c69c2c39g8f69-7f8e71g1f39g8f69g2g39-4g8e71-1g8f64g1f39c7c52g2g39b8c69f1g29-4f8e77g2g39b7b53-1c7c53f1g29b8c69e1g19-4e8g82f1g29-8g7g61-2d2d48a7a61-1b7b61b1c31c8b79-2f1d34c8b79g1f39c7c59-4g1f34c8b79f1d39c7c59c2c39-6c7c51c2c32d7d59-2d4d52e6d59e4d59d7d69g1f39-5g1f35c5d49f3d49a7a63-1g8f66b1c39-6c7c61-1d7d59C01.b1c34a7a61-1b8c61e4e52f7f69-2g1f37g8f69c1g54f8e79e4e59f6e49g5e79d8e79-6e4e55f6e49f1d39f8b49c1d29e4d29d1d29f7f69-11C10.c7c51-1d5e41c3e49b8d75f1d31g8f69d1e29c7c59e4f69d7f69d4c59f8c59-8g1f38f8e71f1d39g8f69-3g8f69c1g52f8e77e4f69d7f63-1e7f66-3h7h62e4f69d7f69-4e4f65d7f69c1g53c7c53-1f8e73-1h7h63-2c2c31c7c59-2f1d35c7c59d4c57f8c59e1g19e8g89-4e1g12-5f1d32c7c53e1g19-2f6e44d3e49d7f69e4d39-4f8e72-4g2g31g8f69e4f69d7f69f1g29-6c8d73g1f39d7c69f1d39b8d79d1e22g8f69-2e1g17f8e71-1g8f68d1e22-1e4d23f8e79-2e4g34f8e79-5c6e41d3e49c7c69-7f8e71g1f39g8f69-3g8f61c1g54f8e79g5f69e7f69g1f39-5e4f65d8f65g1f39h7h69-3g7f64-5C15.f8b45a2a31b4c39b2c39d5e48d1g47g8f69g4g79h8g89g7h69b8d73-1c7c52-1g8g63-6f2f32-2g8e71-4c1d21d5e47d1g49d8d44-1g8f65g4g79";
c0_opn[85]="h8g89g7h69-6g8e72-2c3e21-1d1d31d5e49d3e49g8f69e4h49-5d1g41g8f69g4g79h8g89g7h69-5e4d51e6d59d1f31-1f1d39b8c66a2a38b4a51c1e39-2b4c35b2c39g8e76d1f33c8e69-2d1h56c8e69-3g8f63g1e29e8g89e1g19c6a59-7b4e72-2g1e21g8e79e1g19-4c7c61-1g8e71d1h59-2g8f61c1g55-1g1e24e8g89-6C16.e4e57b7b61a2a35b4c32b2c39d8d79-3b4f87f2f44-1g1f35-3c1d21-1d1g43b4f89c1g59d8d79-5C17.c7c57C18.a2a38b4a51b2b48c5d49c3b56a5c79f2f49c8d76b5c75d8c79g1f39-3g1f34d7b59f1b59-4g8e73g1f39c8d79-6d1g43g8e79b4a57d4c39g4g79h8g89g7h79b8c69f2f45d8a59g1f39c8d79-4g1f34d8c79c1f49c8d79-10c3b52a5c79g4g79h8g89g7h79a7a69b5c79d8c79-12c1d21b8c69-2d1g41g8e79d4c59a5c39b2c39-6C19.b4c38b2c39b8c61d1g45g7g69-2g1f34-2d8a51c1d29a5a49d1b14c5c49-2d1g42g7g69-2g1f32b7b69-5d8c72d1g44f7f59g4g36c5d48c3d49g8e79c1d29e8g89f1d39b7b69g1e29c8a69e2f49-10g8e71-2g4h53g7g69h5d19c8d79g1f39d7a49-7f7f61-2g1f35b7b63a3a43c8a69f1a69b8a69-4f1b56c8d79b5d39d7a49e1g19-6b8c61-1c8d71-1g8e74a3a45b7b69f1b59c8d79b5d39b8c69e1g19h7h69-8f1d32-1h2h41-4g8e76a3a41b8c65g1f39d8a59c1d25c8d79-2d1d24c8d79-5d8a54c1d29b8c69g1f39c8d79-6d1g45c5d41g4g79h8g89g7h79d8c79-5d8c73f1d31c5d49g1e29d4c39g4g79h8g89g7h79-7g4g78h8g89g7h79c5d49g1e29b8c69f2f49c8d78h7d39d4c39a1b12-1d3c32-1e2c34-4d4c31h7d39c8d79-11e7f51f1d39h7h59-3e8f81c1d29-2e8g84f1d38b8c65g1f32f7f59-2g4h57e7g69g1f39d8c79c1e39c5c46d3g69f7g69h5g49-4c6e73-7d8a52c1d29b8c69g1f39f7f59e5f69f8f69g4h59-8f7f52e5f69f8f69c1g59f6f79g4h59g7g69h5d19b8c69g1f39-11g1f31b8c69f1d39f7f59e5f69f8f69c1g59-9g1f32b7b61f1b59c8d79b5d39-4b8c62a3a46d8a59c1d29c8d79-4f1e23-2c8d73a3a49d8a59c1d29b8c69f1b59-6d8a51c1d29b8c69-3d8c71-2h2h41b8c64h4h59d8a59c1d29-4d8a52c1d29-2d8c73-5C18.c5d41a3b49d4c39-4C17.c1d21b8c61c3b59b4d29d1d29c6d49b5d49c5d49-7c5d41c3b59b4d29d1d29-4g8e76a2a32b4c39d2c39b7b63-1b8c66g1f39c5d49f3d49-7c3b54b4d29d1d29e8g89c2c33b8c69f2f49-3d4c53b8d79-2f2f43-5d4c51b8c69-2f2f41-2g8h61-2d1g41g8e79d4c55b8c69c1d29-3g1f34-3d4c51g8e79-3C16.d8d71a2a35b4c37b2c39b7b69a3a44c8a69f1a69b8a69-4d1g45f7f59g4g39c8a69f1a69b8a69-9b4f82-2c1d22b7b69f1b59-3d1g41f7f59g4g39b7b69-5g8e71a2a37";
c0_opn[86]="b4c39b2c39b7b61d1g49e7g69h2h49h7h59g4d14c8a69f1a69b8a69c1g59-5g4g35c8a69-7c7c58a3a41-1d1g45d8c72f1d32-1g4g77h8g89g7h79c5d49g1e29b8c69f2f49c8d79h7d39d4c39-11e8f81-1e8g85f1d39b8c66g4h59e7g69g1f39d8c79c1e39c5c49d3g69f7g69h5g49-10f7f53e5f69f8f69c1g59f6f79g4h59g7g69h5d19-11g1f32b7b63f1b59c8d79b5d39-4b8c62a3a49-2c8d72-1d8a51c1d29-3h2h41-5c1d21b7b65-1c7c54c3b59b4d29d1d29e8g89-6d1g41c7c59-2g1f31c7c59a2a39-5C15.f1d31c7c53e4d59d8d59-3d5e46d3e49g8f69e4f39c7c59-6g1e21b8c61a2a37b4a59-2e4e52-2d5e46a2a39b4c34e2c39b8c69d4d52-1f1b57g8e79c1g59f7f69g5e39e8g89d1d29f6f59e1c19-12b4e75c3e49b8c62-1b8d71-1g8f66d1d33-1e2g36b8d79f1d39-8g8e71a2a39-2g8f61c1g53d5e49a2a39b4e79-4e4e56f6d75-1f6e44-5C01.f8e71g1f39-2C10.g8f63C11.c1g56C13.d5e43c3e49b8d73e4f63d7f69g1f39c7c53-1h7h66-4g1f36f8e74e4f69e7f69g5f63-1h2h46e8g89-5h7h65e4f69d7f69g5h49c7c59-7f8e76e4f61e7f69g5f69d8f69g1f39e8g89-6g5f69e7f65g1f39b8d74d1d24e8g89e1c19f6e79-4f1c42-1f1d32-2e8g85c2c31b8d79-2d1d26b7b62-1b8d77e1c19b7b69-4f1c42b8c69c2c39e6e59d4d59-8g7f64g1f39a7a63f1d35-1g2g35-2b7b63f1b52c7c69-2f1c45c8b79d1e29c7c69e1c19d8c79-6f1d32c8b79d1e29-4f6f52e4c36e7f69d1d29c7c59-4e4g33c7c59-8g5f61-2C12.f8b42e4d51d8d57g5f69b4c35b2c39g7f69-3g7f64-3e6d52-2e4e58h7h69e5f61h6g59f6g79h8g89h2h49-5g5c11-1g5d27b4c39b2c38f6e49d1g49e8f82f1d37e4d29e1d29c7c59g1f34-1h2h45b8c69-6h2h42c7c59-3g7g67d2c11c7c59f1d39-3f1d38e4d29e1d29c7c59g1f35b8c63-1c8d76h2h49-3h2h44b8c67-1c8d72-6h2h41c7c59f1d39-5f1d31e4d29d1d29c7c59g1f39-7d2c31f6e49-4g5e31f6e49d1g49e8f84a2a39b4c39b2c39c7c59f1d39-6g7g65a2a39b4c39b2c39-7g5h41g7g59-5C13.f8e73e4e59C14.f6d79g5e76d8e79c3b51-1d1d21e8g89f2f49c7c59-4f2f48a7a65g1f39b7b61-1c7c59d1d25b8c69d4c59d7c54-1e7c55e1c19-5d4c54b8c66f1d39-2e7c53-5c7c51-1e8g84g1f39c7c59d1d24b8c69d4c59e7c55-1f7f64e5f69e7f69g2g39d7c59e1c19-9d4c55b8c69d1d23-1f1d36f7f69e5f69-11h2h43a7a63d1g49e7g59h4g59c7c59-5c7c52g5e79e8e79-3e7g53h4g59d8g59g1h39g5e79h3f49b8c69-7e8g81-3f6e41g5e79-3g5f61e7f69e4e55f6e79d1g49-3g1f34-5C10.e4d51e6d59c1g54f8e79-2f1d35-3C11.e4e53f6d79c3e21c7c59c2c38b8c68f2f48";
c0_opn[87]="b7b52-1c5d42c3d49-2d8b65g1f39f7f69-4g1f31-2c5d41c3d49f7f69-4f2f41b8c69-4f2f47c7c59c3e21-1d4c51-1g1f39a7a61c1e39d8b69a2a34b8c69-2c3a45b6a59c2c39c5d49b2b49a5c79-9b8c68c1e39a7a63d1d29b7b58a2a31-1d4c57f8c59e3c59d7c59d2f28d8b69b2b42-1f1d37b5b49c3e29-5f1d31-5f1e21-2c5d41f3d49f8c59e1c19e8g89h2h49-8c5d44f3d49c6d41e3d49-2d8b61d1d29b6b29a1b19b2a39f1b59c6d49e3d49-8f8c58d1d29a7a61e1c19e8g89-3c5d41e3d49c6d49d2d49d8b69-5c6d41e3d49c5d49d2d49d8b69d4b69d7b69-7e8g86e1c18a7a68c1b12-1h2h47c5d42e3d49b7b59-3c6d47e3d49b7b59h1h39-6c6d41e3d49a7a69-4g2g31-6d8b61c3a49b6a59c2c39c5c42b2b49-2c5d47b2b49c6b49c3b49f8b49e3d29b4d29f3d29-12f8e71-2c3e21-2d8b61c1e39-5g1f31c7c59d4c59b8c69c1f49f8c59f1d39f7f69e5f69-10f6e41c3e49d5e49-4f1d31c7c59-4C03.b1d23a7a61f1d31c7c59d4c59f8c59g1f39-5g1f38c7c58d4c53f8c59f1d39b8c69-4e4d56e6d59d4c55f8c59d2b39c5b69-4f1e24c5c49e1g19f8d69-7g8f61f1d39c7c59-5b7b61g1f39-2C04.b8c61c2c31e6e59e4d59d8d59g1f39e5d49f1c49-7g1f38g8f69e4e59f6d79c2c32f7f69e5f69d8f69f1b59f8d69-6d2b31a7a55a2a49-2f8e74-2f1b52a7a69b5c69b7c69-4f1d31c6b49d3e29c7c59c2c39b4c69-6f1e22f7f67e5f69d8f69d2f19f8d69f1e39e8g89e1g19-8f8e72-7C07.c7c52c2c31b8c65g1f39-2c5d44c3d49d5e49d2e49-5d4c51f8c59-2e4d56d8d55d4c51f8c59g1f39g8f69f1c46-1f1d33-5g1f39c5d49f1c49d5d69d1e21g8f69d2b39b8c69c1g59a7a69e1c19b7b59c4d39f8e79-10e1g18b8c61d2b39g8f69b3d49c6d49-5g8f69d2b39b8c69b3d49c6d49d1d43c8d74c1f49d6d49f3d49a8c89-5d6d45f3d49a7a63-1c8d76c1f49-5f3d46a7a68c2c32d6c79c4b34-1d1e25f8d69-4c4b33c8d72-1d6c77d1f39f8d69h2h39-5f1e14d6c79c4b39c8d73-1f8d66d4f59-6c8d71b2b33-1c2c36d6c79d1e29-9f1e11-4d5d81e1g19a7a69d2b39-6g8f61f1c49-4C08.e6d54f1b53b8c64d1e23f8e79d4c59g8f69-4g1f36f8d69d4c55d6c59e1g19g8e79d2b39c5d69-6e1g14-4c8d75b5d72b8d79-2d1e27f8e79d4c59g8f69d2b39e8g89c1e39f8e89-10C09.g1f36a7a61-1b8c65d4c51f8c59d2b39-3f1b59f8d69d4c56d6c59e1g19g8e79d2b39c5d69c1g54e8g89-2f1e15e8g89c1g59c8g49-10e1g13g8e79d4c59d6c59d2b39c5d69-9g8f63f1b59c8d79b5d77b8d79e1g19f8e79d4c59d7c59d2b34c5e49f3d49-3f1e12e8g89-2f3d43d8d79-8d1e22f8e79-8C07.g1f33a7a61e4d59-2b8c63e4d57e6d59";
c0_opn[88]="f1b59f8d69d4c57d6c59d2b32c5d69-2e1g17g8e79d2b39c5d69c1g54e8g89-2f1e15e8g89c1g59-9e1g12g8e79d4c59d6c59d2b39-9f1b52c5d49f3d49c8d79-5c5d44e4d56d8d59f1c49d5d69d1e21-1e1g18g8f69d2b39b8c69b3d49c6d49d1d43d6d49f3d49-3f3d46a7a67f1e19-2c8d72-12f3d43b8c65d4c63b7c69-2f1b56c8d79d4c69d7c69b5c69b7c69c2c49-8g8f64e4d59d8d59-5g8f62e4d56e6d59f1b59c8d79b5d79b8d79e1g19f8e79d4c59d7c59d2b39c5e49f3d49d8d79-14e4e53f6d79c2c39b8c69f1d39-8C03.d5e41d2e49b8d75f1d31g8f69d1e29c7c59e4f69d7f69d4c59f8c59-8g1f37f8e71f1d39-2g8f69c1g51f8e79e4f69-3e4f66d7f69c1g51-1c2c32c7c55-1f8e74-2f1d35c7c57d4c56f8c59e1g19e8g89-4e1g13c5d49f3d49-4f8e72-4f1d31f6e49d3e49d7f69e4d39-7g2g31-2c8d72f1d31-1g1f39d7c69f1d39b8d79d1e22g8f69-2e1g17g8f69d1e22-1e4d24f8e79-2e4g33f8e79-9f8e71g1f39b8d74-1g8f65-3g8f61e4f69d8f69g1f39h7h69f1d39-8f8e71c2c31c7c59d4c59e7c59-4e4e51c7c59d1g49e8f89d4c59b8c69-6f1d34c7c59d4c59b8d71e4d59e6d59-3g8f69d1e28b8c67g1f39a7a53e1g19-2c6b46d2b35b4d39c2d39a7a59-4e1g14b4d39c2d39e7c59d2b39c5e79-9e8g82g1f39a7a59e1g19-5e4d51d8d59g1f39b8d79-8g1f33g8f69e4e54f6d79c2c32c7c59f1d39-3f1d37c7c59c2c39b8c69e1g19a7a59-8f1d35c7c59d4c52d5e49d2e49f6e49d3e49d8d19e1d19e7c59d1e29b8d79-10e4d55d8d59d4c59b8d79-4e4e52f6d79c2c39b8c69e1g19-10g8e71g1f39-2C05.g8f64C06.e4e59f6d79c2c32c7c59f1d37b7b61-1b8c69g1e28c5d48c3d49d8b61d2f39f7f69e5f69d7f69e1g19f8d69-7f7f68e2f41c6d49d1h59e8e79e5f69d7f69f4g69h7g69h5h89-9e5f68d7f67d2f35f8d69e1g19d8c76c1g59e8g89g5h49-4e8g83c1f49d6f49e2f49-7e1g14f8d69d2f39d8c74c1g59e8g89-3e8g85c1f49d6f49e2f49-8d8f62d2f39h7h69e1g19f8d69-9d8b61d2f39c5d49c3d49f7f69e5f69d7f69e1g19f8d69b2b39e8g89-12g1f31d8b69e1g19-5f2f42b8c69d2f39c5d43c3d49-2d8b66a2a34-1g2g35c5d49c3d49f8b49e1f29-9g1f31b8c69-4f1d35b7b61-1c7c59c2c39b7b61g1e26c8a69d3a69b8a69e1g19-5g1h33c8a69d3a69b8a69-5b8c69d2f31c5d49c3d49-3g1e28a7a51e1g19-2c5d47c3d49d7b61e1g19c8d79-3d8b61d2f39f7f69e5f69d7f69e1g19f8d69b2b34e8g89c1f49-3e2c35e8g89-9f7f68e2f41c6d49d1h59e8e79e5f65d7f69f4g69h7g69h5h89-5f4g64h7g69e5f69d7f69h5h89-9e5f69d7f67d2f36d8c71e1g19f8d69-3f8d69c1f41-1e1g19d8c74c1g56";
c0_opn[89]="e8g89a1c13-1g5h46-3e2c33a7a69c1g59-4e8g85c1f47d6f49e2f49-3c1g52-5e1g13f8d69d2f39d8c75c1g56e8g89a1c15-1g5h45-3e2c31a7a69-2g2g31e8g89c1f49-4e8g84c1f47d6f49e2f49-3c1g52-6d8f62d2f39f8d61-1h7h68e1g19f8d69e2g39e8g89-11d8b62d2f39c5d48c3d49f7f68e5f69d7f69e1g19f8d69b2b33e8g89-2c1f41-1e2c35e8g89c1e39-8f8b41c1d29-4f7f61e5f69d7f69e1g19-4f8e71e1g19-4f7f61-1f8e71e1g19-3g1f31c5d42c3d49-2d8b64e1g19c5d49c3d49c6d49f3d49b6d49d2f39d4b69d1a49-10f8e72e1g19-4c5d41c3d49-5f2f41c7c59c2c38b8c69d2f39c5d43c3d49d8b67g2g39f8b49e1f29-4f7f52f1d39-4d8a51-1d8b65a2a31-1g1e22f7f69-2g2g34c5d49c3d49f8b49e1f29f7f64f2g29-2g7g55-6h2h41-3g1f31c5d49-3c5d41c3d49b8c69d2f39-5d2f31b8c69-2g1f31b8c69-4g1f31c7c59c2c39b8c69f1d39-6f6e41f1d39e4d29c1d29c7c59c2c39-6f6g81-2C05.f1d31c7c59c2c32b8c69g1f39-3e4e57f6d79c2c39b8c69g1e29c5d49c3d49f7f69e5f69d7f69d2f35f8d69e1g19-3e1g14f8d69d2f39-17C00.c1e31d5e49-2C01.e4d51e6d59b1c31c7c65-1g8f64-2c1f41f8d69f4d69d8d69-4c2c41c7c61b1c39-2f8b41b1c39g8e79-3g8f67b1c38c7c61-1f8b41-1f8e76f1d35-1g1f34e8g89-4g1f31f8e79-4d1f31-1f1d34b8c62c2c38f8d69d1f33c8e69-2g1e22g8e79-2g1f33c8g44e1g19-2g8e75-4g1f31-2c7c51c2c34b8c69-2d4c55f8c59g1f39-4f8d65b1c31-1c2c31c7c69-2d1f31-1g1e23g8e77c1f44-1e1g15e8g89c1f49-4g8f62-2g1f34c8g41-1g8e73e1g19e8g89-3g8f64e1g19e8g89c1g59c8g49-7g8f61c1f41-1g1e22-1g1f35f8d69e1g19e8g89-6g1f34b8c61c2c32f8d69-2f1b57f8d69c2c49d5c49d4d59a7a69b5a49b7b59d5c69b5a49e1g19g8e79d1a49e8g89b1d29a8b89-17c8f51-1c8g41f1e22-1h2h37g4h59d1e29d8e79c1e39b8c69b1c39-8f8d63b1c31-1c2c45c7c64b1c39g8e79f1d39-4d5c42f1c49g8f69e1g19e8g89-5g8f63b1c39e8g89c4d59-5f1d33b8c63-1g8e76e1g19-4g8f63c1g51f8e79f1d39-3c2c41f8b49-2f1d36c8g41-1f8d66e1g19e8g89c1g57c8g49b1d29b8d79c2c39c7c69d1c29d8c79-8h2h32-4f8e72e1g19e8g89-4f1e21-5C02.e4e51b7b61c2c36d8d79-2g1f33-2c7c59c2c39b8c67c1e31d8b69d1d29c5d49c3d49-5f2f41-1g1f39c5d41c3d49-2c8d74a2a33a8c81-1c5c43b1d25-1g2g35-2f7f64f1d39d8c79-3g8e71b2b49-3d4c51f8c59b2b44c5b69-2f1d35-3f1d31c5d46c3d49d8b69e1g19c6d49f3d49b6d49b1c39-8d8b63-2f1e25c5d41c3d49-2d8b61-1f7f62e1g19c5d43c3d49f6e59f3e59";
c0_opn[90]="-4f6e56f3e59c6e59d4e59d8c79c3c49-8g8e75b1a36c5d48c3d49e7f59a3c29c6b43-1d8b66e1g19a7a59-7e7g61-2e1g13e7f54-1e7g65-3g8h61-3d8b64a2a35a7a51f1d39c8d79d3c29-4c5c43b1d26c6a56f1e26c8d79e1g19g8e79-4g2g33c8d79h2h49-4c8d71-1f7f62f1e29-3f1e21-1g2g31c8d79-3c5d41c3d49g8e79-3c8d71b2b49c5d49c3d49a8c89c1b25-1c1e34-6g8h62b2b49c5d49c3d49h6f59c1b26c8d75g2g49-2f8e74-2c1e33c8d79-8f1d31c5d44c3d49c8d79e1g19c6d49f3d49b6d49b1c39a7a69d1e29g8e79-11c8d75d4c54f8c59e1g19-3e1g15c5d49c3d49c6d49f3d49b6d49b1c39-9f1e22c5d46c3d49g8e74b1a39e7f59a3c29-4g8h65b1c39h6f59c3a49b6a59-7c8d71e1g19-2g8h62c1h69g7h69d1d29-6g8e71a2a32-1b1a33c5d49c3d49e7f59a3c29-5f1d33c5d49c3d49e7f59d3f59e6f59b1c39-8g8h61a2a35-1f1d34c5d49-5c8d71g1f39b8c62-1d8b67a2a34-1f1e25-4d8b62a2a31b8c69g1f39-3g1f39b8c64a2a36c5c43b1d29c6a59f1e25c8d79-2g2g34-4c8d72b2b49c5d49c3d49a8c89c1e39-6g8h63b2b49c5d49c3d49h6f59c1b25c8d79-2c1e34-7f1d31c5d46c3d49c8d79-3c8d73-2f1e21c5d49c3d49g8h69-5c8d75a2a34a7a54f1e29a5a49e1g19b8c69-5c5d42c3d49d7b59f1b59b6b59b1c39b5a69-7d7b53c3c49-3f1d31d7b59e1g19-3f1e24b8c61e1g19-2c5d43c3d49d7b59b1c35-1e1g14b5e29d1e29-6d7b55c3c45b5c49e2c49d5c49d4d59-5e1g14b5e29d1e29-8g8e71g1f39e7c69-4d1g41c5d49g1f39b8c69f1d39-5d4c51b8c65g1f39f8c59f1d39-4f8c54-2g1f31b8c65f1d39c5d49e1g19f7f64-1g8e75c1f49e7g69f4g39-8c5d42f1d39b8c69e1g19-4d8b61-3g8e71-2C01.f1d31c7c53-1d5e46d3e49g8f69e4f39c7c59-7C00.d7d61-1g7g61-1g8e71-1C01.g8f61-2C00.e4e51d7d59-2f2f41d7d59e4e59c7c59g1f39b8c69-6g1f31b7b61-1c7c51d2d49c5d49f3d49-4d7d59b1c35d5d41c3e29c7c59c2c39-4d5e41c3e49-2f8b41-1g8f67e4e59f6d79d2d49c7c59d4c59b8c67c1f49d7c51-1f8c58f1d39f7f69e5f69d7f69e1g19e8g89f3e59-10f8c52f1d39b8c69c1f49-11e4d51e6d59d2d49f8d65f1d39-2g8f64-4e4e53c7c59b2b49b7b61-1c5b47a2a36b8c69a3b49f8b49c2c39b4e79d2d49f7f69-8d2d43b8c69a2a39-4c5c41-2d2d41-5g2g31d7d59-3B00.g7g51d2d49h7h69-3A40.g7g61b1c31c7c61-1d7d61-1f8g78d2d42d7d69-2f2f43c7c65-1d7d65g1f39-3g2g33c7c55f1g29b8c69d2d39-4d7d64f1g29-5c2c41f8g79-2d2d31f8g79-2B06.d2d49c7c51-1c7c61b1c36d7d57e4e53h7h59-2g1f32f8g79-2h2h33f8g79g1f39-4f8g72g1f39-3c2c41";
c0_opn[91]="-1f2f41d7d59e4e59-3g1f31d7d54-1f8g75-3d7d61b1c37c7c63c1e33g8f69-2f2f43d6d59e4e59h7h59-4g1f33f8g79-3f8g76c1e35a7a63d1d29-2c7c62d1d29-2g8f63d1d29-3f2f42g8f69g1f39e8g89-4g1f31g8f69-3g8f61-2c2c41f8g79-2f2f41f8g79-2g1f31f8g76-1g8f63b1c39f8g79-5f8g78b1c36a7a61-1c7c51d4c53d8a59-2d4d52d7d69g1f39-3g1f34c5d49f3d49b8c69c1e39-6c7c63c1e31d7d55d1d24-1e4e55-2d7d62d1d29b8d79-3d8b61a1b19-3f1c42b7b51c4b39-2d7d51e4d59b7b59c4b39b5b49c3e29c6d59-7d7d67d1f38e7e69g1e29b7b54c4b39a7a59a2a39c8a69-5b8d75-4g1f31g8f69-4f2f42d7d59e4e59g8h63f1e22-1g1f37f7f69-3h7h56c1e32g8h69g1f39c8g49-4g1f37c8g44-1g8h65c1e39c8g49-7d8b61g1f39d7d59-4g1f33d7d55e4e51-1h2h38d5e43c3e49b8d79-3g8f63e4e56f6e49c3e49d5e49f3g59c6c59-6f1d33d5e49c3e49f6e49d3e49-6g8h63f1d39-4d7d64a2a41g8f69-2c1e33g8f69-2f1c41-1f1e21g8f69-2h2h32g8f69-4g2g31-1h2h31d7d55g1f39-2d7d64-3d7d51e4d59g8f69f1c49b8d79-5d7d66c1e33a7a64a2a41b7b69-2d1d25b7b56a2a43b5b49c3d19a6a59-4f1d32b8d79-2f2f34b8d79-3b8d73f2f34b7b59-2g1f35b7b59-4f2f41b7b59f1e29-3g1f31b7b59-3b8d71d1d29-2c7c62a2a41-1d1d29b7b56f1d35b8d79g1f39-3f2f34b8d79-3b8d73g1f39-4g8f61d1d24c7c69-2f2f35c7c64d1d29-2e8g85d1d29-5c1g51a7a64-1c7c65d1d29b7b59-4f1c41b8c63-1g8f66d1e29-3f1e21g8f69-2f2f42a7a62a2a41-1g1f38b7b59f1d39b8d75e4e59-2c8b74-5b8c61c1e39g8f69f1e24-1g1f35-4b8d71g1f39-2c7c61g1f39c8g49c1e39d8b69d1d29g4f39g2f39-8e7e61g1f39-2g8f64g1f39c7c52d4c53d8a59f1d39a5c59d1e29-5f1b56c8d79e4e59f6g49e5e69-6e8g87c1e31-1f1d37b8a66e1g19c7c59d4d59c8g49-5b8c63e1g19-3f1e21-5g1e21g8f69g2g39e8g89f1g29-5g1f31a7a62a2a45-1c1e34b7b59-3b8d71-1c7c61-1c8g41-1g8f65c1e31-1f1e26e8g89e1g19c7c69a2a49-5h2h31e8g89c1e39-5g2g31b8c63c1e39-2g8f66f1g29e8g89g1e29e7e59h2h39-7h2h31-3c1e31c7c52-1d7d67b1c39-3c2c31c7c61-1d7d51e4d59d8d59-3d7d67c1g51g8f69-2f1c41-1f1d31-1f2f43g8f69e4e54-1f1d35-3g1f33g8f69f1d39e8g89e1g19b8c69-8c2c41b8c61-1c7c51d4d59d7d69b1c39-4d7d67b1c39b8c62c1e39e7e59d4d59-4b8d71-1e7e51-1g8f64f2f36e8g89c1e39-3g1f33e8g89f1e29-7f1c41d7d69g1f39-3f2f41c7c52-1c7c61-1d7d51e4e59-2d7d64g1f39g8f69-4g1f31c7c51c2c39-2c7c61b1c34d7d59-2c2c31-1c2c41";
c0_opn[92]="-1h2h31-2d7d68b1c32a7a62a2a49-2c7c61-1g8f66c1e31-1f1e26e8g89e1g19c7c69-4h2h31-3c1e31g8f69-2c2c31g8f69f1d39e8g89e1g19b8c69-6c2c41-1f1c42c7c62-1e7e61-1g8f65b1c33e8g89-2d1e26e8g89e1g19c8g49-6f1d31-1f1e21b8d71e1g19-2g8f68b1c39e8g89e1g19c7c69a2a49-7h2h31g8f69f1d39-5g2g31d7d69-3g8f61b1c39-3f1c41f8g79-2A40.f2f41d7d51-1f8g78g1f39-3g1f31f8g79d2d47d7d69-2f1c42-3g2g31f8g79f1g29-3h2h41d7d55-1h7h55-3B02.g8f61b1c31d7d57e4d54f6d59c3d52d8d59d2d46b8c69-2g1f33-3d2d41-1f1c45c7c61-1d5b64c4b39b8c69g1f39c8f59-5d5c31-1e7e62g1f39f8e79-4g1f31c8g49-4e4e55d5d43c3e22-1e5f68d4c39f6g79c3d29d1d29d8d29c1d29f8g79e1c19b8c69-11f6d73d2d45c7c54-1e7e65-2e5e61f7e69d2d49c7c59-4f2f42-2f6e43c3e29d5d46c2c39-2f7f63d2d39e4g59-7d7d61d2d49g7g69-3e7e51f1c41-1f2f41d7d59-2g1f36b8c69d2d45e5d49f3d49f8b49d4c69b7c69f1d39-7f1b54-4e7e61-2d2d31c7c51-1d7d53b1d29e7e59-3d7d61-1e7e53g1f39b8c69-4e4e57f6d59b1c31c7c61-1d5b61-1d5c36b2c35d7d54d2d49c7c59-3d7d65f2f49-3d2c34d7d69-3e7e61-2c2c41d5b69c4c53b6d59b1c35d5c32d2c39-2e7e67d2d49-3f1c44c7c62-1e7e67b1c36d5c39d2c39b8c69c1f49-5d2d43-5d2d46d7d69e5d66c7d66b1c39g7g69c1e39f8g79a1c19e8g89b2b39-8e7d63b1c39f8e79-4f2f43d6e59f4e59b8c67c1e39c8f59b1c39e7e69g1f39-6c7c52d4d59-9B03.d2d47d5b61-1d7d69c2c43d5b69e5d67c7d64b1c38b8c61-1g7g69c1e36f8g79a1c19e8g89b2b39b8c64d4d59c6e59f1e29-4e7e55d4e59d6e59d1d89f8d89c4c59b6d79-12f1d31f8g79g1e29-3g1f31f8g79-2h2h31f8g79g1f39e8g89-6g1f31g7g69-3e7d65b1c38b8c61c1e39-2f8e78c1e31e8g89-2d1f31-1f1d33b8c67g1e29c8g49-3e8g82-2f1e21e8g89-2g1f31-1h2h32e8g89g1f39-5f1d31-1g1f31f8e79f1e29-5f2f42c8f51b1c39-2d6e57f4e59b8c66c1e39c8f59b1c39e7e69f1e21-1g1f38d8d72-1f5g42-1f8e75d4d55e6d59c4d59c6b49f3d49-5f1e24e8g89e1g19f7f69-11c7c52d4d59e7e69b1c39e6d59c4d59c5c49-7c8f51b1c39e7e69-5g7g61-2g1f31c8g49-4e5d61c7d65-1e7d64-2f1c41d5b69c4b39d6e59d1h59e7e69d4e59-7f2f41d6e59f4e59-3B04.g1f36b8c61c2c49d5b69e5d65e7d69-2e5e64f7e69-5c7c61c2c44d5c79-2f1e25d6e59f3e59-4c8g44B05.c2c41d5b69-2B04.f1c41-1B05.f1e29b8c61c2c45d5b69e5d69-3e1g14-2c7c63c2c42d5b69b1d24-1e5d65e7d69e1g19f8e79-6e1g15g4f39e2f39d6e59";
c0_opn[93]="d4e59e7e69b1d23b8d79f1e19d8c79d2c49-5c2c41-1d1e24b8d79c2c49d5e79-10f3g51g4f59-3e7e65c2c41d5b69e1g13f8e79-2e5d66c7d69-4e1g17f8e79c2c46d5b69b1c36e8g89c1e39b8c69e5d69c7d69-6c1e31e8g89-2e5d61c7d69b1c39e8g89-4h2h31g4h59-4h2h33g4h59c2c49d5b69b1c37e8g89c1e39d6d59c4c59-5e5d62c7d69b1c39e8g89-10h2h31g4h59c2c44d5b69-2e1g15f8e79-6B04.h2h31-2d5b61a2a46a7a59f1b59c7c69-4f1e23g7g69-3d6e51f3e59b8d71e5f34-1e5f75e8f79d1h59f7e69-5c7c63f1c46b8d79e5f39-3f1e23-2g7g64f1c49c7c69e1g19f8g79f1e19e8g89c4b39-10g7g62c2c41d5b69e5d69c7d69-4f1c48c7c63e1g19f8g79e5d65d8d69-2f1e14-4d5b66c4b39f8g79a2a42a7a59f3g59-3d1e21-1e1g12e8g89-2f3g53d6d53-1e7e66d1f35-1f2f44-7f1e21f8g79e1g19e8g89-8B02.f1c41d5b69c4b39-3g1f31d7d69d2d49-3g2g31-2f6g81d2d49-3f1c41d7d64-1f6e45.A02.f2f41b7b61g1f39c8b79-3b8c61g1f39d7d54-1d7d65-3c7c51g1f39b8c65b2b32-1e2e32-1g2g34g7g69f1g29f8g79-5d7d51-1g7g62g2g39f8g79f1g29b8c69-5g8f61-3A03.d7d55b2b31b8c61-1c7c52-1c8g41-1g8f66c1b29g7g69-4d2d41g8f69-2e2e31c7c52-1g7g63-1g8f64g1f39-3g1f37b8c61e2e39-2c7c51e2e35b8c69-2g2g34b8c69f1g29-4c7c61-1c8f51-1c8g41e2e39-2e7e61-1g7g63e2e34f8g79d2d42-1f1e27g8f69e1g19e8g89-6g2g35f8g79f1g29g8f66e1g19e8g89d2d39-4g8h63-5g8f63b2b31-1e2e35c7c51-1c8g42-1e7e61-1g7g63b2b39f8g79c1b29e8g89-6g2g33g7g69f1g29f8g79e1g19e8g89d2d39c7c59-10g2g31g7g63-1g8f66-3A02.d7d61g1f39b8c62-1g7g64-1g8f62-3e7e51e2e41d7d53-1e5f46-2f4e58b8c61-1d7d69e5d67f8d69g1f39g7g59g2g39g5g49f3h49g8e79-8g1f32d6e59-5f7f51g1f39g8f69-3g7g61e2e41f8g79-2g1f39d7d51-1f8g78e2e31-1e2e42-1g2g35c7c59f1g29b8c69-6g2g31f8g79-3g8f61b2b31d7d54-1g7g65-2e2e31g7g69-2g1f38b7b61-1c7c51-1d7d51e2e39-2d7d61-1g7g66b2b32f8g79c1b29e8g89e2e39-5d2d31-1e2e31f8g79-2g2g34f8g79f1g29e8g89e1g19.A04.g1f31b7b51d2d41c8b79-2e2e31a7a69-2e2e44a7a62-1c8b77f1b59b7e49-4g2g32c8b79f1g29-4b7b61c2c41c8b79-2d2d41c8b79-2e2e42c8b79b1c39e7e69d2d49-5g2g35c7c51-1c8b79f1g29c7c52-1e7e64e1g19-2g7g62-5b8c61c2c41e7e59b1c39g8f69-4d2d46d7d58c1f43c8g49e2e39e7e69c2c49-5c2c43c8g49-2g2g32c8g49f1g29d8d79-5d7d61-2e2e41d7d62-1e7e57-2g2g31d7d52-1e7e57d2d39-4c7c51b2b31b7b61-1b8c62";
c0_opn[94]="c1b29d7d69-3d7d52e2e39g8f69c1b29-4d7d61-1g8f62c1b29e7e69e2e39-5c2c31b8c61-1d7d52-1g8f66d2d49-3c2c45b7b61b1c33c8b79e2e49-3g2g36c8b79f1g29g7g63-1g8f66e1g19-6b8c64b1c34c6d41e2e35d4f39d1f39g7g69b2b39f8g79c1b29d7d69-8f3g14-2e7e52e2e33g8f69-2g2g36g7g69f1g29f8g79a2a32-1d2d32-1e1g15g8e79-7e7e61-1g7g64e2e36d7d61d2d49-2f8g75d2d49c5d43e3d49d7d69-3d7d66d4d55-1f1e24-4g8f62d2d49c5d49e3d49d7d59c1g59-7g2g33f8g79f1g29d7d63e1g19-2e7e53-1e7e63e1g19g8e79-7g8f61d2d42c5d49f3d49-3e2e32-1g2g35d7d55-1g7g64-4b2b31-1d2d43c5d49f3d49e7e62b1c39g8f69-3g7g63e2e49f8g79c1e39g8f69b1c39e8g85f1e29d7d69e1g19-4f6g44d1g49c6d49g4d19-10g8f64b1c38e7e68a2a33-1d4b52-1g2g33d8b69-3g7g61-2g2g31-5e2e31-1g2g31e7e51-1g7g68f1g29f8g79b1c34-1e1g15e7e56b1c39g8e79-3e7e63-5g8f61-3d7d61-1e7e61b1c35-1g2g34-2g7g61b1c32f8g79d2d41-1e2e31-1g2g36b8c69f1g29d7d64-1e7e65-6d2d44c5d45f3d49b8c63e2e49g8f69b1c39d7d69-5f8g76e2e49b8c69c1e39g8f69b1c39e8g85f1e29-2f6g44d1g49c6d49g4d19-12f8g74d4d51-1e2e48c5d42f3d49-2d7d63-1d8a53-4e2e41f8g79d2d49c5d49f3d49b8c69c1e39g8f69b1c39-9g2g32f8g79f1g29b8c69b1c34d7d69-2e1g15e7e69-7g8f63b1c36b7b61e2e42-1g2g37c8b79f1g29e7e69e1g19f8e79-7b8c62d2d44c5d49f3d49e7e65-1g7g64-4g2g35d7d53-1g7g66f1g29f8g79-5d7d52c4d59f6d59d2d44c5d44d1d49d5c39d4c39-4d5c35b2c39g7g69-4e2e42-1g2g33b8c69f1g29d5c79-7e7e63e2e31-1g2g38b7b69f1g29c8b79e1g19d7d61-1f8e78d2d44c5d49d1d49d7d69-4f1e15d7d59c4d59-10g7g61d2d49c5d49f3d49-5d2d41c5d49f3d49-3g2g32b7b65f1g29c8b79e1g19e7e66b1c39f8e79-3g7g64b1c39f8g79d2d49c5d49d1d49-10b8c61f1g29-2d7d52c4d59f6d59f1g29b8c69-5g7g61f1g29f8g79e1g19e8g89-8d2d31b8c69-2d2d41c5d49-2e2e31b8c61-1d7d51-1d7d61-1g7g63d2d49f8g79-3g8f64b2b34-1d2d45-3e2e41b8c63d2d45c5d49f3d49g7g63-1g8f66b1c39-5f1b54g7g69e1g19f8g79-5d7d62d2d46c5d49f3d49g8f69b1c39a7a69-6f1b53-2e7e63b1c31-1c2c31-1d2d32b8c69-2d2d44c5d49f3d49a7a69-5g7g61-2g2g32b7b51-1b7b61f1g29c8b79c2c41-1e1g18g7g62-1g8f67c2c45e7e69b1c39-3d2d34-6b8c65c2c41g7g69f1g29f8g79-4d2d41c5d49f3d49g7g69f1g29f8g79d4b35-1d4c64b7c69-8f1g27d7d51e1g19-2e7e51d2d36g7g69-2e1g13-2g7g66c2c31f8g79d2d49";
c0_opn[95]="c5d49c3d49-5c2c41f8g79b1c39-3d2d31f8g79-2e1g17f8g79c2c31e7e59-2c2c42-1d2d33d7d64-1e7e55-2e2e41-4g8f61e1g19-4d7d51f1g29b8c69e1g19-4d7d61-1e7e61-1g7g61f1g29f8g79c2c41b8c69-2d2d41c5d49f3d49b8c69-4e1g17b8c69c2c44-1d2d35-6g8f61f1g29g7g69-5c7c61c2c44d7d59-2g2g35d7d59-3A06.d7d52b2b31b8c61-1c7c51c1b23b8c69-2e2e36b8c69c1b29-4c7c61c1b29-2c8f51c1b29e7e69-3c8g43c1b26b8d77e2e35-1g2g34-2g4f32-2e2e33b8d79c1b29-4e7e61-1g8f64c1b29c7c51e2e39-2c7c61-1c8f51-1c8g41-1e7e63e2e39f8e79-3g7g61c2c49-5b2b41g8f69-2A09.c2c42c7c64b2b32c8f51c1b29e7e69-3c8g43c1b29b8d79-3g8f64c1b25c8f59-2g2g34-3c4d51c6d59d2d49b8c64b1c39-2g8f65b1c39b8c69c1f49-7d1c21g8f69-2d2d42e7e62-1g8f67b1c35a7a61-1d5c43a2a49c8f59-3e7e64e2e39b8d79-4c4d51c6d59b1c39b8c69c1f49-5d1c21-1e2e31-3e2e33g8f69b1c37a7a62b2b39-2c8g41-1e7e64b2b33b8d79-2d2d46b8d79d1c25f8d69-2f1d34-4g7g61d2d49f8g79-4b2b31-1d1c21-1d2d41-3g2g31g8f69f1g29c8f59-5d5c41b1a33c7c59-2d1a41-1e2e34g8f69f1c49e7e69d2d44-1e1g15c7c59-7d5d41b2b42f7f64-1g7g65-2d2d31-1e2e32b8c67e3d49c6d49f3d49d8d49b1c39-6c7c52-2g2g33b8c64f1g29e7e59d2d35-1e1g14-4c7c52f1g29-2g7g63f1g29f8g79e1g19-6e7e63b2b31g8f69c1b25f8e79g2g39-3g2g34f8e79-4d2d42c7c51c4d59e6d59-3c7c61-1g8f66b1c37c7c63-1f8e76c1g59e8g89e2e39-5g2g32-3e2e31g8f69b1c34-1b2b35-3g2g34c7c51f1g29b8c69-3c7c61b2b39-2d5c41d1a49b8d79-3g8f66f1g29c7c51c4d59-2c7c61-1d5c41d1a49b8d79-3f8e76e1g19e8g89b2b34c7c59-2d2d45d5c49-9g8f61c4d55f6d59-2g2g34-3A06.d2d31b8c62-1c7c51-1c7c61-1g8f64b1d29-3d2d43b8c61c1f43c8g49-2c2c43c8g49-2g2g33-2c7c51c2c46d5c44e2e39-2e7e65c4d59e6d59-4d4c51e7e69-2e2e32-2c7c61c1f41-1c2c48d5c41e2e39-2e7e64b1c32d5c49-2d1c24g8f69-2e2e32g8f69-3g8f64b1c35a7a62-1d5c43a2a49c8f59-3e7e63c1g55-1e2e34b8d79-4c4d51c6d59b1c39b8c69c1f49-5d1c21-1e2e32c8f59-4e2e31-1g2g31-2c8f51c2c49e7e69b1c39c7c69d1b39d8b69c4c59-8c8g41f3e59-2e7e61c1f41-1c2c47c7c52c4d59e6d59b1c34b8c69-2g2g35b8c69f1g29-6c7c63b1c32-1d1c23-1e2e34g8f69-3d5c41e2e39-2g8f63b1c37f8e79-2g2g32-3e2e31-1g2g31c7c56f1g29b8c69-3g8f63f1g29-4g7g61-1g8f66c1f41c7c56c2c39-2e7e64e2e39-3c1g51f6e49-2c2c48c7c64b1c35";
c0_opn[96]="a7a62a2a43-1c4c56-2d5c43a2a49c8f59e2e35e7e69f1c49f8b49e1g19b8d74-1e8g85d1e29-7f3e53b8d75e5c49-2e7e64-2f3h41-4e7e63c1g54h7h69g5h49-3e2e35b8d79d1c26f8d69-2f1d33d5c49d3c49b7b59c4d39-9c4d51c6d59b1c39b8c69c1f49a7a63-1c8f54e2e39e7e69f1d39f5d39d1d39f8d69-7e7e62e2e39-7d1b31-1d1c21d5c49c2c49c8f59-4e2e32a7a61-1c8f53b1c39e7e69f3h49-4c8g41-1e7e63f1d39-4d5c41b1c32a7a69-2e2e37c8g41f1c49e7e69-3e7e68f1c49a7a63e1g19c7c59-3c7c56e1g19a7a69c4b34-1d4c55d8d19f1d19f8c59-11e7e64b1c36b8d71c1g56-1c4d53e6d59-3c7c51c4d59-2c7c62c1g53h7h69-2c4d52e6d59-2e2e34b8d79d1c25f8d69-2f1d34d5c49d3c49-6d5c41-1f8b41c1g59-2f8e74c1f43e8g89e2e39c7c59d4c59e7c59a2a35b8c69-2c4d55-7c1g55e8g84e2e39h7h69g5h49b7b69-5h7h65g5h49e8g89e2e39b7b69-6d1c21-3c1g51-1e2e31-1g2g32d5c44d1a43-1f1g26b8c69-3f8b41c1d29b4e79f1g29e8g89e1g19-6f8e74f1g29e8g89e1g19d5c49d1c29a7a69-10e2e31e7e69-2g2g31c7c69f1g29-5e2e31c7c51-1c7c61-1c8g41-1e7e61-1g7g61-1g8f67b2b33c8g49c1b29-3c2c46c7c65b1c39-2e7e64b2b39-5A07.g2g33b8c61d2d46c8f53f1g29-2c8g46f1g29d8d79h2h39-5f1g23e7e59d2d39g8f69e1g19f8e79-7b8d71-1A08.c7c51c2c41-1f1g29b8c69c2c41-1d2d31-1d2d44e7e65e1g19g8f69c2c49f8e79-5g8f64e1g19e7e69c2c49-5e1g13e7e55d2d39g8f69-3g8f64d2d39-4g8f61e1g19-4A07.c7c62b2b31c8g49f1g29b8d79c1b29-5f1g29c8f51e1g19-2c8g47b2b31b8d79c1b29e7e63-1g8f66e1g19e7e69d2d39-7c2c41e7e69c4d55e6d55-1g4f34g2f39-3e1g14b8d79-4d2d31b8d79b1d26-1e1g13-3d2d41b8d79-2e1g14b8d79d2d36e7e51-1e7e63b1d29f8d69-3g8f64b1d29e7e59e2e49-5d2d43e7e66b1d29g8f69f1e19f8e79e2e49d5e49d2e49-8g8f63b1d29e7e69-7g8f62d2d31-1e1g18c8f54d2d39e7e69-3c8g45d2d39b8d79b1d29-8c8f51f1g29-2c8g41f1g29b8d78c2c44e7e69b2b32-1c4d57e6d59e1g19c7c69-6d2d31c7c64-1e7e65-2d2d41e7e69e1g19-3e1g13c7c64d2d39-2e7e62d2d39-2g8f62-3c7c61e1g19b8d79-5e7e61f1g29g8f69e1g19f8e79-5g7g61c2c41-1f1g29f8g79c2c41-1d2d43g8f69c2c43-1e1g16e8g89c2c49-5e1g15e7e56d2d39g8e79b1d24e8g89-2e2e45e8g89-5g8f63d2d39e8g89b1d29-8g8f63f1g29b8c61-1b8d71-1c7c51e1g19b8c69d2d34-1d2d45e7e69c2c49-6c7c63b2b31c8f55-1c8g44-2c2c41-1d2d31-1e1g17c8f54d2d39e7e65b1d29-2h7h64b1d29-4c8g45b2b32b8d79";
c0_opn[97]="c1b29e7e69-4c2c41-1d2d34b8d79b1d29e7e59-4d2d42-4c8f51c2c42c7c69-2d2d32e7e69-2e1g15e7e69d2d39f8e74-1h7h65-5c8g41c2c44c7c69-2e1g15-2e7e62d2d41-1e1g19c7c51-1f8e78c2c42e8g89d2d49-3d2d34c7c53b1d29b8c69e2e49-4e8g86b1d29c7c59e2e49b8c69f1e19-7d2d42e8g89c2c49d5c49-7g7g61c2c42c7c69-2d2d41-1e1g15f8g79d2d35e8g89b1d29-3d2d44e8g89c2c49-10A04.d7d61c2c41c8g41-1e7e54b1c39f7f59-3f7f51-1g7g62-1g8f61-2d2d47b8d71-1c8g43b1d21-1c2c44b8d76b1c39e7e59-3g4f33e2f39-3e2e31-1e2e43g8f69b1c39e7e69h2h39g4h59-6g2g31g4f39e2f39-4f7f51g2g39g8f69f1g29g7g69-5g7g61c2c44f8g79b1c39g8f69-4e2e42f8g79-2g2g33f8g79f1g29g8f69e1g19e8g89-7g8f63b1c31-1c2c45g7g69b1c39f8g79e2e49e8g89f1e29e7e59e1g19-9g2g33g7g69f1g29f8g79e1g19e8g89c2c49-9e2e41c7c52-1e7e51-1g7g61-1g8f65b1c39-3g2g31c8g41-1e7e55d2d35-1f1g24-2f7f51-1g7g62f1g29f8g79e1g19-4g8f61-3e7e61b2b31d7d52-1f7f54-1g8f64-2c2c44b7b61g2g39c8b79f1g29f7f59e1g19g8f69-7c7c51-1d7d52d2d47g8f69-2g2g32-2f7f52g2g39g8f69f1g29d7d54e1g19-2f8e75e1g19e8g89-7g8f62b1c35-1g2g34-3d2d31d7d59-2d2d41c7c51-1d7d51-1f7f53-1g8f63-2e2e41c7c52-1d7d57-2g2g33b7b51f1g29c8b79-3b7b61f1g29c8b79e1g19-4c7c51-1d7d52f1g29c7c55-1g8f64e1g19-4f7f52f1g29g8f69e1g19f8e79-5g8f61f1g29d7d59-5f7f51b2b31d7d65d2d49g8f69c1b29-4g8f64c1b29e7e69-4c2c41g7g61-1g8f69b1c33g7g69-2g2g36e7e62f1g29-2g7g67f1g29f8g79e1g19e8g89b1c39d7d69d2d49-11A06.d2d31d7d64e2e49e7e59-3g8f65e2e49-3A04.d2d42e7e61-1g7g61g2g39-2g8f68c1g51e7e69b1d29-3c2c42e7e63-1g7g66b1c39f8g79-4g2g35e7e62f1g29d7d59-3g7g67f1g29f8g79e1g19e8g89c2c49d7d69b1c39-11e2e41f5e49f3g59d7d52d2d39d8d69-3g8f67d2d39e4e39c1e39-7g2g33b7b61-1d7d61-1g7g61f1g29f8g79-3g8f69f1g29d7d61d2d49g7g69-3e7e61e1g19f8e79c2c49e8g89-5g7g66b2b31f8g79c1b29e8g89-4c2c41f8g79b1c39-3d2d41f8g79-2e1g16f8g79c2c44e8g89b1c39d7d69d2d49-5d2d45e8g89c2c49d7d69b1c39-12g7g61c2c42c7c51-1d7d61-1f7f51-1f8g79b1c33c7c53g2g39b8c69f1g29e7e69-5d7d64d2d46g8f69-2g2g33-2e7e51-1g8f61-2d2d44c7c52e2e49-2d7d64b1c37b8d75-1g8f64-2g2g32-2g8f63b1c35e8g89e2e49d7d69f1e29-5g2g34e8g89f1g29d7d69-6e2e41d7d69d2d49-3g2g31e7e55-1g8f64f1g29-4g8f61-2d2d43";
c0_opn[98]="c7c51-1d7d61-1f7f51-1f8g77c2c31-1c2c44c7c52e2e49-2d7d65b1c37b8d73-1c8g43-1g8f63-2g2g32-2g8f62b1c35-1g2g34-3e2e31-1e2e42c7c51-1d7d68b1c36g8f69-2c2c33g8f69-4g2g31c7c52-1d7d63f1g29-2g8f63f1g29e8g89-5g8f61c2c47f8g79b1c36e8g89-2g2g33-3g2g32f8g79f1g29e8g89e1g19-7e2e41c7c52d2d49c5d49-3d7d51-1d7d61d2d49g8f69b1c39f8g79f1e29e8g89e1g19-8f8g76d2d49c7c51-1c7c61-1d7d68b1c34g8f69-2c2c32g8f69f1d39e8g89e1g19-5f1c41-1f1e21g8f69b1c39-7g2g32f8g79c2c41-1d2d42c7c52-1d7d62f1g29-2g8f64f1g29e8g89e1g19d7d69c2c49-7f1g26c7c52c2c43b8c69-2e1g16b8c69-3d7d62d2d44-1e1g15-2e7e54d2d36d7d55e1g19g8e79-3d7d64-2e1g11-1e2e41-2g8f61e1g19e8g89-5g8f61-3A05.g8f64b2b31b7b61c1b29c8b79-3c7c51c1b29-2d7d52c1b29c7c51e2e39-2c8f52-1c8g42e2e39-2e7e63e2e39-4d7d61c1b23e7e59-2d2d46g7g69c1b29f8g79-5e7e61c1b29-2g7g65c1b29f8g79c2c41e8g89g2g39-3e2e32e8g89f1e29d7d69-4g2g35c7c51-1d7d61d2d49-2e8g86f1g29d7d52-1d7d67d2d49-9b2b41d7d51-1e7e63-1g7g65-2c2c31g7g69-2c2c45b7b61b1c31c8b79d2d49e7e69a2a39d7d59c1g54f8e79-2c4d55f6d59-8d2d41e7e69e2e33-1g2g36c8a69-4g2g37c7c53f1g29c8b79e1g19e7e62b1c39f8e79-3g7g67b1c35f8g79d2d49c5d49d1d49d7d69f1d19b8d79-8b2b32f8g79c1b29e8g89b1c39-5d2d42c5d49d1d49f8g79b1c39-10c8b76f1g29c7c52e1g19e7e63b1c39-2g7g66b1c39f8g79-5e7e67e1g19f8e79b1c35e8g89d2d42-1f1e17d7d59c4d59e6d59d2d49-7b2b32e8g89c1b29-3d2d42e8g89b1c39f6e49-9e7e61f1g29-4b8c61d2d49e7e69-3c7c51b1c36b7b61e2e43d7d69d2d49c5d49f3d49c8b79-6g2g36c8b79f1g29e7e65e1g19f8e79-3g7g64e1g19f8g79-7b8c63d2d43c5d49f3d49e7e65g2g39d8b69-3g7g64e2e49d7d69f1e29f8g79c1e39e8g89e1g19-11e2e31e7e69d2d49d7d59-4g2g35d7d53c4d54f6d59f1g29d5c79-4d2d45e7e69c4d59f6d59f1g29-6g7g66f1g29f8g79d2d42c5d49f3d49e8g89e1g19-5e1g17e8g89d2d33-1d2d47c5d49f3d49c6d49d1d49d7d69-13d7d51c4d59f6d59d2d44d5c39b2c39g7g69e2e35f8g79-2e2e44f8g79-6e2e42d5b49f1c49-3g2g33b8c69f1g29d5c79e1g19e7e59-9e7e62d2d41c5d49f3d49-3e2e31d7d59-2e2e41-1g2g36b7b69f1g29c8b79e1g19a7a62-1f8e77d2d44c5d49d1d49d7d69-4f1e15d7d69e2e49-10g7g61d2d44c5d49f3d49b8c64-1f8g75e2e49d7d69-6e2e42d7d69d2d49c5d49f3d49-5g2g32f8g79f1g29-5b2b31-1d2d41c5d49";
c0_opn[99]="f3d49e7e69-4e2e31-1g2g32b7b63f1g29c8b79e1g19e7e66b1c39f8e79d2d46c5d49d1d49d7d69-4f1e13-4g7g63b2b39f8g79c1b29e8g89b1c39-10b8c62f1g29d7d55c4d59f6d59-3g7g64-3d7d51c4d59f6d59f1g29b8c69b1c39-6g7g62f1g29f8g79b1c33-1e1g16e8g89b1c36b8c69-2d2d43-8c7c61b1c33d7d59c4d51c6d59d2d49b8c69-4d2d43d5c49a2a49c8f59-4e2e35a7a62-1e7e64-1g7g63d2d49f8g79-6b2b31d7d59c1b29c8g49-4d2d44d7d59b1c33d5c44a2a49c8f59-3e7e65-2c4d51c6d59b1c39b8c69c1f49c8f59e2e39e7e69-8d1c21-1e2e33c8f55b1c39e7e69-3e7e64-4e2e31d7d59-2g2g31d7d59f1g29-4d7d51c4d59f6d59-3d7d61b1c31-1d2d47b8d74b1c39e7e59e2e49f8e79f1e29e8g89e1g19c7c69-9c8g41-1g7g64b1c36f8g79e2e49e8g89f1e29-5g2g33f8g79f1g29e8g89e1g19-7g2g31g7g69f1g29f8g79-5e7e62b1c33b7b61e2e43c8b79-2g2g36c8b79f1g29f8e79e1g19e8g89-7c7c51g2g39b7b67f1g29c8b79e1g19f8e79d2d44c5d49d1d49-3f1e15-6b8c62f1g29-4d7d54c4d51e6d59d2d49-3d2d49b8d71c1g55-1c4d54e6d59-3c7c51c4d59-2c7c61c1g53-1e2e36b8d79d1c29f8d69-5d5c41e2e35-1e2e44f8b49-3f8b41c1g54-1c4d55e6d59c1g59-4f8e74c1f43e8g89e2e39c7c59d4c59e7c59-6c1g56e8g85e2e39b8d73-1h7h66g5h49b7b69-5h7h64g5h49e8g89e2e39b7b69-8e2e31-2f8b43d1b31c7c59g2g39-3d1c26b7b61-1c7c52a2a39b4a59-3e8g86a2a39b4c39c2c39b7b68b2b44c8b79c1b29d7d69-4e2e32c8b79f1e29-3g2g33c8b79f1g29d7d69-5d7d61-6g2g31e8g89f1g29d7d59a2a39-5g2g41h7h69h1g19-5b2b31b7b63-1d7d56c1b29-3d2d41b7b63a2a32-1b1c32-1g2g35c8a65-1c8b74f1g29f8e79e1g19e8g89-7c7c51-1d7d53b1c39c7c64-1f8e75c1g59-4f8b42c1d29d8e79g2g39-5e2e31-1g2g34a7a61f1g29b7b59b2b39c7c56e1g19c8b79-3c8b73-5b7b63f1g29c8b79b1c31-1d2d41f8e79-2e1g18c7c53b1c39f8e79d2d44c5d49d1d49-3f1e15-4f8e76b1c35e8g89d2d43f6e49-2f1e16d7d59c4d59e6d59d2d49-7b2b31e8g89c1b29d7d59-4d2d42e8g89b1c39f6e49-9c7c51f1g29b8c69e1g19-4d7d55b2b31c7c53f1g29b8c69e1g19-4f8e76f1g29e8g89e1g19c7c59-6d2d42d5c43d1a43-1f1g26b8c69-3f8b41c1d29b4e79f1g29-4f8e74f1g29e8g89e1g19d5c49d1c29a7a69c2c49b7b59c4c29c8b79-12f1g26c7c51-1c7c61-1d5c42d1a49b8d75a4c49c7c59-3c7c63a4c49b7b59c4c29c8b79-5c8d71a4c49-4f8e75d2d41e8g89e1g19-3e1g18e8g89b2b34c7c59c1b29b8c69-4d2d45c7c63d1c29-2d5c46d1c29a7a69a2a49-10f8e71f1g29";
c0_opn[100]="e8g89e1g19-6g7g63b1c35c7c51d2d43c5d49f3d49-3e2e42-1g2g33f8g79-3d7d52c4d56f6d59d1a44b8c61f3e59-2c7c61-1c8d77a4h49d5c39d2c39b8c69e2e49e7e59c1g59f8e79f1c49-11d1b31d5b69d2d49f8g79c1g59-5e2e43d5c39d2c39d8d19e1d19b8d72-1f7f65c1e39e7e59f3d29-4f8g72-6g2g31f8g79f1g29-5d1a42c7c61c4d59f6d59-3c8d78a4b39d5c49b3c49a7a62-1f8g77e2e49e8g89e4e59f6g49d2d49-11d2d41f8g79-3f8g77d2d41d7d51-1d7d62e2e49e8g89f1e29e7e59-5e8g86c1g52d7d69-2e2e46d7d69f1e29e7e59e1g19b8c69d4d59c6e79-8g2g31-3e2e47c7c51d2d49c5d49f3d49b8c66c1e39-2d7d63f1e29-6d7d68d2d49e8g89c1e31-1f1e28b8a61e1g19e7e59c1e39f6g49e3g59d8e89-7b8d71e1g19e7e59c1e39-4c7c51e1g19c5d49f3d49b8c69c1e39-6c8g41c1e39-2e7e58c1e31b8a62-1e5d42f3d49f8e89f2f39-4f6g44e3g59f7f69g5h49-5d4d51a7a59c1g59h7h69g5h49b8a69f3d29d8e89-8d4e51d6e59d1d89f8d89c1g59d8e89c3d59f6d59c4d59c7c69e2c49-11e1g16b8a61c1e35f6g49e3g59d8e89d4e59-5f1e14-2b8c66c1e31-1d4d59c6e79b2b45a7a53c1a39a5b49a3b49-4f6h56f1e19f7f59f3g59h5f69e2f39-7f3d21a7a59-2f3e12f6d79c1e36f7f59f2f39f5f49e3f29g6g59-6e1d33f7f59-7b8d71c1e39-2e5d41f3d49f8e89f2f39b8c69c1e39f6h59-10h2h31e7e59d4d59b8a69-7e7e51-1e8g81d2d49c7c61-1d7d68f1e29e7e59e1g19b8c69d4d59c6e79-10g2g31d7d61-1e8g88f1g29d7d51-1d7d68d2d43b8d79e1g19e7e59-4e1g16b8c63-1e7e56d2d39b8c69-10b2b31f8g79c1b29d7d61-1e8g88g2g39d7d69d2d45-1f1g24e7e59-8b2b41f8g79c1b29e8g89e2e35d7d69-2g2g34d7d69f1g29e7e59-8d2d41f8g79b1c33e8g89e2e49d7d69f1e29e7e59-6g2g36e8g89f1g29d7d69b1c33b8c69e1g19-3e1g16b8c63-1b8d76b1c39e7e59e2e49-11g2g32f8g79f1g29c7c61-1d7d51c4d59f6d59-3d7d61d2d49e8g89e1g19-4e8g88b1c31d7d69e1g19-3d2d42d7d51c4d59f6d59e1g19-4d7d68b1c34b8c69e1g19a7a69-4e1g15b8c64b1c39-2b8d75b1c39e7e59-6e1g17c7c51b1c35-1d2d44-2c7c61d2d49d7d56-1d7d63-3d7d51c4d57f6d59b1c36-1d2d43-3d2d42-2d7d67b1c34b8c63a1b13-1d2d33-1d2d43-2c7c51-1c7c61-1e7e54d2d35b8c69a1b19a7a59-4d2d44b8d79-4d2d45b8c63b1c38a7a69-2d4d51c6a59-3b8d74b1c39e7e59e2e49c7c65-1e5d44f3d49f8e89-7c7c61b1c39d8a59-12d2d31d7d56-1g7g63-2d2d41b7b51-1b7b61-1c7c51c2c32-1c2c41-1d4d53b7b55-1e7e64-2e2e32-2d7d51c1f41e7e69-2c1g51-1c2c46c7c64b1c34";
c0_opn[101]="d5c49-2c4d52c6d59b1c39b8c69c1f49-5e2e32-2d5c41-1e7e64b1c39f8e79-4e2e31-1g2g31-2d7d61c2c46g7g69b1c39f8g79-4g2g33-2e7e62c1f41-1c1g51c7c59e2e39-3c2c44b7b65a2a32-1b1c31-1g2g35c8a64-1c8b75f1g29f8e79-5c7c51-1d7d51b1c39-2f8b42c1d29d8e79-4e2e31b7b66f1d39c8b79e1g19-4c7c53-2g2g32b7b51-1b7b63f1g29c8b79e1g19f8e79c2c49e8g89-7c7c51-1d7d52f1g29f8e79e1g19-6g7g64b1c31d7d59c1f49f8g79e2e39-5b1d21-1c1f41f8g79e2e39d7d64-1e8g85-4c1g51f8g79b1d29d7d53e2e39-2e8g86c2c39-5c2c31f8g79-2c2c43f8g79b1c38d7d51-1d7d61e2e49e8g89f1e29-4e8g86e2e48d7d69f1e29e7e59e1g19b8c69d4d59c6e79-8g2g31-3g2g31e8g89f1g29d7d69e1g19-7g2g32f8g79f1g29e8g89e1g19d7d53c2c49-2d7d66c2c49-9e2e31b7b61-1c7c51-1d7d51-1g7g65-2g2g32b7b51f1g29c8b79d2d31-1e1g18c7c51-1e7e68b2b32f8e79-2d2d37d7d54-1f8e75e2e49d7d69-9b7b61f1g29c8b79c2c41c7c55e1g19-2e7e64e1g19f8e79-4d2d31-1e1g18c7c53c2c46e7e64b1c39f8e79-3g7g65b1c35f8g79-2b2b34f8g79c1b29e8g89-6d2d33g7g69-3e7e65b2b31f8e79c1b29-3c2c44c7c53b1c39f8e79-3f8e76b1c39e8g89-4d2d34d7d59b1d29f8e79e2e49-6g7g61d2d39-6b8c61-1c7c51c2c41b8c69-2f1g28b8c66d2d41-1e1g18d7d53-1e7e53-1g7g63-3d7d51e1g19-2g7g61e1g19f8g79-5c7c61-1d7d52c2c41c7c65b2b39-2e7e64f1g29-3d2d41-1f1g29c7c51e1g19b8c69d2d35-1d2d44e7e69c2c49-6c7c64b2b31c8f53c1b29-2c8g46c1b29b8d79-4c2c41-1d2d31c8f53-1c8g46b1d29b8d79-4e1g17c8f52b2b32-1d2d37e7e66b1d29-2h7h63-3c8g47b2b32b8d79c1b29e7e69d2d39-5c2c41e7e69-2d2d34b8d78b1d29e7e56e2e49d5e49-3e7e63-3e7e61-2d2d42b8d75b1d29e7e69-3e7e64b1d29-6c8f51c2c42-1d2d32e7e69-2e1g15e7e69d2d39-4c8g41c2c45c7c69-2e1g14-2e7e61c2c41-1e1g18c7c51-1f8e78c2c42e8g89-2d2d35c7c54b1d29-2e8g85b1d29-3d2d41e8g89-5g7g61c2c42-1e1g17f8g79d2d36e8g89b1d29-3d2d43e8g89-7d7d61d2d45b8d79-2f1g24e7e59d2d39-4e7e61f1g29d7d58e1g19f8e79d2d39-4f8e71-3g7g65b2b31f8g79c1b29c7c51c2c49-2d7d51-1d7d62d2d49c7c54-1e8g85f1g29-4e8g86f1g29c7c51c2c49b8c69e1g19d7d69d2d49c5d49f3d49-8d7d51c2c49c7c69e1g19-4d7d66d2d49b8d73e1g19e7e59d4e59f6g49-5c7c52-1c7c61e1g19-2e7e52d4e59f6d75-1f6g44-10b2b41f8g79c1b29e8g89f1g29d7d69e1g19e7e59-8c2c41f8g79d2d42-1f1g27e8g89d2d44-1e1g15-5d2d41";
c0_opn[102]="f8g79-2f1g27f8g79c2c41c7c51-1d7d61-1e8g87b1c32d7d69-2d2d42d7d69-2e1g14d7d69b1c34-1d2d45-5d2d31d7d53-1e8g86-2d2d41d7d52-1e8g87c2c43d7d69-2e1g16d7d69-4e1g18c7c51-1d7d51c2c45-1d2d45e8g89-3d7d61d2d49e8g89-3e8g89c2c43c7c52b1c37b8c69d2d33-1d2d46c5d49f3d49c6d49d1d49d7d69-8d2d42-2c7c61b1c33-1d2d46d7d59c4d59c6d59-5d7d51c4d59f6d59b1c35-1d2d44-4d7d65b1c36b8c63d2d39-2c7c61-1e7e55d2d36b8c69a1b19a7a59a2a39-5d2d43-3d2d43b8c63b1c39a7a69-3b8d73b1c39e7e59-3c7c62b1c39-5d2d33c7c51e2e49b8c66-1d7d63-3d7d53b1d28b8c63e2e49e7e59-3c7c56e2e49b8c69f1e19-5c2c31-2d7d64b1d21-1c2c42e7e59b1c39b8c69-4e2e46c7c55b1d29b8c69-3e7e54b1d29-5d2d43c7c61-1d7d53c2c49c7c67c4d59c6d59b1c39b8c69-5d5c42-3d7d66a2a41-1b1c31-1b2b31-1c2c45b8c63b1c39-2b8d75b1c39e7e59e2e49-4c7c61b1c39-3f1e11.A00.g1h31d7d59g2g39g8f69.g2g31c7c51c2c41b8c66f1g29g7g69b1c39f8g79-5g7g63-2f1g28b8c66c2c43g7g69b1c39f8g79g1f39-5d2d31g7g69-2e2e42g7g69-2g1f31g7g69-3d7d51-1g7g62c2c45f8g79b1c39b8c69-4e2e44f8g79-3g8f61-3d7d53c2c41c7c69-2f1g26b8c61-1c7c51g1f39-2c7c63c2c41-1d2d33c8g42-1e7e52-1g8f64b1d29-3g1f35c8g46b2b39b8d79c1b29-4g8f63e1g19-4e7e51c2c43-1d2d36g8f69g1f39-4e7e61-1g7g61-1g8f63c2c41-1d2d35c7c65b1d29-2e7e52g1f39-2g7g62-2g1f34c7c66e1g19c8g49-3e7e63e1g19-5g1f33b8c61-1c7c51f1g29b8c69-3c7c62f1g29c8g47e1g19b8d79-3g8f62-3c8g41f1g29b8d79-3e7e61-1g7g61c2c49-2g8f63f1g29c7c64e1g19c8g49-3e7e63e1g19f8e79-3g7g62-5d7d61f1g29e7e59-3e7e51c2c43b8c62f1g29-2c7c61-1d7d61-1g7g61-1g8f64f1g29c7c65d2d49-2d7d54c4d59f6d59-6f1g26b8c62c2c46-1d2d33-2d7d54c2c43-1d2d35g8f69g1f39-3g1f31-2d7d61-1f7f51-1g7g61-1g8f61c2c44-1d2d35d7d59-5e7e61f1g29d7d56-1g8f63-3f7f51c2c41g8f69-2d2d41g8f69-2f1g27g8f69c2c45-1d2d34-4g7g61c2c41f8g79-2f1g29d7d51-1f8g79c2c43c7c53b1c39b8c69-3d7d61b1c39-2e7e52b1c39-2g8f62b1c39e8g89-4d2d31-1d2d42c7c51-1d7d52g1f39g8f69-3d7d63e2e49-2g8f62e2e49d7d69-4e2e42c7c56d2d35b8c69f2f49-3g1e24b8c69-3d7d62-1e7e51-2f2f41-1g1f31c7c54-1g8f65e1g19e8g89-7g8f61c2c41e7e64-1g7g65-2f1g29c7c51-1d7d54c2c41-1d2d32c7c69-2g1f36c7c62e1g19-2e7e63e1g19f8e79-3g7g63e1g19f8g79-5d7d61-1e7e51c2c45";
c0_opn[103]="-1d2d34-2e7e61-1g7g63c2c42f8g79b1c39e8g89-4d2d41f8g79e2e49d7d69-4e2e45d7d69d2d49f8g79b1c34e8g89g1e29-3g1e25e8g89e1g19-7g1f31f8g79e1g19e8g89-6g1f31d7d59.g2g41d7d58f1g29c7c63-1c8g43c2c49-2e7e52-3e7e51f1g29d7d59";


function c0_Opening(c0_fmoves:String):String
{
var c0_retdata="";

var c0_mvs="";
var c0_s="";
var c0_c="";

var c0_ECO="";
var c0_kf="";

var c0_i=0;
var c0_j=0;

var c0_pt=0;
var c0_nm=0;


var c0_NMoves="";
var c0_OName="";
var c0_op="";

for(c0_i=1; c0_i<c0_opn.length; c0_i++)
	{
	c0_s=c0_opn[ c0_i ];
	for(c0_j=0; c0_j<c0_s.length;)
		{
		c0_c=c0_s.Substring(c0_j, 1 );		// Looking for special symbols or type of information...
		if(c0_c=="-")				// Other variant...
			{
			c0_j++;
			for(c0_nm=0; c0_j+c0_nm<c0_s.length &&
				("0123456789").IndexOf(c0_s.Substring(c0_j+c0_nm,1))>=0; c0_nm++);

							// Next value is length for moves to shorten...
			c0_mvs=c0_mvs.Substring(0, c0_mvs.length- (4*parseInt( c0_s.Substring(c0_j,c0_nm) )) );
			c0_j+=c0_nm;
			}
		else if(c0_c==".")			// Will be other opening or variant...
			{
			c0_j++;
			c0_mvs="";
			}
		else if(("abcdefgh").IndexOf(c0_c)>=0)	// If it is a chess move...
			{
			c0_mvs+=c0_s.Substring(c0_j,4);
			c0_j+=4;
			}
		else if(("0123456789").IndexOf(c0_c)>=0)	// If it is a coefficient (for best move searches)...
			{
			c0_kf=c0_c;
			if((c0_mvs.length>c0_fmoves.length) && (c0_mvs.Substring(0,c0_fmoves.length)==c0_fmoves))
				{
				c0_next= c0_mvs.Substring(c0_fmoves.length,4);

				if(c0_NMoves.IndexOf(c0_next)<0) c0_NMoves+=c0_next+" ("+c0_kf+") ";
				}
			c0_j++;
			}
		else					// Opening information... ECO code and name (Main name for x00)
			{
			c0_ECO=c0_s.Substring(c0_j,3);
			c0_j+=3;
			for(c0_pt=0; c0_s.Substring(c0_j+c0_pt,1)!="."; c0_pt++);

			if((c0_mvs.length<=c0_fmoves.length) && (c0_fmoves.Substring(0,c0_mvs.length)==c0_mvs))
				{
				if(c0_mvs.length>c0_op.length && c0_op.length<c0_fmoves.length)
					{
					c0_op=c0_mvs;
					c0_OName="ECO "+c0_ECO;
					}
				}

			c0_j+=(c0_pt+1);
			}
		}
	}
					// Sorting by coeff. descending
for(c0_i=1;c0_i<10;c0_i++)
	{
	for(c0_j=6;c0_j<c0_NMoves.length-9;)
		{
		c0_j+=9;
		if( parseInt( c0_NMoves.Substring(c0_j,1) )==c0_i  &&
				parseInt( c0_NMoves.Substring(c0_j,1) ) >= parseInt( c0_NMoves.Substring(6,1) ) )
			{
			c0_NMoves=c0_NMoves.Substring(c0_j-6,9)+c0_NMoves.Substring(0,c0_j-6)+c0_NMoves.Substring(c0_j-6+9);
			}
		}
	}

if( c0_NMoves.length>0 ) c0_retdata=c0_NMoves + c0_OName;

return c0_retdata;
}

function LookBookMove():void
{
	var mc1 = Js_nGameMoves;
	var opns = (opnmv == "**" ? "" : c0_Opening(opnmv)); 
	
	if(opns.length>0)
    {
		var o2 = "abcdefgh";

		var j=0;
		var mv=opns.Substring(j,4);
		for(var t =1+GetRnd(3); t>0; t--)
		{
		for(;t>=0;)
		{
		if (o2.IndexOf( opns.Substring(j,1) ) >= 0 && o2.IndexOf( opns.Substring(j+2,1) ) >= 0 )
			{
			mv = opns.Substring(j, 4);
			t--;
			}
		j++;
		if(j>opns.length-3)
			{
			j=0; t--;
			if(t<0) mv=opns.Substring(j,4);
			}
		}
		}
		
		EnterMove(mv.Substring(0,2), mv.Substring(2,2), "");
	}
	
	if (Js_nGameMoves == mc1)
		{
		ComputerMvt();
		}
		
}
	//-----------------------------------------
	// SAMPLES...
	//-----------------------------------------

	// moves entering
	function autosample1():void
	{
	EnterMove("e2","e4","");
	EnterMove("c7","c5","");
	EnterMove("f1","e2","");
	EnterMove("c5","c4","");
	EnterMove("b2","b4","");
	EnterMove("c4","b3","");
	EnterMove("g1","f3","");
	EnterMove("b3","b2","");
	EnterMove("e1","g1","");
	EnterMove("b2","a1","R");		// promote rook
	MessageOut("FEN:"+GetFen(),true);
	}
	
	// automatic game
	function autosample2():void
	{
	Jst_Play();
	//setTimeout("autosample2()", 1000);
	// next move
	}

	// undo cases
	function autosample3():void
	{
	EnterMove("e2","e4","");
	UndoMov();
	EnterMove("a2","a4","");
	EnterMove("c7","c5","");
	EnterMove("e2","e4","");
	UndoMov();
	//Jst_Play();
	UndoMov();
	MessageOut(GetFen(),true);
	}

	// set FEN case
	function autosample4():void
	{
	SetFen("7k/Q7/2P2K2/8/8/8/8/8 w - - 0 40");	// set given FEN
	Jst_Play();
	MessageOut(GetFen(),true);
	}

	function LetNow3D():void
	{
	(GameObject.Find("Script2")).SendMessage("jsJesterAccess", "YES");
	}

	function SetDeepLevel(strength:String):void	// Calls from outside...
	{
	Js_TONodes = 300 * Js_maxDepth;
	Js_maxDepth = 1 +  ( System.Convert.ToInt32( strength ) );		// set depth to think...
	}
	
	function SetMovesList(mlist:String):void	// Calls from outside...
	{
	mlist = mlist.Replace( "[0]","" );
	
	if( (mlist.length == 0) || (mlist.length<opnmv.length) || (opnmv.length>= mlist.length && opnmv.Substring(0,mlist.length) != mlist ) )
		{
		InitGame();	
		}
	for( var i=opnmv.length; i<mlist.length; )
		{
			var mv_f = mlist.Substring(i,2);
			var mv_t = mlist.Substring(i+2,2);
			var pr = ( mlist.length>i+5 && mlist.Substring(i+4,1)=="[" ? mlist.Substring(i+5,1) : "" );
			EnterMove( mv_f, mv_t, pr );
			i+=4;  if(pr.length>0) i+=3;
		}
		
	Requests = true;
	Answer = "";
	}

	function Update () 
	{
	if(Requests)
		{
		var omv = opnmv;
		Jst_Play();
		if( omv.length < opnmv.length ) Answer = opnmv.Substring( omv.length );
		else
			{
			var sz = "PROBLEM";
			if( Js_fMate_kc) sz = "Checkmate!";
			if(Js_bDraw != 0) sz = "Draw";
			if(Js_fStalemate) sz = "Stalemate!";
			if(Js_fAbandon) sz = "Resigned";
			if(Js_bDraw == 3) sz = "Repeat-pos!"; 
			Answer = sz;
			}
		if(Answer.length>0)
			{
			GetComponent("TextMesh").text=Answer;
			(GameObject.Find("Script2")).SendMessage("EngineAnswer","Jester: " + Answer);
			}
		Requests = false;
		}
	}
	
	function Start ()
	{
	LetNow3D();
	InitGame();		// Also to start a new game again
	
	//autosample1();
	//autosample2();
	//autosample3();
	//autosample4();
	}
	
