// JS chess library for Unity3D
// just chess logic scripts, no visual representation
// Board in variables, moves, FEN & PGN functions
// no clock, no chess engine
// Copyright: mail: grozny0   at  gmail.com
//-----------
// Use it in scripts:
// import c0_4unity_chess;
// var C0=new c0_4unity_chess();
//
class c0_4unity_chess
{
var c0_position="";
var c0_side=1;
var c0_sidemoves=1;
var c0_moving=false;
var c0_waitmove=false;

var c0_wKingmoved = false;
var c0_bKingmoved = false;
var c0_wLRockmoved = false;
var c0_wRRockmoved = false;
var c0_bLRockmoved = false;
var c0_bRRockmoved = false;
var c0_w00 = false;
var c0_b00 = false;

var c0_lastmovepawn = 0;

var c0_become="";
var c0_become_from_engine="";			// just engine

var c0_moveslist = "";

// on piece moved event...
//var c0_moved_callback="";
// replaced with queue of movements delivered to 3d part above
var c0_moves2do="";

var c0_foundmove="";

var c0_start_FEN="";
var c0_fischer=false;
var c0_fischer_cst="";

var c0_PG_viewer=true;		// Set true for on-error-prints/ false for silent processing...

var c0_PG_1="";

var c0_PGN_header= new Array();

var c0_errflag=false;

var PGN_text="";					// PGN support, the game data will be here....
var c0_NAGs="";

function c0_4unity_chess() {}
function charCodeAt(str:String, at:int):int { return System.Convert.ToInt32(str[at]); }
function fromCharCode(cd:int) :String { return (""+System.Convert.ToChar(cd)); }

function parseInt(nstr:String):int
	{
	var rv=0;
	if(nstr.length>0 && (("0123456789").IndexOf(nstr.Substring(0,1))>=0)) rv=System.Convert.ToInt32(nstr);
	return rv;
	}
	
var c0_peka=fromCharCode(34);

function window_confirm(messtxt:String):boolean { return true; }	// No dialogs at the moment...

//----------------------------------------------------------------------------------------------------------------------------------------------------------------------
// set up starting position...
//----------------------------------------------------------------------------------------------------------------------------------------------------------------------
function c0_set_start_position( c0_mlist:String ):void
{
if( c0_start_FEN.length>0 )
	{
	c0_set_FEN( c0_start_FEN );
	if(c0_fischer) c0_fischer_adjustmoved();
	}
else
{
c0_position="";

if(c0_mlist.length==0)
	{
	c0_add_piece("wpa2"); c0_add_piece("wpb2"); c0_add_piece("wpc2"); c0_add_piece("wpd2");
	c0_add_piece("wpe2"); c0_add_piece("wpf2"); c0_add_piece("wpg2"); c0_add_piece("wph2");
	c0_add_piece("wRa1"); c0_add_piece("wNb1"); c0_add_piece("wBc1"); c0_add_piece("wQd1");
	c0_add_piece("wKe1"); c0_add_piece("wBf1"); c0_add_piece("wNg1"); c0_add_piece("wRh1");
	c0_add_piece("bpa7"); c0_add_piece("bpb7"); c0_add_piece("bpc7"); c0_add_piece("bpd7");
	c0_add_piece("bpe7"); c0_add_piece("bpf7"); c0_add_piece("bpg7"); c0_add_piece("bph7");
	c0_add_piece("bRa8"); c0_add_piece("bNb8"); c0_add_piece("bBc8"); c0_add_piece("bQd8");
	c0_add_piece("bKe8"); c0_add_piece("bBf8"); c0_add_piece("bNg8"); c0_add_piece("bRh8");
	}
else
	{
	c0_position = "wpa2;wpb2;wpc2;wpd2;wpe2;wpf2;wpg2;wph2;" +
		"wRa1;wNb1;wBc1;wQd1;wKe1;wBf1;wNg1;wRh1;" +
		"bpa7;bpb7;bpc7;bpd7;bpe7;bpf7;bpg7;bph7;" +
		"bRa8;bNb8;bBc8;bQd8;bKe8;bBf8;bNg8;bRh8;";
	}

c0_wKingmoved = false;
c0_bKingmoved = false;
c0_wLRockmoved = false;
c0_wRRockmoved = false;
c0_bLRockmoved = false;
c0_bRRockmoved = false;
c0_w00 = false;
c0_b00 = false;

c0_lastmovepawn = 0;
c0_sidemoves=1;
}

c0_become="";
c0_become_from_engine="";			// just engine

c0_moveslist = "";

c0_moving=false;

if(c0_mlist.length>0)
	{
	for(var c0_z=0;c0_z<c0_mlist.length;c0_z+=4)
		{
		var c0_from_at=c0_mlist.Substring(c0_z,2);
		var c0_to_at=c0_mlist.Substring(c0_z+2,2);
		if(c0_z+4<c0_mlist.length && c0_mlist.Substring(c0_z+4,1)=="[")
			{
			c0_become_from_engine=c0_mlist.Substring(c0_z+5,1);
			c0_z+=3;
			}
		else c0_become_from_engine="";

		if(c0_fischer) c0_fischer_cstl_move(c0_from_at+c0_to_at,false);		
		else 
		c0_moveto(c0_convH888(c0_from_at), c0_convH888(c0_to_at), false);
		c0_sidemoves=-c0_sidemoves;
		}
	if( c0_start_FEN.length>0 )
		{
		c0_set_board_situation( c0_position, c0_wKingmoved, c0_wLRockmoved, c0_wRRockmoved, c0_w00, c0_bKingmoved, c0_bLRockmoved, c0_bRRockmoved, c0_b00, c0_lastmovepawn, c0_moveslist, c0_sidemoves );
		}
	else
		{
		var c0_pos2=c0_position;
		c0_position="";
		for(var c0_q=0;c0_q<c0_pos2.length;c0_q+=5) c0_add_piece(c0_pos2.Substring(c0_q,4));
		}
	}

c0_moveslist = c0_mlist;
}

//----------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Set board situation...
//----------------------------------------------------------------------------------------------------------------------------------------------------------------------
function c0_set_board_situation( c0_figlist:String, c0_wK:boolean, c0_wLR:boolean, c0_wRR:boolean,
		c0_w_00:boolean, c0_bK:boolean, c0_bLR:boolean, c0_bRR:boolean, c0_b_00:boolean, c0_elpas:int, c0_ml:String, c0_s:int ):void
{
c0_moving=false;

c0_position="";
for( var i=0; i<c0_figlist.length; )
	{
	c0_add_piece( c0_figlist.Substring(i,4) );
	i+=4; if( i<c0_figlist.length && c0_figlist.Substring(i,1)==";" ) i++;
	}

c0_wKingmoved = c0_wK;
c0_bKingmoved = c0_bK;
c0_wLRockmoved = c0_wLR;
c0_wRRockmoved = c0_wRR;
c0_bLRockmoved = c0_bLR;
c0_bRRockmoved = c0_bRR;
c0_w00 = c0_w_00;
c0_b00 = c0_b_00;

c0_lastmovepawn = c0_elpas;

c0_become="";
c0_become_from_engine="";			// just engine

c0_moveslist = c0_ml;
c0_sidemoves=c0_s;
}


//----------------------------------------------------------------------------------------------------------------------------------------------------------------------
// add a piece at position...
//----------------------------------------------------------------------------------------------------------------------------------------------------------------------
function c0_add_piece( c0_pstring:String ):void
{
var c0_1_at=c0_pstring.Substring(2,2);
var c0_1_figure=c0_pstring.Substring(1,1);
var c0_1_color=c0_pstring.Substring(0,1);

// There were other visual activities before...
if(c0_position.IndexOf(c0_1_at)<0) c0_position+=c0_pstring+";";
}

//----------------------------------------------------------------------------------------------------------------------------------------------------------------------
// remove a piece from position...
//----------------------------------------------------------------------------------------------------------------------------------------------------------------------
function c0_clear_at( c0_1_at:String ):void
{
var c0_a=c0_position.IndexOf(c0_1_at);
if(c0_a>=0) c0_position=c0_position.Substring(0,c0_a-2) + c0_position.Substring(c0_a+3);
}

//----------------------------------------------------------------------------------------------------------------------------------------------------------------------
// move visualy a piece...
//----------------------------------------------------------------------------------------------------------------------------------------------------------------------
function c0_just_move_piece( c0_2_from:String, c0_2_to:String ):void
{
c0_clear_at( c0_2_to );
var c0_a=c0_position.IndexOf(c0_2_from);
if(c0_a>=0)
	{
	var c0_2_figure = c0_position.Substring(c0_a-1,1);
	var c0_2_color = c0_position.Substring(c0_a-2,1);
	c0_position=c0_position.Replace( c0_2_from, c0_2_to );
	c0_moves2do+=c0_2_from+c0_2_to;
	c0_moving=true;
	}
}
// and add a promotion (or castling) indicator...
function c0_and_promote_or_castle():void
{
 if(c0_become.length>0) c0_moves2do+="["+c0_become+"]";
}


//############################################################
// CHESS related part for chess play
//############################################################
//-------------------------------------------------
function c0_convE2(c0_vertikali:int,c0_horizontali:int):String
{
return fromCharCode(96+c0_horizontali)+c0_vertikali.ToString();
}

//-------------------------------------------------
function c0_convE777(c0_verthoriz:String):String
{
return fromCharCode(96+parseInt(c0_verthoriz.Substring(1,1)))+c0_verthoriz.Substring(0,1);
}

//-------------------------------------------------
function c0_conv52(c0_vertikali:int,c0_horizontali:int):String
{
return c0_vertikali.ToString()+c0_horizontali.ToString();
}

//-------------------------------------------------
function c0_convH888(c0_at8:String):String
{
var c0_8horiz=charCodeAt(c0_at8,0) - 96;
var c0_8vert=parseInt(c0_at8.Substring(1,1));
return c0_8vert.ToString() + c0_8horiz.ToString();
}

//-------------------------------------------------
function c0_move_to(c0_Zstr1:String,c0_Zstr2:String):void
{
c0_moveto( c0_convH888(c0_Zstr1), c0_convH888(c0_Zstr2), true );
}


//-------------------------------------------------
function c0_moveto(c0_from_at:String, c0_to_at:String, c0_draw:boolean):void
{
var c0_vert = parseInt(c0_from_at.Substring(0,1));
var c0_horiz= parseInt(c0_from_at.Substring(1,1));
var c0_vert2 = parseInt(c0_to_at.Substring(0,1));
var c0_horiz2= parseInt(c0_to_at.Substring(1,1));

var c0_p=c0_position.IndexOf( c0_convE2(c0_vert,c0_horiz) );
var c0_color=c0_position.Substring(c0_p-2,1);
var c0_figure=c0_position.Substring(c0_p-1,1);

var save_c0_position=c0_position;
	
c0_lastmovepawn = 0; 
if(c0_draw) c0_become="";

 if(c0_draw)
	{
	save_c0_position=c0_position;
	c0_just_move_piece( c0_convE2(c0_vert, c0_horiz), c0_convE2(c0_vert2, c0_horiz2) );
	c0_position=save_c0_position;
	}

 var c0_p2=c0_position.IndexOf( c0_convE2(c0_vert2,c0_horiz2) );
 if(c0_p2>=0)
  {
   c0_position = c0_position.Substring(0,c0_p2-2) + c0_position.Substring(c0_p2+3);
   
   if(!c0_wLRockmoved && c0_convE2(c0_vert2,c0_horiz2)=="a1") c0_wLRockmoved=true;
   if(!c0_wRRockmoved && c0_convE2(c0_vert2,c0_horiz2)=="h1") c0_wRRockmoved=true;
   if(!c0_bLRockmoved && c0_convE2(c0_vert2,c0_horiz2)=="a8") c0_bLRockmoved=true;
   if(!c0_bRRockmoved && c0_convE2(c0_vert2,c0_horiz2)=="h8") c0_bRRockmoved=true;
 
  }
 else
  {		
   if(c0_figure=="R")
    {
     if(c0_color=="w")
	{
	 if(c0_convE2(c0_vert,c0_horiz)=="a1") c0_wLRockmoved=true;
	 if(c0_convE2(c0_vert,c0_horiz)=="h1") c0_wRRockmoved=true;
	}
     else
	{
	 if(c0_convE2(c0_vert,c0_horiz)=="a8") c0_bLRockmoved=true;
	 if(c0_convE2(c0_vert,c0_horiz)=="h8") c0_bRRockmoved=true;
	}
    }
   
	
   if(c0_figure=="K")
    {
    if(!c0_wKingmoved && c0_color=="w")
	{
	if(c0_convE2(c0_vert,c0_horiz)=="e1" && c0_convE2(c0_vert2,c0_horiz2)=="g1")	// 0-0
		{
		if(c0_draw)
		{
		save_c0_position=c0_position;
		c0_just_move_piece("h1","f1");
		c0_position=save_c0_position;
		}
		c0_position = c0_position.Replace( "h1", "f1" );		// Rf1
		c0_w00 = true;
		c0_become="0";
		}
	if(c0_convE2(c0_vert,c0_horiz)=="e1" && c0_convE2(c0_vert2,c0_horiz2)=="c1")	// 0-0-0
		{
		if(c0_draw)
		{
		save_c0_position=c0_position;
		c0_just_move_piece("a1","d1");
		c0_position=save_c0_position;
		}
		c0_position = c0_position.Replace( "a1", "d1" );		// Rd1
		c0_w00 = true;
		c0_become="0";
		}
	c0_wKingmoved=true;
	}
    if(!c0_bKingmoved && c0_color=="b")
	{
	if(c0_convE2(c0_vert,c0_horiz)=="e8" && c0_convE2(c0_vert2,c0_horiz2)=="g8")	// 0-0
		{
		if(c0_draw)
		{
		save_c0_position=c0_position;
		c0_just_move_piece("h8","f8");
		c0_position=save_c0_position;
		}
		c0_position = c0_position.Replace( "h8", "f8" );		// Rf8
		c0_b00 = true;
		c0_become="0";
		}
	if(c0_convE2(c0_vert,c0_horiz)=="e8" && c0_convE2(c0_vert2,c0_horiz2)=="c8")	// 0-0-0
		{
		if(c0_draw)
		{
		save_c0_position=c0_position;
		c0_just_move_piece("a8","d8");
		c0_position=save_c0_position;
		}
		c0_position = c0_position.Replace( "a8", "d8" );		// Rd8
		c0_b00 = true;
		c0_become="0";
		}
	c0_bKingmoved=true;
	}
    }	
  }

 if(c0_figure=="p")		// pawn
	{
	 if(c0_vert2==8 || c0_vert2==1)
		{
		if(c0_become_from_engine.length>0)
		 {
		  c0_figure= c0_become_from_engine;
		 }
		else
		 {
		 if(c0_draw)
			{
			 if(window_confirm("Promote a QUEEN?"))
				{
				c0_figure = "Q";
				}
			 else if(window_confirm("Then a ROOK?"))
				{
				c0_figure = "R";
				}
			 else if(window_confirm("Maybe a BISHOP?"))
				{
				c0_figure = "B";
				}
			 else if(window_confirm("Really a KNIGHT????"))
				{
				c0_figure = "N";
				}
			 else
				{
				//print("I know, You need a new QUEEN.");
				c0_figure = "Q";
				}
			 }	
			else c0_figure="Q";
		  }
		if(c0_draw)
			{
			c0_become=c0_figure;
																		// just put in queue... (no,will be detected above in 3D)...
			//save_c0_position=c0_position;
			//c0_moves2do+=c0_convE2(c0_vert2,c0_horiz2) + "=" + c0_become;
			//c0_position=save_c0_position;
			}
		c0_position = c0_position.Replace( "p"+c0_convE2(c0_vert,c0_horiz), c0_figure+c0_convE2(c0_vert,c0_horiz) );
		}
	 if(c0_p2<0 && c0_horiz!=c0_horiz2)
		{
		if(c0_draw)
			{
			save_c0_position=c0_position;
			c0_clear_at( c0_convE2(c0_vert,c0_horiz2) );
			c0_position=save_c0_position;
			}
		var c0_p3=c0_position.IndexOf( c0_convE2(c0_vert,c0_horiz2) );
		c0_position = c0_position.Substring(0,c0_p3-2) + c0_position.Substring(c0_p3+3);
		}
	 if((c0_vert==2 && c0_vert2==4) || (c0_vert==7 && c0_vert2==5)) c0_lastmovepawn = c0_horiz;
	}

 c0_position = c0_position.Replace( c0_convE2(c0_vert,c0_horiz), c0_convE2(c0_vert2,c0_horiz2) );

 if(c0_draw)
  {
  c0_moveslist += c0_convE2(c0_vert,c0_horiz) + c0_convE2(c0_vert2,c0_horiz2) + ((c0_become.length>0) ? "["+c0_become+"]" : "");
  c0_and_promote_or_castle();
  }

}

//-------------------------------------------------
function c0_D_last_move_was():String
{
var c0_ret="";
if( c0_moveslist.length>0 )
 {
 if (c0_moveslist.Substring( c0_moveslist.length-1, 1 )=="]" ) c0_ret= c0_moveslist.Substring( c0_moveslist.length-7, 7 );
 else c0_ret= c0_moveslist.Substring( c0_moveslist.length-4, 4 );
 }
return c0_ret;
}

//-------------------------------------------------
function c0_take_back():void
{
var c0_movespre="";
if( c0_moveslist.length>0 )
 {
 if (c0_moveslist.Substring( c0_moveslist.length-1, 1 )=="]" ) c0_movespre= c0_moveslist.Substring( 0, c0_moveslist.length-7 );
 else c0_movespre= c0_moveslist.Substring( 0, c0_moveslist.length-4 );
 }

c0_set_start_position( c0_movespre );
}


//-------------------------------------------------
function c0_D_is_empty(c0_Zstr:String):boolean
{
var c0_Zs2=c0_convH888(c0_Zstr);
return c0_is_empty( parseInt(c0_Zs2.Substring(0,1)), parseInt(c0_Zs2.Substring(1,1)));
}

//-------------------------------------------------
function c0_is_empty(c0_Zvert:int, c0_Zhoriz:int):boolean
{
 var c0_good = true;
 if(c0_Zvert<1 || c0_Zvert>8 || c0_Zhoriz<1 || c0_Zhoriz>8) c0_good=false;
 else
  {
   var c0_pz2=c0_position.IndexOf( c0_convE2(c0_Zvert,c0_Zhoriz) );
   if(c0_pz2>=0) c0_good=false;
  }
 return c0_good;
}


//-------------------------------------------------
function c0_D_what_at(c0_Zstr1:String):String
{
 var c0_ret="";
 var c0_pz2=c0_position.IndexOf( c0_Zstr1 );
 if(c0_pz2>=0) c0_ret=c0_position.Substring(c0_pz2-2,2);
 return c0_ret;
}


//-------------------------------------------------
function c0_D_is_enemy(c0_Zstr:String,c0_mycolor:String):boolean
{
var c0_Zs2=c0_convH888(c0_Zstr);
return c0_is_enemy( parseInt(c0_Zs2.Substring(0,1)), parseInt(c0_Zs2.Substring(1,1)), c0_mycolor);
}


//-------------------------------------------------
function c0_is_enemy(c0_Zvert:int,c0_Zhoriz:int,c0_mycolor:String):boolean
{
 var c0_is_there =false;
 if(c0_Zvert>=1 && c0_Zvert<=8 && c0_Zhoriz>=1 && c0_Zhoriz<=8)
  {
   var c0_pz2=c0_position.IndexOf( c0_convE2(c0_Zvert,c0_Zhoriz) );

   if(c0_pz2>=0 && c0_position.Substring(c0_pz2-2,1)!=c0_mycolor) c0_is_there=true;
  }
 return c0_is_there;
}


//-------------------------------------------------
function c0_D_is_emptyline(c0_Zstr1:String,c0_Zstr2:String ):boolean
{
var c0_Zs1=c0_convH888(c0_Zstr1);
var c0_Zs2=c0_convH888(c0_Zstr2);
return c0_is_emptyline( parseInt(c0_Zs1.Substring(0,1)), parseInt(c0_Zs1.Substring(1,1)) , parseInt(c0_Zs2.Substring(0,1)), parseInt(c0_Zs2.Substring(1,1)));
}

//-------------------------------------------------
function c0_is_emptyline(c0_Zvert:int,c0_Zhoriz:int,c0_Zvert2:int,c0_Zhoriz2:int):boolean
{
 var c0_good = true;
 var c0_DZvert=c0_Zvert2-c0_Zvert; if(c0_DZvert<0) c0_DZvert=-1; else if(c0_DZvert>0) c0_DZvert=1;
 var c0_DZhoriz=c0_Zhoriz2-c0_Zhoriz; if(c0_DZhoriz<0) c0_DZhoriz=-1; else if(c0_DZhoriz>0) c0_DZhoriz=1;
 var c0_PZvert=c0_Zvert+c0_DZvert;
 var c0_PZhoriz=c0_Zhoriz+c0_DZhoriz;
 for(;c0_PZvert!=c0_Zvert2 || c0_PZhoriz!=c0_Zhoriz2;)
	{
	if( !c0_is_empty( c0_PZvert, c0_PZhoriz ) )
		{
		 c0_good=false;
		 break;
		}		
	c0_PZvert+=c0_DZvert;
	c0_PZhoriz+=c0_DZhoriz;
	}
 return c0_good;
}


//-------------------------------------------------
function c0_D_is_check_to_king(c0_ZKcolor:String):boolean
{
return c0_is_check_to_king(c0_ZKcolor);
}

//-------------------------------------------------
function c0_is_check_to_king(c0_ZKcolor:String):boolean
{
 var c0_is_check=false;
 var c0_Zp=c0_position.IndexOf(c0_ZKcolor+"K");
 var c0_ZKhoriz=charCodeAt(c0_position.Substring(c0_Zp+2,1),0) - 96;
 var c0_ZKvert=parseInt(c0_position.Substring(c0_Zp+3,1));
 var c0_ZK_at = c0_ZKvert.ToString() + c0_ZKhoriz.ToString();

 for(var c0_i=0;c0_position.length>c0_i; c0_i+=5)
	{
	var c0_Zcolor=c0_position.Substring(c0_i,1);
	var c0_Zfigure=c0_position.Substring(c0_i+1,1);
	
	if(c0_Zcolor!=c0_ZKcolor)
		{
		 var c0_Zhoriz=charCodeAt(c0_position.Substring(c0_i+2,1),0) - 96;
		 var c0_Zvert=parseInt(c0_position.Substring(c0_i+3,1));
		 var c0_Z_at = c0_Zvert.ToString() + c0_Zhoriz.ToString();

		 if(c0_can_be_moved( c0_Z_at, c0_ZK_at, true))
			{
			 c0_is_check=true;
			 break;
			}
		}
	}
 return c0_is_check;
}


//-------------------------------------------------
function c0_is_attacked_king_before_move(c0_Qfrom_at:String, c0_Qto_at:String, c0_Qcolor:String):boolean
{
  c0_is_attack=false;

  var c0_save_position=c0_position;
  var c0_save_sidemoves=c0_sidemoves;
  var c0_save_wKingmoved=c0_wKingmoved;
  var c0_save_bKingmoved=c0_bKingmoved;
  var c0_save_wLRockmoved=c0_wLRockmoved;
  var c0_save_wRRockmoved=c0_wRRockmoved;
  var c0_save_bLRockmoved=c0_bLRockmoved;
  var c0_save_bRRockmoved=c0_bRRockmoved;
  var c0_save_w00=c0_w00;
  var c0_save_b00=c0_b00;
  var c0_save_become=c0_become;

  var c0_save_lastmovepawn=c0_lastmovepawn;

  c0_moveto(c0_Qfrom_at, c0_Qto_at, false);
  c0_sidemoves=-c0_sidemoves;

  if( c0_is_check_to_king(c0_Qcolor) )
	{
	c0_is_attack=true;
	}

  c0_position=c0_save_position;
  c0_sidemoves=c0_save_sidemoves;
  c0_wKingmoved=c0_save_wKingmoved;
  c0_bKingmoved=c0_save_bKingmoved;
  c0_wLRockmoved=c0_save_wLRockmoved;
  c0_wRRockmoved=c0_save_wRRockmoved;
  c0_bLRockmoved=c0_save_bLRockmoved;
  c0_bRRockmoved=c0_save_bRRockmoved;
  c0_lastmovepawn=c0_save_lastmovepawn;
  c0_w00=c0_save_w00;
  c0_b00=c0_save_b00;
  c0_become=c0_save_become;

  return c0_is_attack;
}


//-------------------------------------------------
function c0_D_is_mate_to_king(c0_ZKcolor:String):boolean
{
return c0_is_mate_to_king(c0_ZKcolor, false);
}

//-------------------------------------------------
function c0_is_mate_to_king(c0_ZKcolor:String, c0_just_mate:boolean):boolean
{
 var c0_is_mate=false;

 if( c0_just_mate || c0_is_check_to_king(c0_ZKcolor) )
  {
   var c0_i=0;
   for(c0_is_mate=true;c0_is_mate && (c0_position.length>c0_i); c0_i+=5)
	{
	var c0_Zcolor=c0_position.Substring(c0_i,1);
	if(c0_Zcolor==c0_ZKcolor)
		{
		 var c0_Zhoriz=charCodeAt(c0_position.Substring(c0_i+2,1),0) - 96;
		 var c0_Zvert=parseInt(c0_position.Substring(c0_i+3,1));
		 var c0_Z_at = c0_Zvert.ToString() + c0_Zhoriz.ToString();
		 for(var c0_vi=1;c0_is_mate && c0_vi<=8;c0_vi++)
		  for(var c0_vj=1;c0_is_mate && c0_vj<=8;c0_vj++)
			{
			var c0_Z_to_at=c0_vi.ToString()+c0_vj.ToString();
			if(c0_can_be_moved( c0_Z_at, c0_Z_to_at, false))
				{
				 c0_is_mate=false;
				 break;
				}
			}
		}
	}

  } 
 return c0_is_mate;
}

//-------------------------------------------------
function c0_D_is_pate_to_king(c0_ZWcolor:String):boolean
{
return c0_is_pate_to_king(c0_ZWcolor) && !c0_is_mate_to_king(c0_ZWcolor, false);
}

//-------------------------------------------------
function c0_is_pate_to_king(c0_ZWcolor:String):boolean
{
 var c0_is_pate=true;

 for(var c0_j=0;c0_is_pate && c0_position.length>c0_j; c0_j+=5)
	{
	var c0_Wcolor=c0_position.Substring(c0_j,1);
	if(c0_Wcolor==c0_ZWcolor)
		{
		 var c0_Whoriz=charCodeAt(c0_position.Substring(c0_j+2,1),0) - 96;
		 var c0_Wvert=parseInt(c0_position.Substring(c0_j+3,1));
		 var c0_W_at = c0_Wvert.ToString() + c0_Whoriz.ToString();
		 for(var c0_wi=1;c0_is_pate && c0_wi<=8;c0_wi++)
		  for(var c0_wj=1;c0_is_pate && c0_wj<=8;c0_wj++)
			{
			var c0_W_to_at=c0_wi.ToString()+c0_wj.ToString();
			if(c0_can_be_moved( c0_W_at, c0_W_to_at, false))
				{
				 c0_is_pate=false;
				 break;
				}
			}
		}
	}

 return c0_is_pate;
}


//-------------------------------------------------
function c0_D_can_be_moved(c0_Zstr1:String, c0_Zstr2:String):boolean
{
return c0_can_be_moved( c0_convH888(c0_Zstr1), c0_convH888(c0_Zstr2), false);
}


//-------------------------------------------------
function c0_can_be_moved(c0_from_at:String, c0_to_at:String, c0_just_move_or_eat:boolean):boolean
{
 var c0_can = false;
 var c0_vert = parseInt(c0_from_at.Substring(0,1));		
 var c0_horiz= parseInt(c0_from_at.Substring(1,1));
 var c0_vert2 = parseInt(c0_to_at.Substring(0,1));
 var c0_horiz2= parseInt(c0_to_at.Substring(1,1));

 var c0_p=c0_position.IndexOf( c0_convE2(c0_vert,c0_horiz) );
 if(c0_p>=0)
 {
 var c0_color=c0_position.Substring(c0_p-2,1);
 var c0_figure=c0_position.Substring(c0_p-1,1);

 if(c0_is_empty(c0_vert2,c0_horiz2) || c0_is_enemy(c0_vert2,c0_horiz2,c0_color))
 {
 var c0_Dvert=c0_vert2-c0_vert; if(c0_Dvert<0) c0_Dvert=-c0_Dvert;
 var c0_Dhoriz=c0_horiz2-c0_horiz; if(c0_Dhoriz<0) c0_Dhoriz=-c0_Dhoriz;

 if(c0_figure=="p")
	{
	var c0_virziens;
	if( c0_color=="w" ) c0_virziens=1; else c0_virziens=-1;
	if(c0_horiz2==c0_horiz)
	 {
	  if( (c0_vert2==c0_vert+c0_virziens && c0_is_empty(c0_vert2,c0_horiz2)) ||
	   (c0_color=="w" && c0_vert2==4 && c0_vert==2 && c0_is_empty(3,c0_horiz2) && c0_is_empty(4,c0_horiz2)) ||
	   (c0_color=="b" && c0_vert2==5 && c0_vert==7 && c0_is_empty(5,c0_horiz2) && c0_is_empty(6,c0_horiz2)) )
		c0_can = true;
	 }
	else
	 {
	  if( (c0_horiz2==c0_horiz+1 || c0_horiz2==c0_horiz-1) && c0_vert2==c0_vert+c0_virziens)
	    if(c0_is_enemy(c0_vert2,c0_horiz2,c0_color) ||
		 (c0_lastmovepawn==c0_horiz2 && 
			((c0_color=="w" && c0_vert2==6) || (c0_color=="b" && c0_vert2==3)) ) ) c0_can=true;
	 }
	}
 if(c0_figure=="N")
	{
	if( c0_Dvert+c0_Dhoriz==3 && c0_Dvert!=0 && c0_Dhoriz!=0 ) c0_can=true;
	}
 if(c0_figure=="B")
	{
	if( (c0_Dvert>0 && c0_Dvert==c0_Dhoriz) && c0_is_emptyline(c0_vert,c0_horiz,c0_vert2,c0_horiz2)) c0_can=true;			
	}
 if(c0_figure=="R")
	{
	if( ((c0_Dvert==0||c0_Dhoriz==0) && c0_Dvert!=c0_Dhoriz) && c0_is_emptyline(c0_vert,c0_horiz,c0_vert2,c0_horiz2)) c0_can=true;	
	}
 if(c0_figure=="Q")
	{
	if( (c0_Dvert==0||c0_Dhoriz==0||c0_Dvert==c0_Dhoriz) && c0_is_emptyline(c0_vert,c0_horiz,c0_vert2,c0_horiz2)) c0_can=true;	
	}
 if(c0_figure=="K")
	{
	if((c0_Dvert==0 && c0_Dhoriz==1)||(c0_Dhoriz==0 && c0_Dvert==1)||(c0_Dhoriz==1 && c0_Dvert==1)) c0_can=true;
	else 
	 if (!c0_just_move_or_eat && !c0_is_check_to_king(c0_color) && (!c0_fischer))
		{
		if(c0_color=="w")
		 {
		  if(!c0_wKingmoved && c0_vert==1 && c0_horiz==5 && c0_vert2==1)
			{
			if( (c0_horiz2==7 && !c0_wRRockmoved &&
				c0_is_empty(1,6) && c0_is_empty(1,7) &&
				!c0_is_attacked_king_before_move("15", "16", c0_color) &&
				!c0_is_attacked_king_before_move("15", "17", c0_color)) ||
			    (c0_horiz2==3 && !c0_wLRockmoved &&
				c0_is_empty(1,2) && c0_is_empty(1,3) && c0_is_empty(1,4) &&
				!c0_is_attacked_king_before_move("15", "14", c0_color) &&
				!c0_is_attacked_king_before_move("15", "13", c0_color)) ) c0_can=true;
			}
		 }
		else
		 {
		  if(!c0_bKingmoved && c0_vert==8 && c0_horiz==5 && c0_vert2==8)
			{
			if( (c0_horiz2==7 && !c0_bRRockmoved &&
				c0_is_empty(8,6) && c0_is_empty(8,7) &&
				!c0_is_attacked_king_before_move("85", "86", c0_color) &&
				!c0_is_attacked_king_before_move("85", "87", c0_color)) ||
			    (c0_horiz2==3 && !c0_bLRockmoved &&
				c0_is_empty(8,2) && c0_is_empty(8,3) && c0_is_empty(8,4) &&
				!c0_is_attacked_king_before_move("85", "84", c0_color) &&
				!c0_is_attacked_king_before_move("85", "83", c0_color)) ) c0_can=true;
			}
		 }
		}
	}
 if(!c0_just_move_or_eat && c0_can)
 {
  c0_can = !c0_is_attacked_king_before_move(c0_from_at, c0_to_at, c0_color);
 }
 }
 }
 return c0_can;
}

//---------------------------------------
//  Function to get next possible moves
//---------------------------------------
function c0_get_next_moves():String
{
 var c0_Dposs="";
 for(var c0_Da=0;c0_position.length>c0_Da; c0_Da+=5)
	{
	var c0_Dcolor=c0_position.Substring(c0_Da,1);
	if((c0_sidemoves>0 && c0_Dcolor=="w")||(c0_sidemoves<0 && c0_Dcolor=="b"))
		{
		var c0_Dfigure=c0_position.Substring(c0_Da+1,1);
		var c0_Dhoriz=charCodeAt(c0_position.Substring(c0_Da+2,1),0) - 96;
		var c0_Dvert=parseInt(c0_position.Substring(c0_Da+3,1));
		var c0_Dfrom_move=c0_Dvert.ToString()+c0_Dhoriz.ToString();

		if(c0_Dfigure=="p")
			{
			 c0_Dposs+=c0_DCN(c0_Dfrom_move,c0_sidemoves,0,1);
			 c0_Dposs+=c0_DCN(c0_Dfrom_move,(2*c0_sidemoves),0,1);
			 c0_Dposs+=c0_DCN(c0_Dfrom_move,c0_sidemoves,1,1);
			 c0_Dposs+=c0_DCN(c0_Dfrom_move,c0_sidemoves,-1,1);
			}
		if(c0_Dfigure=="N")
			{
			 c0_Dposs+=c0_DCN(c0_Dfrom_move,2,1,1);
			 c0_Dposs+=c0_DCN(c0_Dfrom_move,2,-1,1);
			 c0_Dposs+=c0_DCN(c0_Dfrom_move,1,2,1);
			 c0_Dposs+=c0_DCN(c0_Dfrom_move,1,-2,1);
			 c0_Dposs+=c0_DCN(c0_Dfrom_move,-1,2,1);
			 c0_Dposs+=c0_DCN(c0_Dfrom_move,-1,-2,1);
			 c0_Dposs+=c0_DCN(c0_Dfrom_move,-2,1,1);
			 c0_Dposs+=c0_DCN(c0_Dfrom_move,-2,-1,1);
			}
		if(c0_Dfigure=="B" || c0_Dfigure=="Q")
			{
			 c0_Dposs+=c0_DCN(c0_Dfrom_move,1,1,8);
			 c0_Dposs+=c0_DCN(c0_Dfrom_move,1,-1,8);
			 c0_Dposs+=c0_DCN(c0_Dfrom_move,-1,1,8);
			 c0_Dposs+=c0_DCN(c0_Dfrom_move,-1,-1,8);
			}
		if(c0_Dfigure=="R" || c0_Dfigure=="Q")
			{
			 c0_Dposs+=c0_DCN(c0_Dfrom_move,1,0,8);
			 c0_Dposs+=c0_DCN(c0_Dfrom_move,-1,0,8);
			 c0_Dposs+=c0_DCN(c0_Dfrom_move,0,1,8);
			 c0_Dposs+=c0_DCN(c0_Dfrom_move,0,-1,8);
			}
		if(c0_Dfigure=="K")
			{
			 c0_Dposs+=c0_DCN(c0_Dfrom_move,1,1,1);
			 c0_Dposs+=c0_DCN(c0_Dfrom_move,1,0,1);
			 c0_Dposs+=c0_DCN(c0_Dfrom_move,1,-1,1);
			 c0_Dposs+=c0_DCN(c0_Dfrom_move,0,1,1);
			 c0_Dposs+=c0_DCN(c0_Dfrom_move,0,-1,1);
			 c0_Dposs+=c0_DCN(c0_Dfrom_move,-1,1,1);
			 c0_Dposs+=c0_DCN(c0_Dfrom_move,-1,0,1);
			 c0_Dposs+=c0_DCN(c0_Dfrom_move,-1,-1,1);	
			 if((c0_Dcolor=="w" && c0_Dfrom_move=="15") || (c0_Dcolor=="b" && c0_Dfrom_move=="85"))
				{
				 c0_Dposs+=c0_DCN(c0_Dfrom_move,0,-2,1);	
				 c0_Dposs+=c0_DCN(c0_Dfrom_move,0,2,1);	
				}
			}
		}
	}
 return c0_Dposs;
}


//---------------------------------------
//
function c0_DCN(c0_D7from_at:String, c0_Dvert_TX:int, c0_Dhoriz_TX:int, c0_Dcntx:int):String
{
 var c0_D7poss="";
 var c0_c7K="";

 var saveD1sidemoves=c0_sidemoves;
 var saveD1wKingmoved=c0_wKingmoved;
 var saveD1bKingmoved=c0_bKingmoved;
 var saveD1wLRockmoved=c0_wLRockmoved;
 var saveD1wRRockmoved=c0_wRRockmoved;
 var saveD1bLRockmoved=c0_bLRockmoved;
 var saveD1bRRockmoved=c0_bRRockmoved;
 var saveD1w00=c0_w00;
 var saveD1b00=c0_b00;
 var saveD1lastmovepawn=c0_lastmovepawn;
 var saveD1position=c0_position;		
 var saveD1become=c0_become;

 var c0_D7vert=parseInt(c0_D7from_at.Substring(0,1));
 var c0_D7horiz=parseInt(c0_D7from_at.Substring(1,1));

 for(var c0_Dj=0; c0_Dj<c0_Dcntx; c0_Dj++)
  {
   c0_D7vert+=c0_Dvert_TX;
   c0_D7horiz+=c0_Dhoriz_TX;
   if(c0_D7vert>=1 && c0_D7vert<=8 && c0_D7horiz>=1 && c0_D7horiz<=8)
    {
	var c0_D7to_at=c0_D7vert.ToString()+c0_D7horiz.ToString();

	if( c0_can_be_moved( c0_D7from_at, c0_D7to_at, false ) )
		{
		c0_foundmove = c0_convE777( c0_D7from_at ) + c0_convE777( c0_D7to_at );
		c0_D7poss+=c0_foundmove + ",";
		}

	c0_wKingmoved=saveD1wKingmoved;
	c0_bKingmoved=saveD1bKingmoved;
	c0_wLRockmoved=saveD1wLRockmoved;
	c0_wRRockmoved=saveD1wRRockmoved;
	c0_bLRockmoved=saveD1bLRockmoved;
	c0_bRRockmoved=saveD1bRRockmoved;
	c0_w00=saveD1w00;
	c0_b00=saveD1b00;

	c0_lastmovepawn=saveD1lastmovepawn;
	c0_position=saveD1position;		
	c0_sidemoves=saveD1sidemoves;		
	c0_become=saveD1become;
   }
  }
 return c0_D7poss;
}


//--- as always javascript has some differences...
function c0_ReplaceAll(Source:String,stringToFind:String,stringToReplace:String):String
{
  var temp = Source;
    var index = temp.IndexOf(stringToFind);
        while(index != -1){
            temp = temp.Replace(stringToFind,stringToReplace);
            index = temp.IndexOf(stringToFind);
        }
        return temp;
}

//----------------------------------------------------------------------------
//	PGN support part...
//----------------------------------------------------------------------------

//------------- Analyse PGN ...

function c0_PG_gettable():void
{
var rc="";

var Event_Name="";
var Event_Site="";
var Event_Date="";
var Roundv="";
var White="";
var Black="";
var Result="";
var ECO="";
var WhiteElo="";
var BlackElo="";
var Game_Date="";
var Source_Date="";

var AddInfo="";

var htms="";

c0_PGN_header=[];

PGN_text= c0_ReplaceAll( PGN_text,"  ", " " );

for(var str2=PGN_text;;)
 {
 var at2=str2.IndexOf("[");
 if(at2<0) break;

 var at2_1=str2.IndexOf("(");
 var at2_2=str2.IndexOf("{");
 if((at2_1>=0 && at2_1<at2) || (at2_2>=0 && at2_2<at2)) break;

 var buf2= str2.Substring(at2+1);
 buf2= buf2.Substring(0, buf2.IndexOf("]") );
 str2= str2.Substring(at2+buf2.length+2);

 c0_PGN_header.push(buf2);
 buf2= c0_ReplUrl(buf2);
 
 
 buf2= c0_ReplaceAll( buf2,"'","" );
 buf2= c0_ReplaceAll( buf2,c0_peka,"" );
 buf2= c0_ReplaceAll( buf2,"–","-" );
  
 var buf3=buf2.ToUpper();

 var at9 = buf3.IndexOf("SETUP ");
 if(at9>=0 && at9<3) { c0_fischer=(buf2.Substring(at9+6,1)=="1"); }

 var at3 = buf3.IndexOf("FEN ");
 if(at3>=0 && at3<3)
 { if( c0_start_FEN.length==0 ) { c0_start_FEN=buf2.Substring(at3+4); c0_set_start_position(""); } }
 else {
 at3 = buf3.IndexOf("EVENT ");
 if(at3>=0) Event_Name=buf2.Substring(at3+6);
 else {
 at3 = buf3.IndexOf("SITE ");
 if(at3>=0) Event_Site=buf2.Substring(at3+5);
 else {
 at3 = buf3.IndexOf("DATE ");
 if(at3>=0 && at3<3) Game_Date=buf2.Substring(at3+5);
 else {
 at3 = buf3.IndexOf("ROUND ");
 if(at3>=0) Roundv=buf2.Substring(at3+6);
 else {
 at3 = buf3.IndexOf("WHITE ");
 if(at3>=0) White=buf2.Substring(at3+6);
 else {
 at3 = buf3.IndexOf("BLACK ");
 if(at3>=0) Black=buf2.Substring(at3+6);
 else {
 at3 = buf3.IndexOf("ECO ");
 if(at3>=0) ECO=buf2.Substring(at3+4);
 else {
 at3 = buf3.IndexOf("WHITEELO ");
 if(at3>=0) WhiteElo=buf2.Substring(at3+9);
 else {
 at3 = buf3.IndexOf("BLACKELO ");
 if(at3>=0) BlackElo=buf2.Substring(at3+9);
 else {
 at3 = buf3.IndexOf("EVENTDATE ");
 if(at3>=0) Event_Date=buf2.Substring(at3+10);
 else {
 at3 = buf3.IndexOf("SOURCEDATE ");
 if(at3>=0) Source_Date=buf2.Substring(at3+11);
 else {
 at3 = buf3.IndexOf("RESULT ");
 if(at3>=0) Result=buf2.Substring(at3+7);
 else {
 AddInfo+=((AddInfo.length>0) ? "<BR>" : "" ) + buf2;
  }}}}}}}}}}}}}
 }

 str2= c0_ReplUrl(str2);
 
 c0_errflag=c0_PG_parseString(str2);
 if(c0_fischer && c0_fischer_cst.length>0) c0_fischer_adjustmoved();
 
 at3 = str2.IndexOf("*");
 if(at3>=0) Result="not finished";
 at3 = str2.IndexOf("1/2");
 if(at3>=0)  Result="1/2-1/2";
 at3 = str2.IndexOf("1-0");
 if(at3>=0)  Result="1:0";
 at3 = str2.IndexOf("1:0");
 if(at3>=0) Result="1:0";
 at3 = str2.IndexOf("0-1");
 if(at3>=0) Result="0:1";
 at3 = str2.IndexOf("0:1");
 if(at3>=0) Result="0:1";

}

//------------------------------ PGN parser on chess moves
function c0_ReplUrl(str:String):String		// Replaces urls to links...
{
var str2=str;
for(;;)
{
 var urls="";
 var at=str2.IndexOf("http://");
 if(at>=0)  urls="HTTP://" + str2.Substring(at+7);
 else
   {
   at=str2.IndexOf("https://");
   if(at>=0) urls="HTTPS://" + str2.Substring(at+8);
   }
  if(urls.length>0)
   {
   at2=urls.IndexOf(" ");
   if(at2>=0) urls=urls.Substring(0,at2);

   str2=str2.Substring(0,at) + "<a href='" +urls + "' target='blank' >link»</a>" + str2.Substring(at +urls.length);
   }
  else break;
}

str2= c0_ReplaceAll( str2, "HTTP://", "http://" );
str2= c0_ReplaceAll( str2, "HTTPS://", "https://" );

return(str2);
}


//------------------------------ PGN parser on chess moves

function c0_get_moves_from_PGN(c0_PGN_str:String):String		// Parses PGN moves from string variableown string for chess moves...
{
PGN_text= c0_PGN_str;

c0_PG_gettable();

if(c0_errflag) print("There was an error in PGN parsing!");

return c0_PG_1;
}


//------------------------------ PGN parser on chess moves

function c0_PG_parseString(str:String):boolean		// Parses own string for chess moves...
{
var f_error=false;
var gaj=1;
var move="";
var color7="w";
var resultl="[1:0][1-0][1 : 0][1 - 0][0:1][0-1][0 : 1][0 - 1][1/2][1 / 2] [0.5:0.5][1/2:1/2][1/2-1/2][1/2 - 1/2][1/2 : 1/2][*]";

var commentv="";

c0_PG_1="";

if(c0_NAGs.length==0) c0_NAGs_define();

var c0_1save_position=c0_position;
var c0_1save_sidemoves=c0_sidemoves;
var c0_1save_wKingmoved=c0_wKingmoved;
var c0_1save_bKingmoved=c0_bKingmoved;
var c0_1save_wLRockmoved=c0_wLRockmoved;
var c0_1save_wRRockmoved=c0_wRRockmoved;
var c0_1save_bLRockmoved=c0_bLRockmoved;
var c0_1save_bRRockmoved=c0_bRRockmoved;
var c0_1save_w00=c0_w00;
var c0_1save_b00=c0_b00;
var c0_1save_become=c0_become;
var c0_1save_become_from_engine=c0_become_from_engine;
var c0_1save_lastmovepawn= c0_lastmovepawn;
var c0_1save_moveslist= c0_moveslist;

if( c0_start_FEN.length>0 ) {  str= ( "{[FEN " + c0_start_FEN + "]} " ) + str; if(c0_sidemoves<0) color7="b";  }
else
{
c0_position = "wpa2,wpb2,wpc2,wpd2,wpe2,wpf2,wpg2,wph2," +
"wRa1,wNb1,wBc1,wQd1,wKe1,wBf1,wNg1,wRh1," +
"bpa7,bpb7,bpc7,bpd7,bpe7,bpf7,bpg7,bph7," +
"bRa8,bNb8,bBc8,bQd8,bKe8,bBf8,bNg8,bRh8,";

c0_moveslist = "";

c0_wKingmoved = false;
c0_bKingmoved = false;
c0_wLRockmoved = false;
c0_wRRockmoved = false;
c0_bLRockmoved = false;
c0_bRRockmoved = false;
c0_w00 = false;
c0_b00 = false;

c0_lastmovepawn = 0;
c0_sidemoves=1;
}

c0_become="";
c0_become_from_engine="";
var c_v="0123456789";
var k=0;
var reminder="";

var st_gaj=1;
var st_atq=str.IndexOf(".")-1;
if(st_atq>=0)
 {
  for(var st_s=""; st_atq>=0; st_atq--)
	{
	 var st_c=str.Substring(st_atq,1);
	 if( c_v.IndexOf(st_c) < 0 ) break;
	 st_s=st_c+st_s;		
	}
 if(st_s.length>0) st_gaj=parseInt(st_s);
 }

for(var i=str.length;i>0;i--) if( str.Substring(i-1)!=" " ) break;
str=str.Substring(0,i);

var atwas=-1;
var atcnt=0;
var Nag="";
var Nag_txt="";
var Nag_at2=0;
		
for(i=0;i<str.length;i++)
 {
 if( atwas<i ) { atwas=i; atcnt=0; }
 else if( atwas<=i ) atcnt++;
 if( atcnt>50 ) { if(c0_PG_viewer) print("Sorry, can't parse this PGN! Errors inside."); f_error=true; break;  }

 var c=str.Substring(i,1);
 for(;c==" " && (i+1)<str.length && str.Substring(i+1,1)==" "; ) { i++; c=str.Substring(i,1); }
 if( c==" " && (i+1)<str.length && ("{([$").IndexOf( str.Substring(i+1,1) )>=0) { i++; c=str.Substring(i,1); }

 commentv="";

 if(c=="$")
	{
	 Nag= str.Substring(i,3);
	 for(k=0; k<Nag.length; k++)
		{
		c=Nag.Substring(k,1);
		if( c_v.IndexOf(c) < 0 ) { Nag=Nag.Substring(0,k); break; }
		}
	 if(Nag.length>0)
		{
		Nag_txt="";
		Nag_at2 = c0_NAGs.IndexOf("["+Nag+"]");
		if(Nag_at2>=0)
			{
			 Nag_txt = c0_NAGs.Substring(Nag_at2+Nag.length+3);
			 Nag_txt = Nag_txt.Substring(0, Nag_txt.IndexOf("[")-1);
			}
		else Nag_txt = "Nag:" + Nag;
		str=str.Substring(0,i) +  "{"+ "[" + Nag_txt + "]" +"}" + str.Substring(i+Nag.length+1);
		}
	  c=str.Substring(i,1);
	  }

 if(c=="{" || c=="(")
  {
   var cc=1;
   var c1= ((c=="{")? "}" : ")" );
   commentv=c;
   for(i++;i<str.length && cc>0;i++)
	{
	var c2=str.Substring(i,1);
	commentv+=c2;
	if(c2==c) cc++;
	if(c2==c1) cc--;
	if(i+1==str.length && cc>0) commentv+=c1;
	}
  if(commentv.length>0)
	{
	for(;;)
	  {	
	   var Nag_at=commentv.IndexOf("$");
	   if( Nag_at<0) break;
	   Nag= commentv.Substring(Nag_at+1,3);
	   for(k=0; k<Nag.length; k++)
		{
		c=Nag.Substring(k,1);
		if( c_v.IndexOf(c) < 0 ) { Nag=Nag.Substring(0,k); break; }
		}
	  if(Nag.length>0)
		{
		Nag_txt="";
		Nag_at2 = c0_NAGs.IndexOf("["+Nag+"]");
		if(Nag_at2>=0)
			{
			 Nag_txt = c0_NAGs.Substring(Nag_at2+Nag.length+3);
			 Nag_txt = Nag_txt.Substring(0, Nag_txt.IndexOf("[")-1);
			}
		else Nag_txt = "Nag:" + Nag;

		commentv=commentv.Substring(0,Nag_at) + "[" + Nag_txt + "]" + commentv.Substring(Nag_at +Nag.length+1);
		}
	 else break;
	  }

	}
  if( color7=="b" )
	{
	for( var j=i; j<i+15; j++)
		{
		var pj1=str.Substring(j,1);
		if( ("{([$").IndexOf(pj1)>=0 ) break;
		if( str.Substring(j,3)=="..." ) { i=j+3; break; }
		}
	}
  i--;
  }

 else if( c=="."  || (c==" " && color7=="b"  ) )
     {
     move="";
     for(;i<str.length && (str.Substring(i,1)==" " || str.Substring(i,1)==".");i++);
     c=str.Substring(i,1);
     for(;i<str.length;i++)
	{
	c=str.Substring(i,1);
	if( c==" "  ) break;
	move+=c;
	}
     if(move.length>0 && move.IndexOf("Z0")<0)
	{
	if(resultl.IndexOf(move)>=0 )
		{
		break;
		}
	else
	 {
	 
	var move2=c0_from_Crafty_standard(move,color7);
	
	if(move2.length==0) { if(c0_PG_viewer) print("Can't parse this PGN! move:"+gaj.ToString()+"."+color7+" "+ move); f_error=true; break;  }

	var from_horiz4=charCodeAt(move2.Substring(0,1),0) - 96;
	var from_vert4=parseInt(move2.Substring(1,1));
	var to_horiz4=charCodeAt(move2.Substring(2,1),0) - 96;
	var to_vert4=parseInt(move2.Substring(3,1));

	var from_move = from_vert4.ToString()+from_horiz4.ToString();
	var to_move = to_vert4.ToString()+to_horiz4.ToString();

	if(move2.length>4 && move2.Substring(4,1)=="[") c0_become_from_engine=move2.Substring(5,1);
	else c0_become_from_engine="Q";

	if(c0_fischer) c0_fischer_cstl_move(move2,false);
	else c0_moveto(from_move, to_move, false);
	c0_sidemoves=-c0_sidemoves;

	c0_PG_1+=move2;

	c0_become_from_engine="";
	c0_become="";
	
	if( color7=="w" )
		{
		color7="b"; i--;
		}
	else
		{
		color7="w"; 
		gaj++;
		}

	if( color7=="w" && str.length-i<10)
		        {
		        reminder = str.Substring(i+1);
		        for(;reminder.length>0 && reminder.Substring(0,1)==" ";) reminder=reminder.Substring(1);
		        if(reminder.length>0 && resultl.IndexOf(reminder)>=0 )
					{
					break;
					}
		         }

	 }
	}
     }
 else
    {
     if(str.length-i<10)
        {
        reminder = str.Substring(i);
        for(;reminder.length>0 && reminder.Substring(0,1)==" ";) reminder=reminder.Substring(1);
        if(reminder.length>0 && resultl.IndexOf(reminder)>=0 )
		{
		break;
		}
        }
    }
 }

c0_position=c0_1save_position;
c0_sidemoves=c0_1save_sidemoves;
c0_wKingmoved=c0_1save_wKingmoved;
c0_bKingmoved=c0_1save_bKingmoved;
c0_wLRockmoved=c0_1save_wLRockmoved;
c0_wRRockmoved=c0_1save_wRRockmoved;
c0_bLRockmoved=c0_1save_bLRockmoved;
c0_bRRockmoved=c0_1save_bRRockmoved;
c0_w00=c0_1save_w00;
c0_b00=c0_1save_b00;
c0_become=c0_1save_become;
c0_become_from_engine=c0_1save_become_from_engine;
c0_lastmovepawn=c0_1save_lastmovepawn;
c0_moveslist=c0_1save_moveslist;

return f_error;
}

//------------------------------ just get tag string

function c0_get_tag( str:String, tag:String):String
{
 var ret="";
 var ctg1="["+tag+"]";
 var ctg2="[/"+tag+"]";
 var at1=str.IndexOf(ctg1);
 if(at1>=0)
	{
	str=str.Substring(at1+ctg1.length);
	at1=str.IndexOf(ctg2);
	if(at1>=0) ret=str.Substring(0, at1);
	}
 return ret;
}



//-------------------------------------------------
// Crafty notation (quite a standard)
//-------------------------------------------------
function c0_from_Crafty_standard(c0_move:String,c0_color47:String):String
{
c0_move=c0_ReplaceAll( c0_move, "ep", "" );
c0_move=c0_ReplaceAll( c0_move, "8Q", "8=Q" );
c0_move=c0_ReplaceAll( c0_move, "8R", "8=R" );
c0_move=c0_ReplaceAll( c0_move, "8B", "8=B" );
c0_move=c0_ReplaceAll( c0_move, "8N", "8=N" );
c0_move=c0_ReplaceAll( c0_move, "1Q", "1=Q" );
c0_move=c0_ReplaceAll( c0_move, "1R", "1=R" );
c0_move=c0_ReplaceAll( c0_move, "1B", "1=B" );
c0_move=c0_ReplaceAll( c0_move, "1N", "1=N" );
var c0_becomes7="";
var c0_sh7=c0_move.IndexOf("=");

var c0_ret7=c0_fischer_cst_fCr(c0_move);
if(c0_ret7.length>0) return c0_ret7;
else if(c0_move.length>4 && (c0_move.Substring(0,5)=="O-O-O" || c0_move.Substring(0,5)=="0-0-0"))
	{
	if(c0_color47=="w")
		{ 
		  if(c0_position.IndexOf("wKc1")<0 && c0_can_be_moved( "15","13",false) ) c0_ret7="e1c1[0]";
	 	}
	else
		{
		  if(c0_position.IndexOf("bKc8")<0 && c0_can_be_moved( "85","83",false) ) c0_ret7="e8c8[0]";
	 	}
	}
else if(c0_move.length>2 && (c0_move.Substring(0,3)=="O-O" || c0_move.Substring(0,3)=="0-0"))
	{
	if(c0_color47=="w")
		{ 
		  if(c0_position.IndexOf("wKg1")<0 && c0_can_be_moved( "15","17",false) ) c0_ret7="e1g1[0]";
		}
	else
		{
		  if(c0_position.IndexOf("bKg8")<0 && c0_can_be_moved( "85","87",false) ) c0_ret7="e8g8[0]";
		}
	}
else if( ("{ab}{ba}{bc}{cb}{cd}{dc}{de}{ed}{ef}{fe}{fg}{gf}{gh}{hg}").IndexOf(c0_move.Substring(0,2))>=0 )
  {
       var c0_Z81horiz=charCodeAt(c0_move,0) - 96;
       var c0_Z82horiz=charCodeAt(c0_move,1) - 96;

       for(var c0_i8=0;c0_position.length>c0_i8; c0_i8+=5)
	{
	var c0_Z8color=c0_position.Substring(c0_i8,1);
	var c0_Z8figure=c0_position.Substring(c0_i8+1,1);
	var c0_Z8horiz=charCodeAt(c0_position.Substring(c0_i8+2,1),0) - 96;
	var c0_Z8vert=parseInt(c0_position.Substring(c0_i8+3,1));
	var c0_Z82vert=c0_Z8vert+(c0_color47=="w" ? 1 : -1 );
	var c0_Z8from_at72 = c0_Z8vert.ToString() + c0_Z8horiz.ToString();
	var c0_Z8to_at72 = c0_Z82vert.ToString() + c0_Z82horiz.ToString();

	if(c0_Z8color==c0_color47 && c0_Z8figure=="p" && c0_Z81horiz==c0_Z8horiz )
		{
		if( c0_can_be_moved( c0_Z8from_at72, c0_Z8to_at72,false) )
			{
			c0_ret7=c0_convE777(c0_Z8from_at72)+c0_convE777(c0_Z8to_at72);
			break;
			}
		}
	}
       
	if(c0_sh7>=0)
	{
	c0_becomes7="["+c0_move.Substring(c0_sh7+1,1)+"]";
	}
       c0_ret7+=c0_becomes7;
   }
else
 {
 var c0_cp7=c0_move.length;

 var c0_figure7=c0_move.Substring(0,1);
 if(c0_figure7=="N" || c0_figure7=="B" || c0_figure7=="R" || c0_figure7=="Q" || c0_figure7=="K") c0_move = c0_move.Substring(1);
 else c0_figure7="p";

 if(c0_sh7>=0)
	{
	c0_becomes7="["+c0_move.Substring(c0_sh7+1,1)+"]";
	c0_move = c0_move.Substring(0, c0_sh7);
	}
 c0_move=c0_ReplaceAll( c0_move, "+", "" );
 c0_move=c0_ReplaceAll( c0_move, "-", "" );
 c0_move=c0_ReplaceAll( c0_move, "x", "" );
 c0_move=c0_ReplaceAll( c0_move, "X", "" );
 c0_move=c0_ReplaceAll( c0_move, "#", "" );
 c0_move=c0_ReplaceAll( c0_move, "!", "" );
 c0_move=c0_ReplaceAll( c0_move, "?", "" );

 c0_cp7=c0_move.length;
 c0_cp7--;	
 var c0_to_at7 = c0_move.Substring(c0_cp7-1,2);
 var c0_vert72=parseInt(c0_move.Substring(c0_cp7--,1));
 var c0_horiz72=charCodeAt(c0_move.Substring(c0_cp7--,1),0) - 96;
 var c0_to_at72 = c0_vert72.ToString() + c0_horiz72.ToString();

 if(c0_cp7>=0)
  {
  var c0_vert71=parseInt(c0_move.Substring(c0_cp7,1));
  if(c0_vert71<1 || c0_vert71>8) c0_vert71=0; else c0_cp7--;
  }
  else c0_vert71=0;

 if(c0_cp7>=0)
  {
  var c0_horiz71=charCodeAt(c0_move.Substring(c0_cp7--,1),0) - 96;
  if(c0_horiz71<1 || c0_horiz71>8) c0_horiz71=0;
  }
  else c0_horiz71=0;

 for(var c0_i4=0;c0_position.length>c0_i4; c0_i4+=5)
	{
	var c0_Z4color=c0_position.Substring(c0_i4,1);
	var c0_Z4figure=c0_position.Substring(c0_i4+1,1);
	var c0_Z4horiz=charCodeAt(c0_position.Substring(c0_i4+2,1),0) - 96;
	var c0_Z4vert=parseInt(c0_position.Substring(c0_i4+3,1));
	var c0_Z4from_at72 = c0_Z4vert.ToString() + c0_Z4horiz.ToString();
	var c0_Z4from_at7 = c0_position.Substring(c0_i4+2,2);

	
	if(c0_Z4color==c0_color47 && c0_figure7==c0_Z4figure)
		{
		 if((c0_vert71==0 || c0_vert71==c0_Z4vert) &&
			(c0_horiz71==0 || c0_horiz71==c0_Z4horiz) )
				{
				if( c0_can_be_moved( c0_Z4from_at72,c0_to_at72,false))
					{
					c0_ret7=c0_Z4from_at7+c0_to_at7+c0_becomes7;
					break;
					}
				}
		}
	}
 }
return c0_ret7;
}


//============================ ADDITIONAL UPPER LEVEL FUNCTIONS...

//----------------------------------
// Gets  FEN for position
//----------------------------------
function c0_get_FEN():String
{
var c0_vert7=8;
var c0_horz7=1;
var c0_fs1="";
var c0_em7=0;
var c0_at7=0;

for( c0_vert7=8; c0_vert7>=1;  )
 {
 for( c0_horz7=1; c0_horz7<=8; c0_horz7++ )
	{
	var c0_pos7 = fromCharCode(96+c0_horz7)+c0_vert7.ToString();
	c0_at7=c0_position.IndexOf( c0_pos7 );
	if( c0_at7>=0 )
		{
		if( c0_em7>0 ) { c0_fs1+=c0_em7.ToString(); c0_em7=0; }
		var c0_ch7=c0_position.Substring( c0_at7-1, 1 );
		var c0_color7=c0_position.Substring( c0_at7-2, 1 );
		if( c0_color7=="w" ) c0_fs1+=c0_ch7.ToUpper();
		else c0_fs1+=c0_ch7.ToLower();
		}
	else c0_em7++;
	}
 if( c0_em7>0 ) { c0_fs1+=c0_em7.ToString(); c0_em7=0; }
 c0_vert7--;
 if(c0_vert7<1) break;
 c0_fs1+="/";
 }

c0_fs1+=" " + (( c0_sidemoves>0)? "w" : "b" ) + " ";

if(  (c0_w00 || c0_wKingmoved || (c0_wLRockmoved && c0_wRRockmoved))  && 
     (c0_b00 || c0_bKingmoved || (c0_bLRockmoved && c0_bRRockmoved)) ) c0_fs1+="- ";
else
 {
  if( !(c0_w00 || c0_wKingmoved) && !c0_wLRockmoved ) c0_fs1+="Q";
  if( !(c0_w00 || c0_wKingmoved) && !c0_wRRockmoved ) c0_fs1+="K";
  if( !(c0_b00 || c0_bKingmoved) && !c0_bLRockmoved ) c0_fs1+="q";
  if( !(c0_b00 || c0_bKingmoved) && !c0_bRRockmoved ) c0_fs1+="k";
  c0_fs1+=" ";
 }

 var c0_enpass7="-";

 if(c0_lastmovepawn>0)
	{
	var c0_lmove7=c0_moveslist.Substring( c0_moveslist.length-4, 4 );
	c0_vert7 = charCodeAt(c0_lmove7,1);

	if( c0_lmove7.Substring(0,1)==c0_lmove7.Substring(2,1) &&
		(charCodeAt(c0_lmove7,0)-96==c0_lastmovepawn) &&
		 (( c0_lmove7.Substring(1,1)=="7" && c0_lmove7.Substring(3,1)=="5" ) ||
		  ( c0_lmove7.Substring(1,1)=="2" && c0_lmove7.Substring(3,1)=="4" )) )
	{
	 c0_at7=c0_position.IndexOf( c0_lmove7.Substring(2,2) );
	 if( c0_at7>=0 && c0_position.Substring( c0_at7-1,1 )=="p" )
		{
		c0_enpass7=c0_lmove7.Substring(0,1);
		if( c0_lmove7.Substring(1,1)=="7" ) c0_enpass7+="6"; else c0_enpass7+="3";
		}
	}
	}
c0_fs1+=c0_enpass7 + " ";

c0_fs1+="0 ";		// position repeating moves....

var c0_mcount7=1;
for( var c0_i7=0; c0_i7<c0_moveslist.length;  )
	{
	c0_i7+=4;
	if((c0_moveslist.length>c0_i7) && (c0_moveslist.Substring(c0_i7,1)=="[")) c0_i7+=3;
	c0_mcount7+=0.5;
	}
c0_fs1+=(parseInt( c0_mcount7.ToString() )).ToString() + " ";

return c0_fs1;
}

//----------------------------------
// Sets position using FEN
//----------------------------------
function c0_set_FEN( c0_fen_str:String )
{
var c0_vert7=8;
var c0_horz7=1;

var c0_fs1="";
var c0_fs2="";

for(var c0_i7=0; c0_i7<c0_fen_str.length; c0_i7++)
{
var c0_ch7=c0_fen_str.Substring(c0_i7,1);
if( c0_ch7==" " ) break;
var c0_pusto=parseInt(c0_ch7);
if(c0_pusto>=1 && c0_pusto<=8)  { for(var c0_j7=1; c0_j7<=c0_pusto; c0_j7++) c0_fs1+="."; }
else c0_fs1+=c0_ch7;
}
c0_fs1+= (" " + c0_fen_str.Substring(c0_i7));

for(c0_i7=0; c0_i7<c0_fs1.length; c0_i7++)
{
c0_ch7=c0_fs1.Substring(c0_i7,1);
if( c0_ch7==" " ) break;

var c0_pos7 = fromCharCode(96+c0_horz7)+c0_vert7.ToString();
var c0_color7=" ";
if(c0_ch7=="p" || c0_ch7=="n" || c0_ch7=="b" || c0_ch7=="r" || c0_ch7=="q" || c0_ch7=="k" ) c0_color7="b";
if(c0_ch7=="P" || c0_ch7=="N" || c0_ch7=="B" || c0_ch7=="R" || c0_ch7=="Q" || c0_ch7=="K" ) c0_color7="w";
if(c0_color7!=" ")
	 {
	 if( c0_ch7=="P" ||  c0_ch7=="p" ) c0_ch7="p";
	 else c0_ch7=c0_ch7.ToUpper();

	 c0_fs2+=(c0_color7 + c0_ch7 + c0_pos7 + ";");
	 }
if(c0_ch7=="/") { if(c0_horz7>1) {c0_vert7--; c0_horz7=1;} }
else { c0_horz7++; if(c0_horz7>8) { c0_horz7=1; c0_vert7--; } }

if(c0_vert7<1) break;
}

for(; c0_i7<c0_fs1.length; c0_i7++) if( c0_fs1.Substring(c0_i7,1)==" " ) break;
for(; c0_i7<c0_fs1.length; c0_i7++) if( c0_fs1.Substring(c0_i7,1)!=" " ) break;

// which moves
var c0_side7move=1;
if(c0_i7<c0_fs1.length && c0_fs1.Substring(c0_i7,1)=="b") c0_side7move=-1;

for(; c0_i7<c0_fs1.length; c0_i7++) if( c0_fs1.Substring(c0_i7,1)==" " ) break;
for(; c0_i7<c0_fs1.length; c0_i7++) if( c0_fs1.Substring(c0_i7,1)!=" " ) break;

// castlings

var c0_wK7=false; var c0_wRL7=false; var c0_wRR7=false; var c0_wcastl7=false;
var c0_bK7=false; var c0_bRL7=false; var c0_bRR7=false; var c0_bcastl7=false;

var c0_q7="-";
if(c0_i7<c0_fs1.length)
{
 c0_q7=c0_fs1.Substring(c0_i7);
 var c0_at7=c0_q7.IndexOf(" ");
 if( c0_at7>=0 ) c0_q7=c0_q7.Substring(0,c0_at7);
}
if( c0_q7.IndexOf("K")<0 ) c0_wRR7=true;
if( c0_q7.IndexOf("Q")<0 ) c0_wRL7=true;

if( c0_q7.IndexOf("k")<0 ) c0_bRR7=true;
if( c0_q7.IndexOf("q")<0 ) c0_bRL7=true;

if( c0_q7.IndexOf("-")>=0 ) { c0_wK7=true;  c0_bK7=true; }

c0_fisch_castl_save(c0_q7,c0_fs2);

for(; c0_i7<c0_fs1.length; c0_i7++) if( c0_fs1.Substring(c0_i7,1)==" " ) break;
for(; c0_i7<c0_fs1.length; c0_i7++) if( c0_fs1.Substring(c0_i7,1)!=" " ) break;

// en passant

c0_q7="-";
if(c0_i7<c0_fs1.length) c0_q7=c0_fs1.Substring(c0_i7,1);

var c0_enpass7=0;
if( c0_q7.IndexOf("-")<0 ) c0_enpass7=charCodeAt(c0_q7,0)-96;

for(; c0_i7<c0_fs1.length; c0_i7++) if( c0_fs1.Substring(c0_i7,1)==" " ) break;
for(; c0_i7<c0_fs1.length; c0_i7++) if( c0_fs1.Substring(c0_i7,1)!=" " ) break;

// remaining information is omitted

c0_set_board_situation( c0_fs2, c0_wK7, c0_wRL7, c0_wRR7, c0_wcastl7, c0_bK7, c0_bRL7, c0_bRR7, c0_bcastl7, c0_enpass7, c0_moveslist, c0_side7move );

}

//----------------------------------
// PGN parser on chess moves
//----------------------------------
function c0_put_to_PGN(c0_moves_str:String):String		// To write moveslist to PGN string...
{

if( c0_moves_str.length==0 ) c0_moves_str=c0_moveslist;

c0_errflag=false;
var c0_1save_position=c0_position;
var c0_1save_sidemoves=c0_sidemoves;
var c0_1save_wKingmoved=c0_wKingmoved;
var c0_1save_bKingmoved=c0_bKingmoved;
var c0_1save_wLRockmoved=c0_wLRockmoved;
var c0_1save_wRRockmoved=c0_wRRockmoved;
var c0_1save_bLRockmoved=c0_bLRockmoved;
var c0_1save_bRRockmoved=c0_bRRockmoved;
var c0_1save_w00=c0_w00;
var c0_1save_b00=c0_b00;
var c0_1save_become=c0_become;
var c0_1save_become_from_engine=c0_become_from_engine;
var c0_1save_lastmovepawn= c0_lastmovepawn;
var c0_1save_moveslist= c0_moveslist;

if( c0_start_FEN.length>0 ) { c0_set_FEN( c0_start_FEN ); c0_fischer_adjustmoved(); }
else
{
c0_position = "wpa2,wpb2,wpc2,wpd2,wpe2,wpf2,wpg2,wph2," +
"wRa1,wNb1,wBc1,wQd1,wKe1,wBf1,wNg1,wRh1," +
"bpa7,bpb7,bpc7,bpd7,bpe7,bpf7,bpg7,bph7," +
"bRa8,bNb8,bBc8,bQd8,bKe8,bBf8,bNg8,bRh8,";

c0_moveslist = "";

c0_wKingmoved = false;
c0_bKingmoved = false;
c0_wLRockmoved = false;
c0_wRRockmoved = false;
c0_bLRockmoved = false;
c0_bRRockmoved = false;
c0_w00 = false;
c0_b00 = false;

c0_lastmovepawn = 0;
c0_sidemoves=1;
}

c0_become="";
c0_become_from_engine="";

var c0_PGN_ret="";

var Result="";

var CR=( fromCharCode(13) +  fromCharCode(10) );
for(var c0_i7=0; c0_i7<c0_PGN_header.length; c0_i7++)
	{
	var c0_q9=c0_PGN_header[c0_i7].ToUpper();
	var c0_at_q8=c0_q9.IndexOf( "FEN " );
	if(c0_at_q8<0 && c0_fischer) c0_at_q8=c0_q9.IndexOf( "SETUP " );
	if( c0_at_q8<0 || c0_at_q8>3 )
	{
	c0_PGN_ret += ( "[" + c0_PGN_header[c0_i7] + "]" + CR );
	var c0_at_q9=c0_q9.IndexOf( "RESULT " );
	if( c0_at_q9>=0 )
		{
		Result=c0_PGN_header[c0_i7].Substring( c0_at_q9 + 7 );
		Result=c0_ReplaceAll( Result, "'", "" );
 		}
	}
	}
if( c0_start_FEN.length>0 )
	{
	if(c0_fischer) c0_PGN_ret += "[SetUp 1]" + CR;
	c0_PGN_ret += "[FEN "  + c0_start_FEN + "]" + CR;
	}
if( c0_PGN_ret.length>0 ) c0_PGN_ret += CR;

var c07_gaj=0;
var c07_col="b";

for( c0_i7=0; c0_i7< c0_moves_str.length; )
 {
if(c07_col=="w") c07_col="b";
else { c07_col="w"; c07_gaj++; }


 var c0_move8=c0_moves_str.Substring( c0_i7, 4 );
 c0_i7+=4;
 if( c0_i7< c0_moves_str.length && c0_moves_str.Substring( c0_i7, 1 )=="[" )
	{
	c0_move8+=c0_moves_str.Substring( c0_i7, 3 );
	c0_i7+=3;
	}

 var c0_move9=c0_to_Crafty_standard( c0_move8, c07_col );
 if( c0_move9.length>0 )
	{
	 if( c07_col=="w" ) c0_PGN_ret+=c07_gaj.ToString() + ". ";
	c0_PGN_ret+=c0_move9 + " ";
	}
else { c0_errflag=true; break; }
}

if(!c0_errflag) c0_PGN_ret+=" " +Result;

c0_position=c0_1save_position;
c0_sidemoves=c0_1save_sidemoves;
c0_wKingmoved=c0_1save_wKingmoved;
c0_bKingmoved=c0_1save_bKingmoved;
c0_wLRockmoved=c0_1save_wLRockmoved;
c0_wRRockmoved=c0_1save_wRRockmoved;
c0_bLRockmoved=c0_1save_bLRockmoved;
c0_bRRockmoved=c0_1save_bRRockmoved;
c0_w00=c0_1save_w00;
c0_b00=c0_1save_b00;
c0_become=c0_1save_become;
c0_become_from_engine=c0_1save_become_from_engine;
c0_lastmovepawn=c0_1save_lastmovepawn;
c0_moveslist=c0_1save_moveslist;

if(c0_errflag) print("Can't parse " + c07_gaj.ToString() + c07_col + ":" + c0_move8);

if( c0_start_FEN.length>0 )
	{
	c0_set_board_situation( c0_position, c0_wKingmoved, c0_wLRockmoved, c0_wRRockmoved, c0_w00, c0_bKingmoved, c0_bLRockmoved, c0_bRRockmoved, c0_b00, c0_lastmovepawn, c0_moveslist, c0_sidemoves );
	}

return c0_PGN_ret;
}

//-------------------------------------------------
// Crafty notation (quite a standard)
//-------------------------------------------------
function c0_to_Crafty_standard(c0_move:String,c0_color47:String):String
{
 var c0_ret9=c0_fischer_cst_tCr(c0_move);
 if(c0_ret9.length>0)
	{
	c0_fischer_cstl_move(c0_move,false);
	c0_sidemoves=-c0_sidemoves;
	return c0_ret9;
	}

 var c0_pos9=c0_position;
 var c0_at9=c0_position.IndexOf( c0_move.Substring(0,2) );
 var c0_at7=c0_position.IndexOf( c0_move.Substring(2,2) );
 c0_become_from_engine="";
 if( c0_move.length>4 ) c0_become_from_engine=c0_move.Substring(5,1);

 if(c0_at9>=0 )
  {
  var c0_9figure=c0_position.Substring( c0_at9-1,1 );
  var c0_9color=c0_position.Substring( c0_at9-2,1 );
  if( c0_9color==c0_color47 )
   {
    var c0_Z4horiz=charCodeAt(c0_move.Substring(0,1),0) - 96;
    var c0_Z4vert=parseInt(c0_move.Substring(1,1));
    var c0_Z4from_at72 = c0_Z4vert.ToString() + c0_Z4horiz.ToString();
    var c0_Z5horiz=charCodeAt(c0_move.Substring(2,1),0) - 96;
    var c0_Z5vert=parseInt(c0_move.Substring(3,1));
    var c0_Z5to_at72 = c0_Z5vert.ToString() + c0_Z5horiz.ToString();

    if( c0_become_from_engine.length==0 && c0_9figure=="p" && (c0_Z5vert==8 || c0_Z5vert==1) ) c0_become_from_engine="Q";

    if( c0_can_be_moved( c0_Z4from_at72,c0_Z5to_at72,false ) )
      {
        if( c0_9figure!="p" )
	{
	var c0_figc9=0;
	for(var c0_i4=0;c0_position.length>c0_i4; c0_i4+=5)
	{
	var c0_Q4color=c0_position.Substring(c0_i4,1);
	var c0_Q4figure=c0_position.Substring(c0_i4+1,1);
	if(c0_Q4color==c0_color47 && c0_9figure==c0_Q4figure) c0_figc9++;
	}

	for(c0_i4=0;c0_position.length>c0_i4; c0_i4+=5)
	{
	c0_Q4color=c0_position.Substring(c0_i4,1);
	c0_Q4figure=c0_position.Substring(c0_i4+1,1);
	var c0_Q4horiz=charCodeAt(c0_position.Substring(c0_i4+2,1),0) - 96;
	var c0_Q4vert=parseInt(c0_position.Substring(c0_i4+3,1));
	var c0_Q4from_at72 = c0_Q4vert.ToString() + c0_Q4horiz.ToString();
	var c0_Q4from_at7 = c0_position.Substring(c0_i4+2,2);

	if(c0_Q4color==c0_color47 && c0_9figure==c0_Q4figure && c0_Q4from_at7 !=c0_move.Substring(0,2) )
		{
		if( c0_can_be_moved( c0_Q4from_at72, c0_Z5to_at72,false))
			{
			if( c0_figc9 < 3 && c0_Z4horiz!=c0_Q4horiz )
				{
				c0_ret9 += c0_move.Substring(0,1);
				}
			else
				{
				c0_ret9 += c0_move.Substring(0,2) + "-" ;
				}
			break;
			}
		}
	}
	}
	c0_moveto( c0_Z4from_at72,c0_Z5to_at72,false );
	c0_sidemoves=-c0_sidemoves;
	
	if( c0_9figure=="K" && c0_9color=="w" && c0_move.Substring(0,4) == "e1g1" ) c0_ret9="O-O";
	else if( c0_9figure=="K" && c0_9color=="b" && c0_move.Substring(0,4) == "e8g8" ) c0_ret9="O-O";
	else if( c0_9figure=="K" && c0_9color=="w" && c0_move.Substring(0,4) == "e1c1" ) c0_ret9="O-O-O";
	else if( c0_9figure=="K" && c0_9color=="b" && c0_move.Substring(0,4) == "e8c8" ) c0_ret9="O-O-O";
		else
		{
	  	c0_ret9 = (c0_9figure=="p" ? "" : c0_9figure) + c0_ret9; 

		if( (c0_ret9.length>0) && (c0_pos9.length > c0_position.length ))
			{
			 if( c0_ret9.Substring( c0_ret9.length-1,1)=="-" ) c0_ret9=c0_ret9.Substring(0,c0_ret9.length-1);
			 c0_ret9 += "x";
			}

		if( c0_ret9.length>0 && c0_ret9.Substring(0,1)=="x" ) c0_ret9= c0_move.Substring(0,1) + c0_ret9;

		c0_ret9 +=c0_move.Substring(2,2); 
		if( c0_become_from_engine.length>0 ) c0_ret9+= "=" + c0_become_from_engine;
		if( c0_is_mate_to_king( (c0_color47=="w" ? "b" : "w" ), true ) ) c0_ret9+= "#";
		else if( c0_is_check_to_king( (c0_color47=="w" ? "b" : "w" ) ) ) c0_ret9+= "+";
		}
       }
   }
  }
return c0_ret9;
}

//-------------------------------------------------
// Fischerrandom support functions...
//-------------------------------------------------

//------- Get castling settings into variable...
function c0_fisch_castl_save(c0_fen_c:String,c0_fen_pos:String):void
{
c0_fischer_cst="";
var atW=c0_fen_pos.IndexOf("wK");
var atB=c0_fen_pos.IndexOf("bK");
if(atW>=0 && atB>=0)
	{
	c0_fischer_cst+=("{wK}"+c0_fen_pos.Substring(atW,5)+"{bK}"+c0_fen_pos.Substring(atB,5));

	for(var c0_q8=1; c0_q8<=16; c0_q8++)
		{
		var c0_ch=fromCharCode(c0_q8<9 ? 96+c0_q8 : 64+c0_q8-8);
		var c0_cl=(c0_q8<9 ? "b" : "w");
		var c0_vt=(c0_q8<9 ? "8" : "1");
		var c0_hz=fromCharCode(96+c0_q8-(c0_q8<9?0:8));
		var c0_rook=c0_cl+"R"+c0_hz+c0_vt+";";
		if(c0_fen_c.IndexOf(c0_ch)>=0 && c0_fen_pos.IndexOf(c0_rook)>=0)
		 {
		 if(c0_q8<9)
		  {
		  if(charCodeAt(c0_fen_pos.Substring(atB+2,1),0)>charCodeAt(c0_hz,0)) c0_fischer_cst+="{bLR}";
		  else c0_fischer_cst+="{bRR}";
		  }
		  else
		  {
		  if(charCodeAt(c0_fen_pos.Substring(atW+2,1),0)>charCodeAt(c0_hz,0)) c0_fischer_cst+="{wLR}";
		  else c0_fischer_cst+="{wRR}";
		  }
		 c0_fischer_cst+=c0_rook;
		 }
		}
	for(c0_q8=0; c0_q8<c0_fen_pos.length; c0_q8+=5)
		{
		var c0_pc=c0_fen_pos.Substring(c0_q8+1,1);
		if(c0_pc=="R")
		{
		c0_cl=c0_fen_pos.Substring(c0_q8,1);
		c0_hz=c0_fen_pos.Substring(c0_q8+2,1);
		c0_rook=c0_fen_pos.Substring(c0_q8,5);

		if(c0_cl=="w")
		{
		if(c0_fischer_cst.IndexOf("{wLR}")<0 && c0_fen_c.IndexOf("Q")>=0 &&
			charCodeAt(c0_fen_pos.Substring(atW+2,1),0)>charCodeAt(c0_hz,0)) c0_fischer_cst+="{wLR}"+c0_rook;
		else if(c0_fischer_cst.IndexOf("{wRR}")<0 && c0_fen_c.IndexOf("K")>=0 &&
			charCodeAt(c0_fen_pos.Substring(atW+2,1),0)<charCodeAt(c0_hz,0)) c0_fischer_cst+="{wRR}"+c0_rook;
		}
		else
		{
		if(c0_fischer_cst.IndexOf("{bLR}")<0 && c0_fen_c.IndexOf("q")>=0 &&
			charCodeAt(c0_fen_pos.Substring(atB+2,1),0)>charCodeAt(c0_hz,0)) c0_fischer_cst+="{bLR}"+c0_rook;
		else if(c0_fischer_cst.IndexOf("{bRR}")<0 && c0_fen_c.IndexOf("k")>=0 &&
			charCodeAt(c0_fen_pos.Substring(atB+2,1),0)<charCodeAt(c0_hz,0)) c0_fischer_cst+="{bRR}"+c0_rook;
		}
		}
		}
	}
}

//------- Adjust main variables after position is set...
function c0_fischer_adjustmoved():void
{
if(c0_fischer_cst.IndexOf("{bLR}")>=0 && c0_fischer_cst.IndexOf("{bK}")>=0)
	{ c0_bKingmoved = false; c0_bLRockmoved = false; c0_b00 = false; }
if(c0_fischer_cst.IndexOf("{bRR}")>=0 && c0_fischer_cst.IndexOf("{bK}")>=0)
	{ c0_bKingmoved = false; c0_bRRockmoved = false; c0_b00 = false; }
if(c0_fischer_cst.IndexOf("{wLR}")>=0 && c0_fischer_cst.IndexOf("{wK}")>=0)
	{ c0_wKingmoved = false; c0_wLRockmoved = false; c0_w00 = false; }
if(c0_fischer_cst.IndexOf("{wRR}")>=0 && c0_fischer_cst.IndexOf("{wK}")>=0)
	{ c0_wKingmoved = false; c0_wRRockmoved = false; c0_w00 = false; }
}

//------- Does fischer movings for castling...
function c0_fischer_cstl_move(c0_moving:String,c0_draw:boolean):void
{
var c0_king="";
var c0_rook="";
var c0_king2="";
var c0_rook2="";

if(c0_moving.Substring(0,4)=="00**")
	{
	if(c0_sidemoves>0)
		{
		c0_king=c0_fischer_cst.Substring( c0_fischer_cst.IndexOf("{wK}")+4,4 );
		c0_rook=c0_fischer_cst.Substring( c0_fischer_cst.IndexOf("{wRR}")+5,4 );
		c0_king2="wKg1"; c0_rook2="wRf1";
		c0_wKingmoved=true;c0_wLRockmoved=true;c0_wRRockmoved=true;c0_w00=true;
		}
	else
		{
		c0_king=c0_fischer_cst.Substring( c0_fischer_cst.IndexOf("{bK}")+4,4 );
		c0_rook=c0_fischer_cst.Substring( c0_fischer_cst.IndexOf("{bRR}")+5,4 );	
		c0_king2="bKg8"; c0_rook2="bRf8";
		c0_bKingmoved=true;c0_bLRockmoved=true;c0_bRRockmoved=true;c0_b00=true;
		}
	}
else if(c0_moving.Substring(0,4)=="000*")
	{
	if(c0_sidemoves>0)
		{
		c0_king=c0_fischer_cst.Substring( c0_fischer_cst.IndexOf("{wK}")+4,4 );
		c0_rook=c0_fischer_cst.Substring( c0_fischer_cst.IndexOf("{wLR}")+5,4 );
		c0_king2="wKc1"; c0_rook2="wRd1";
		c0_wKingmoved=true;c0_wLRockmoved=true;c0_wRRockmoved=true;c0_w00=true;
		}
	else
		{
		c0_king=c0_fischer_cst.Substring( c0_fischer_cst.IndexOf("{bK}")+4,4 );
		c0_rook=c0_fischer_cst.Substring( c0_fischer_cst.IndexOf("{bLR}")+5,4 );
		c0_king2="bKc8"; c0_rook2="bRd8";
		c0_bKingmoved=true;c0_bLRockmoved=true;c0_bRRockmoved=true;c0_b00=true;
		}
	}
else
	{
	var c0_from_at=c0_moving.Substring(0,2);
	var c0_to_at=c0_moving.Substring(2,2);
	c0_moveto(c0_convH888(c0_from_at), c0_convH888(c0_to_at), c0_draw);
	}

if(c0_king.length>0 && c0_rook.length>0)
	{
	if(c0_draw)
		{
		c0_clear_at(c0_king.Substring(2,2));
		c0_clear_at(c0_rook.Substring(2,2));
		c0_add_piece(c0_king2.Substring(0,2)+c0_rook2.Substring(2,2));
		c0_moveto(c0_convH888(c0_rook2.Substring(2,2)), c0_convH888(c0_king2.Substring(2,2)), c0_draw);
		c0_add_piece(c0_rook2);
		}
	else
		{
		if(!(c0_king==c0_king2)) c0_position=c0_ReplaceAll(c0_position,c0_king,c0_king2);
		if(!(c0_rook==c0_rook2)) c0_position=c0_ReplaceAll(c0_position,c0_rook,c0_rook2);
		}
	}
}

//------- Saves fischer movings for castling from Crafty standard...
function c0_fischer_cst_fCr(c0_move:String):String
{
var c0_ret8="";
if(c0_fischer)
{
if((c0_move.length>4) && (c0_move.Substring(0,5)=="O-O-O" || c0_move.Substring(0,5)=="0-0-0")) c0_ret8="000*";
else if((c0_move.length>2) && (c0_move.Substring(0,3)=="O-O" || c0_move.Substring(0,3)=="0-0")) c0_ret8="00**";
}
return c0_ret8;
}

//------- Saves to Crafty standard...
function c0_fischer_cst_tCr(c0_move:String):String
{
var c0_ret8="";
if(c0_fischer)
{
if(c0_move.Substring(0,4)=="000*") c0_ret8="0-0-0";
else if(c0_move.Substring(0,4)=="00**") c0_ret8="0-0";
}
return c0_ret8;
}

function c0_NAGs_define():void		// Just data of NAG codes...
{
c0_NAGs+="[0] null annotation [1] good move ('!') [2] poor move ('?') [3] very good move ('!!') [4] very poor move ('??') " +
"[5] speculative move ('!?') [6] questionable move ('?!') [7] forced move (all others lose quickly) [8] singular move (no reasonable alternatives) " +
"[9] worst move [10]  drawish position [11] equal chances, quiet position (=) [12] equal chances, active position (ECO ->/<-) " +
"[13] unclear position (emerging &) [14] White has a slight advantage (+=) [15] Black has a slight advantage (=+) " +
"[16] White has a moderate advantage (+/-) [17] Black has a moderate advantage (-/+) [18]  White has a decisive advantage (+-) " +
"[19] Black has a decisive advantage (-+) [20] White has a crushing advantage (Black should resign) (+--) " +
"[21] Black has a crushing advantage (White should resign) (--+) [22] White is in zugzwang (zz) [23] Black is in zugzwang (zz) " +
"[24] White has a slight space advantage [25]  Black has a slight space advantage [26]  White has a moderate space advantage (O) " +
"[27] Black has a moderate space advantage (O) [28] White has a decisive space advantage [29] Black has a decisive space advantage " +
"[30] White has a slight time (development) advantage [31] Black has a slight time (development) advantage " +
"[32] White has a moderate time (development) advantage (@) [33] Black has a moderate time (development) advantage (@) " +
"[34] White has a decisive time (development) advantage [35] Black has a decisive time (development) advantage " +
"[36] White has the initiative (^) [37]  Black has the initiative (^) [38] White has a lasting initiative " +
"[39] Black has a lasting initiative [40] White has the attack (->) ";

c0_NAGs+="[41] Black has the attack (->) [42] White has insufficient compensation for material deficit [43] Black has insufficient compensation for material deficit " +
"[44] White has sufficient compensation for material deficit (=/&) [45] Black has sufficient compensation for material deficit (=/&) " +
"[46] White has more than adequate compensation for material deficit [47] Black has more than adequate compensation for material deficit " +
"[48] White has a slight center control advantage [49] Black has a slight center control advantage [50] White has a moderate center control advantage (#) " +
"[51] Black has a moderate center control advantage (#) [52] White has a decisive center control advantage " +
"[53] Black has a decisive center control advantage [54] White has a slight kingside control advantage [55] Black has a slight kingside control advantage " +
"[56] White has a moderate kingside control advantage (>>) [57] Black has a moderate kingside control advantage (>>) " +
"[58] White has a decisive kingside control advantage [59] Black has a decisive kingside control advantage [60] White has a slight queenside control advantage " +
"[61] Black has a slight queenside control advantage [62] White has a moderate queenside control advantage (<<) " +
"[63] Black has a moderate queenside control advantage (<<)  [64] White has a decisive queenside control advantage " +
"[65] Black has a decisive queenside control advantage [66] White has a vulnerable first rank [67] Black has a vulnerable first rank " +
"[68] White has a well protected first rank [69] Black has a well protected first rank [70] White has a poorly protected king " +
"[71] Black has a poorly protected king [72] White has a well protected king [73] Black has a well protected king [74] White has a poorly placed king "  +
"[75] Black has a poorly placed king [76] White has a well placed king [77] Black has a well placed king [78] White has a very weak pawn structure " +
"[79] Black has a very weak pawn structure [80] White has a moderately weak pawn structure (DR:x a5) " +
"[81] Black has a moderately weak pawn structure (DR:x a5) [82] White has a moderately strong pawn structure " +
"[83] Black has a moderately strong pawn structure [84] White has a very strong pawn structure [85] Black has a very strong pawn structure ";

c0_NAGs+= "[86] White has poor knight placement [87] Black has poor knight placement [88] White has good knight placement " +
"[89] Black has good knight placement [90] White has poor bishop placement [91] Black has poor bishop placement " +
"[92] White has good bishop placement (diagonal) [93] Black has good bishop placement [94] White has poor rook placement " +
"[95] Black has poor rook placement [96] White has good rook placement (rank <=> file ||) [97] Black has good rook placement " +
"[98] White has poor queen placement [99] Black has poor queen placement [100] White has good queen placement " +
"[101] Black has good queen placement [102] White has poor piece coordination [103] Black has poor piece coordination " +
"[104] White has good piece coordination [105] Black has good piece coordination [106] White has played the opening very poorly " +
"[107] Black has played the opening very poorly [108] White has played the opening poorly [109] Black has played the opening poorly " +
"[110] White has played the opening well [111] Black has played the opening well [112] White has played the opening very well " +
"[113] Black has played the opening very well [114] White has played the middlegame very poorly [115] Black has played the middlegame very poorly " +
"[116] White has played the middlegame poorly [117] Black has played the middlegame poorly [118] White has played the middlegame well " +
"[119] Black has played the middlegame well [120] White has played the middlegame very well [121] Black has played the middlegame very well " +
"[122] White has played the ending very poorly [123] Black has played the ending very poorly [124] White has played the ending poorly " +
"[125] Black has played the ending poorly [126] White has played the ending well [127] Black has played the ending well " +
"[128] White has played the ending very well [129] Black has played the ending very well [130] White has slight counterplay "  +
"[131] Black has slight counterplay [132] White has moderate counterplay (->/<-) [133] Black has moderate counterplay " +
"[134] White has decisive counterplay [135] Black has decisive counterplay [136] White has moderate time control pressure " +
"[137] Black has moderate time control pressure [138] White has severe time control pressure [139] Black has severe time control pressure ";

c0_NAGs+="[140] With the idea [141] Aimed against [142] Better move [143] Worse move [144] Equivalent move [145] Editors Remark ('RR') " +
"[146] Novelty ('N') [147] Weak point [148] Endgame [149] Line [150] Diagonal [151] White has a pair of Bishops [152] Black has a pair of Bishops " +
"[153] Bishops of opposite color [154] Bishops of same color [190] Etc. [191] Doubled pawns [192] Isolated pawn [193] Connected pawns " +
"[194] Hanging pawns [195] Backwards pawn [201] Diagram ('D', '#') [xyz]";
}

}	// class definition...
