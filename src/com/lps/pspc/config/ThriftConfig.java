package com.lps.pspc.config;

public class ThriftConfig {
	private String ip;
	private int port;
	public ThriftConfig() {
	}
	public ThriftConfig(String ip, int port) {
		this.ip = ip;
		this.port = port;
	}
	public String getIp() {
		return ip;
	}
	public int getPort() {
		return port;
	}
	public void setIp(String ip) {
		this.ip = ip;
	}
	public void setPort(int port) {
		this.port = port;
	}
}
