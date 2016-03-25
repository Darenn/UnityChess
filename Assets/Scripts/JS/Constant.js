﻿#pragma strict

/**
 * Store constants
 */
public class Constant extends MonoBehaviour
{
	public final var BOARD_NAME = "Chessboard/";
	public final var PLANE_A8   = "plane_a8";
	public final var PLANE_H1   = "plane_h1";
	public final var PLANE_BASE = "plane_";
	public final var PIECE_BASE = "piece_";
	
	public final var BISHOP_NAME = "bishop";
	public final var QUEEN_NAME  = "queen";
	public final var KING_NAME   = "king";
	public final var KNIGHT_NAME = "knight";
	public final var PAWN_NAME   = "pawn";
	public final var ROOK_NAME   = "rook";
	
	public final var OP_KNIGHT_NAME = "oponents_knight";
	public final var DRAG_PARTICLE  = "DragParticle";
	public final var MOVE_PARTICLE  = "MoveParticle";
	
	public final var COLOR_BLACK = "b";
	public final var COLOR_WHITE = "w";
	
	public final var BLACK_SIDE = -1;
	public final var WHITE_SIDE =  1;
	
	public final var ENGINE_ = 0;
	public final var ENGINE_WAITING = 1;
	
	public final var CASE_NUMBER = new Vector2(8, 8);
	public final var LAMP_INTENSITY = 0.750f;
}