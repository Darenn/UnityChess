#pragma strict

/**
 * Handle the menu, contains GUI object and button's flags
 */
class VRMenuController extends MonoBehaviour
{
	public var newGameButton : UnityEngine.UI.Button;
	public var takeBackButton : UnityEngine.UI.Button;
	
	private var newGameFlag : boolean;
	private var takeBackFlag : boolean;
	
	/**
	 * Initializer
	 */
	function Start () {
		
		newGameFlag = false;
		takeBackFlag = false;
		
		// Add event listeners on the GUI buttons
		newGameButton.onClick.AddListener(function() { HandleNewGameEvent(); });
		takeBackButton.onClick.AddListener(function() { HandleTakeBackEvent(); });
	}
	
	/**
	 * TODO
	 */
	function OnGUI() {
		// TODO
	}
	
	/**
	 * Called once per frame
	 */
	function Update () {

	}
	
	/**
	 * This function is called if a mouse-click 
	 * is detected on the button NewGameButton
	 * It set the button flag to true
	 */
	function HandleNewGameEvent()
	{
	    Debug.Log("New Game Button pressed");
	    newGameFlag = true;
	}

	/**
	 * This function is called if a mouse-click 
	 * is detected on the button TakeBackButton
	 * It set the button flag to true
	 */
	function HandleTakeBackEvent()
	{
	    Debug.Log("Take Back Button pressed");
	    takeBackFlag = true;
	}
	
	/**
	 * @return newGameFlag The state of the new game Button
	 */
	function GetNewGameFlag() : boolean {
		return newGameFlag;
	}
	
	/**
	 * @return takeBackFlag The state of the take back Button
	 */
	function GetTakeBackFlag() : boolean {
		return takeBackFlag;
	}
	
	/**
	 * @param flag The state of the button
	 */
	function SetNewGameFlag(flag : boolean) : void {
		newGameFlag = flag;
	}
	
	/**
	 * @param flag The state of the button
	 */
	function SetTakeBackFlag(flag : boolean) : void {
		takeBackFlag = flag;
	}
}
