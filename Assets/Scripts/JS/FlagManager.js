#pragma strict

/**
 * Store all boolean flags of the game 
 */
class FlagManager extends MonoBehaviour
{	
	public var gameOverFlag : boolean;
	
	/**
	 * Initializer
	 */
	function Start () {
		
		gameOverFlag = false;
	}
	
	/**
	 * Called once per frame
	 */
	function Update () {

	}
	
	public function GetGameOverFlag() : boolean {
		return gameOverFlag;
	}
	
	public function SetGameOverFlag(flag : boolean) : void {
		gameOverFlag = flag;
	}
}
