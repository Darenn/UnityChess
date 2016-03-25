#pragma strict

/**
 * Handle the chessboard highlighting
 */
public class HighlighterController extends MonoBehaviour
{
	public var highlighter : GameObject;

	/**
	 * Initialize the class
	 */
	function Start () {
		// None
	}

	/**
	 * Called once per frame
	 */
	function Update () {
		// None
	}

	/**
	 * Occures when the chessboard is deleted
	 */
	private function GetHighlighter() {
		highlighter = GameObject.Find("Highlighter");
		if(highlighter == null) Debug.Log("Unable to find the Highlighter");
	}

	/**
	 * Set the position of the highlighter plane on the scene
	 *
	 * @param position The supposed position of the plane (raycast resutlt)
	 * @return void
	 */
	public function SetHighlighterPosition(position : Vector3) : void {

		if(highlighter == null) GetHighlighter();

		highlighter.GetComponent(Rigidbody).transform.position.x = position.x;
		highlighter.GetComponent(Rigidbody).transform.position.z = position.z;
	}
}
