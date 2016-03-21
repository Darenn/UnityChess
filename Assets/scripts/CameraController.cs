using UnityEngine;
using System.Collections;

public class CameraController : MonoBehaviour {

    public Camera m_mainCamera;

	void Start () {
	    
	}
	
	void Update () {
        HandleInput();
        //Screen.lockCursor = true;
        Cursor.lockState = CursorLockMode.Locked;
	}

    void HandleInput() 
    {
        //if (Input.GetKey(KeyCode.Z)) MoveForward();
        //if (Input.GetKey(KeyCode.S)) MoveBackward();
    }

    void MoveForward()
    {
        m_mainCamera.transform.Translate(0, 0.01f, 0);
    }

    void MoveBackward()
    {
        m_mainCamera.transform.Translate(0, 0, 0);
    }
}
