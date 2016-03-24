#pragma strict

import System;

// Audio clips to play
public var attackSound : AudioClip;
public var runSound : AudioClip;
public var dieSound : AudioClip;
public var prepareSound : AudioClip;

private var isRunning : boolean;

// Components
private var audioSource : AudioSource;
private var animator : Animator;


function Start() {
	audioSource = gameObject.GetComponent(AudioSource);
	animator = gameObject.GetComponent(Animator);
}

function Prepare() {
	animator.SetBool ("IsPreparing", true);
	audioSource.clip = prepareSound;
	audioSource.Play ();
}

function StopPrepare() {
	animator.SetBool ("IsPreparing", false);
	audioSource.Stop ();
}

function Run() {
	isRunning = true;
	animator.SetBool ("IsMoving", true);
	audioSource.clip = runSound;
	audioSource.loop = true;
	audioSource.Play ();
}

function StopRun() {
	isRunning = false;
	animator.SetBool ("IsMoving", false);
	audioSource.loop = false;
	audioSource.Stop ();
}

// Triggers

function Attack() {
	animator.SetTrigger ("Attack");
	audioSource.clip = attackSound;
	audioSource.Play ();
}

function Die() {
	animator.SetTrigger ("IsAttacked");
	audioSource.clip = dieSound;
	audioSource.Play ();
}

// getters

function IsRunning() : boolean {
	return isRunning;
}

