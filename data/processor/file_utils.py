"""
================================================================================

   Description: Testing integration between STAC of Sentinel-2 and SNS/Lambda

   Copyright (c) 2021, Alvaro Huarte - ahuarte47@yahoo.es. All rights reserved.
   
   Redistribution and use of this code in source and binary forms, with
   or without modification, are permitted provided that the following
   conditions are met:
   * Redistributions of source code must retain the above copyright notice,
     this list of conditions and the following disclaimer.
   * Redistributions in binary form must reproduce the above copyright notice,
     this list of conditions and the following disclaimer in the documentation
     and/or other materials provided with the distribution.

   THIS SAMPLE CODE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
   "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED
   TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
   PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR
   CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
   EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
   PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS;
   OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
   WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR
   OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SAMPLE CODE, EVEN IF
   ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

================================================================================
"""

import os

class FileUtils:
    """
    Provides utility IO file functions.
    """
    ChinaArea = [108.990515,20.319485,130.478558,40.992357]
    NZArea = [163.888049,-52.621956, 180, -31.69433]
    MiddleEastArea = [35.991737,24.828731,72.78633,39.298213]
    
    WAIT_LIST = {0:ChinaArea, 1:NZArea, 2:MiddleEastArea}
    native_run = False

    def exsit_native_path(file_path):
      return os.path.exists(file_path)

    def delete_native_file(file_name):
      os.remove(file_name)
      
    @staticmethod
    def parse_s3_path(s3_path):
        """
        Extract the Bucket name and prefix object of the specified absolute S3 path.
        """
        s3_path = s3_path.replace('\\', '/')
        sp = s3_path.split('//')[1].split('/')
        bucket_name = sp[0]
        prefix_path = '/'.join(sp[1:])
        file_name = sp[-1]
        return bucket_name, prefix_path, file_name
        
    @staticmethod
    def exist_s3_path(s3, s3_path, **kwargs):
        """
        Returns if one AWS S3 path/file exist.
        """
        bucket_name, prefix_path, file_name = FileUtils.parse_s3_path(s3_path)
        
        list_kwargs = dict(MaxKeys=1, Bucket=bucket_name, Prefix=prefix_path, **kwargs)
        s3_response = s3.list_objects_v2(**list_kwargs)
        s3_objects = s3_response.get('Contents', [])
        for s3_object in s3_objects:
            if s3_object.get('Key', '') == prefix_path: return True
            
        return False



    def is_overlap(bbox1, bbox2):
        isOverlapping = FileUtils.is_overlap_line(bbox1[0],bbox1[2],bbox2[0],bbox2[2]) and FileUtils.is_overlap_line(bbox1[1],bbox1[3],bbox2[1],bbox2[3]) 
        return isOverlapping

    def is_overlap_line(min1, max1, min2, max2):
        return min(max1, max2) - max(min1, min2) > 0