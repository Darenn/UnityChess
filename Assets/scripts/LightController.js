#pragma strict

/**
 * Light controller script 
 * Handle scene lightning
 */
class LightController extends MonoBehaviour
{
	public var firstLamp : Light;
	public var secondLamp : Light;
	
	private final var START_INTENSITY = 1.0f;
	
	/**
	 * Initializer
	 */
	function Start () {
		firstLamp.intensity = START_INTENSITY;
		secondLamp.intensity = START_INTENSITY;
	}

	/**
	 * Called once per frame
	 */
	function Update () {
		// None
	}
	
	/**
	 * Set the intensity of lamps with the specified value 
	 *
	 * @param intensity The wanted intensity of the scene lamps
	 * @return void 
	 */
	function SetLightIntensity(intensity : float) : void {
		
		firstLamp.intensity = intensity;
		secondLamp.intensity = intensity;
	}
	
	/**
	 * Enable all lights
	 */
	function EnableLight() {
		
		firstLamp.enabled = true;
		secondLamp.enabled = true;
	}
	
	/**
	 * Disable all lights
	 */
	function DisableLight() {
		
		firstLamp.enabled = false;
		secondLamp.enabled = false;
	}
}
