package org.fisikes.server.api;

import java.util.Objects;

public class R<T> {
    private static final String SUCCESS = "0000";
    private T data;
    private String code;
    private String message;
    private String detail;

    public R(T data, String code, String message, String detail) {
        this.data = data;
        this.code = code;
        this.message = message;
        this.detail = detail;
    }

    public Boolean succeed() {
        return Objects.equals(this.code, SUCCESS);
    }

    public Boolean failed() {
        return !Objects.equals(this.code, SUCCESS);
    }

    public static <T> R<T> success(T data) {
        return new R(data, SUCCESS, "成功", (String)null);
    }

    public static <T> R<T> fail(String msg) {
        return new R((Object)null, "FAIL", msg, (String)null);
    }

    public static R fail() {
        return new R((Object)null, "FAIL", "失败", (String)null);
    }

    public void setData(T data) {
        this.data = data;
    }

    public static R fail(String msg, String detail) {
        return new R((Object)null, "FAIL", msg, detail);
    }

    public T getData() {
        return this.data;
    }

    public String getCode() {
        return this.code;
    }

    public String getMessage() {
        return this.message;
    }

    public String toString() {
        return "R{data=" + this.data + ", code=" + this.code + ", message='" + this.message + '\'' + ", detail='" + this.detail + '\'' + '}';
    }
}
