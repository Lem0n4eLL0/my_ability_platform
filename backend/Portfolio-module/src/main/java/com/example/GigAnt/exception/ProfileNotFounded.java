package com.example.GigAnt.exception;

import com.example.GigAnt.core.exception.BaseException;
import com.example.GigAnt.core.exception.ErrorCode;
import org.springframework.http.HttpStatus;

public class ProfileNotFounded extends BaseException {
  public ProfileNotFounded() {
    super("Такого профиля не существует",
        HttpStatus.BAD_REQUEST, ErrorCode.PROFILE_NOT_EXIST);
  }


}
